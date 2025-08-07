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

  if (data.Companies) {
    delete data.Companies;
  }

  if (data.Leads) {
    delete data.Leads;
  }

  if (data.contacts) {
    data.contacts = data.contacts.map((contact) => contact.id);
  }

  try {
    const supabase = await createClient();
    const { data: updatedDeal, error } = await supabase
      .from("Deals")
      .update(data)
      .eq("id", id)
      .eq("userKey", userId)
      .select();

    if (error) {
      console.log(error);
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }
    return NextResponse.json(updatedDeal);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update deal" },
      { status: 500 }
    );
  }
}
