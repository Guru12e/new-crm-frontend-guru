import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.json();
    if (!formData.id) {
      return NextResponse.json(
        { error: "Missing customer ID" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error: deleteError } = await supabase
      .from("Customers")
      .delete()
      .eq("id", formData.id);

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete customer" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
