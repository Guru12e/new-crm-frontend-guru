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
    const { data: lists, error } = await supabase
      .from("Lists")
      .select("*")
      .eq("userKey", formData.userId);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to fetch lists" },
        { status: 500 }
      );
    }

    return NextResponse.json(lists, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
