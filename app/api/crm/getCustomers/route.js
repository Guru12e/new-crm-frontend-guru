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

    const { data: customers, error } = await supabase
      .from("Customers")
      .select("*")
      .eq("userKey", formData.userId);

    if (error) {
      console.error("Error fetching customers:", error);
      return NextResponse.json(
        { error: "Failed to fetch customers" },
        { status: 500 }
      );
    }

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
