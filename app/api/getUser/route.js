import { createClient } from "@/utils/supabase/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const supabase = await createClient();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: user, error: userError } = await supabase
    .from("Users")
    .select("id, email")
    .eq("email", session.user.email)
    .single();

  console.log(user);

  if (userError || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
