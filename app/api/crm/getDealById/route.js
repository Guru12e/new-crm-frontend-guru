import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.json();
    if (!formData.userId || !formData.id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: deal, error } = await supabase
      .from("Deals")
      .select(
        `
        *,
        Users:userKey(id, name),
        Companies:company(id, name),
        Leads:leads(id, name, email)
      `
      )
      .eq("id", formData.id)
      .eq("userKey", formData.userId)
      .single();

    if (error) {
      console.error("Error fetching deal:", error);
      return NextResponse.json(
        { error: "Failed to fetch deal" },
        { status: 500 }
      );
    }

    let contactsList = [];
    if (deal.contacts != null && deal.contacts.length > 0) {
      const { data: contacts, error: contactsError } = await supabase
        .from("Contacts")
        .select("id, name, email")
        .in("id", deal.contacts);

      if (!contactsError && contacts) {
        contactsList = contacts.map((contact) => ({
          id: contact.id,
          name: contact.name,
          email: contact.email || "N/A",
        }));
      }
    }

    if (error) {
      console.error("Error fetching deal:", error);
      return NextResponse.json(
        { error: "Failed to fetch deal" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ...deal, contacts: contactsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
