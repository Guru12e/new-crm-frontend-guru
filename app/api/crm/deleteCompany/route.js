import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, userId } = await request.json();
  if (!id || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("Companies")
      .delete()
      .eq("id", id)
      .eq("userKey", userId);
    if (error) {
      console.error("Error deleting company:", error);
      return NextResponse.json(
        { error: "Failed to delete company" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
