import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, userId, ...data } = await request.json();

  if (!id || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (data.Users) {
    delete data.Users;
  }

  try {
    const supabase = await createClient();
    const { data: updatedLead, error } = await supabase
      .from("Leads")
      .update(data)
      .eq("id", id)
      .eq("userKey", userId)
      .select();

    if (error) {
      console.log(error);
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(updatedLead);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update lead" },
      { status: 500 }
    );
  }
}
