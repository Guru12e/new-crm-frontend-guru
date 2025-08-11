import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    const formData = await request.json();

    if (!formData.userId || !formData.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (formData.userId) {
      const { data: companyData, error: companyError } = await supabase
        .from("Leads")
        .insert({
          email: formData.email,
          name: formData.name || null,
          phone: formData.phone || null,
          linkedin: formData.linkedin || null,
          role: formData.role || null,
          company: formData.company || null,
          owner: formData.owner || null,
          description: formData.description || null,
          status: formData.status || null,
          userKey: formData.userId,
        })
        .select("id")
        .single();
      if (companyError) {
        return NextResponse.json(
          { error: `Failed to insert company: ${companyError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { id: companyData.id, success: true },
        { status: 200 }
      );
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
