import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.json();

    if (!formData.userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: deals, error } = await supabase
      .from("Deals")
      .select(
        `
        *,
        Users:userKey(name),
        Companies:company(name),
        Leads:leads(name, email)
      `
      )
      .eq("userKey", formData.userId);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to fetch deals" },
        { status: 500 }
      );
    }

    const dealsWithContacts = await Promise.all(
      deals.map(async (deal) => {
        let contactsList = [];
        if (deal.contacts && deal.contacts.length > 0) {
          const { data: contacts, error: contactsError } = await supabase
            .from("Contacts")
            .select("name, email")
            .in("id", deal.contacts);

          if (!contactsError && contacts) {
            contactsList = contacts.map((contact) => contact.name);
          }
        }

        return {
          ...deal,
          Contacts: contactsList,
        };
      })
    );

    return NextResponse.json(dealsWithContacts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
