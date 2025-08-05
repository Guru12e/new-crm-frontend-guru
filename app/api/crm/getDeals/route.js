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
      .select("*")
      .eq("userKey", formData.userId);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to fetch deals" },
        { status: 500 }
      );
    }

    return NextResponse.json(deals, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
