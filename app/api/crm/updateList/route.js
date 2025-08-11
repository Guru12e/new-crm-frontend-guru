import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, userId, type, listId } = await request.json();

  if (!id || !userId || !type || !listId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data: updatedList, error } = await supabase
      .from("Lists")
      .select("*")
      .eq("id", listId)
      .single();

    let updatedArray = [];

    if (updatedList.array.includes(id)) {
      updatedArray = updatedList.array.filter((item) => item !== id);
    } else {
      updatedArray = [...updatedList.array, id];
    }

    console.log(updatedArray);
    const { data, error: updateError } = await supabase
      .from("Lists")
      .update({ array: updatedArray })
      .eq("id", listId);

    return NextResponse.json(updatedArray, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update lead" },
      { status: 500 }
    );
  }
}
