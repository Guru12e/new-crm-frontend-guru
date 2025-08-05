import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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
    const { data: Company, error: userError } = await supabase
      .from("Companies")
      .insert({
        name: formData.name,
        industry: formData.industry || null,
        website: formData.website || null,
        linkedin: formData.linkedin || null,
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

    if (userError) {
      console.log(userError);
      return NextResponse.json(
        { error: `Failed to insert company: ${userError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
