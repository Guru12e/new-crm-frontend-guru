import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    const formData = await request.json();

    if (!formData.name || !formData.userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (formData.userId) {
      const { data: companyData, error: companyError } = await supabase
        .from("Customers")
        .insert({
          name: formData.name,
          industry: formData.industry || null,
          website: formData.website || null,
          linkedin: formData.linkedin || null,
          email: formData.email || null,
          size: formData.size || null,
          stage: formData.stage || null,
          revenue: formData.revenue || null,
          city: formData.city || null,
          state: formData.state || null,
          country: formData.country || null,
          postal: formData.postal || null,
          description: formData.description || null,
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
