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
    const { data: list, error } = await supabase
      .from("Lists")
      .select(
        `
        *,
        Users: userKey (name)
      `
      )
      .eq("id", formData.id)
      .eq("userKey", formData.userId)
      .single();

    if (list.array && list.array.length > 0) {
      if (list.type === "Company") {
        const { data: company, error: companyError } = await supabase
          .from("Companies")
          .select(
            `
              *,
              Users: userKey (name)
            `
          )
          .in("id", list.array)
          .eq("userKey", formData.userId);

        return NextResponse.json(
          { ...list, arrayValues: company },
          { status: 200 }
        );
      } else if (list.type === "Contact") {
        const { data: contacts, error: contactsError } = await supabase
          .from("Contacts")
          .select(
            `*
              , Users: userKey (name)
            `
          )
          .in("id", list.array)
          .eq("userKey", formData.userId);

        return NextResponse.json(
          { ...list, arrayValues: contacts },
          { status: 200 }
        );
      } else if (list.type === "lead") {
        const { data: leads, error: leadsError } = await supabase
          .from("Leads")
          .select(
            `
              *,
              Users: userKey (name)
            `
          )
          .in("id", list.array)
          .eq("userKey", formData.userId);

        return NextResponse.json(
          { ...list, arrayValues: leads },
          { status: 200 }
        );
      }

      return NextResponse.json(list, { status: 200 });
    } else {
      return NextResponse.json({ ...list, arrayValues: [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
