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
    const { data: contact, error } = await supabase
      .from("Contacts")
      .select(
        `
        *,
        Users: userKey (name)
      `
      )
      .eq("id", formData.id)
      .eq("userKey", formData.userId)
      .single();

    if (error) {
      console.error("Error fetching contact:", error);
      return NextResponse.json(
        { error: "Failed to fetch contact" },
        { status: 500 }
      );
    }

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
