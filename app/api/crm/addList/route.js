import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    const formData = await request.json();

    if (
      !formData.type ||
      !formData.access ||
      !formData.name ||
      !formData.userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (formData.userId) {
      const { data: companyData, error: companyError } = await supabase
        .from("Lists")
        .insert({
          name: formData.name,
          type: formData.type,
          access: formData.access || "Public",
          array: formData.array || [],
          userKey: formData.userId,
        })
        .select();
      if (companyError) {
        console.log(companyError);
        return NextResponse.json(
          { error: `Failed to insert company: ${companyError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
