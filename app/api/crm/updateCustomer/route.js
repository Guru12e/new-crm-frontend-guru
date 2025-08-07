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
    const { data: updatedCustomer, error } = await supabase
      .from("Customers")
      .update(data)
      .eq("id", id)
      .eq("userKey", userId)
      .select();

    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update customer" },
      { status: 500 }
    );
  }
}
