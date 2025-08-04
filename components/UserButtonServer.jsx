import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserButtonClient from "./UserButtonClient";

export default async function UserButtonServer() {
  const session = await getServerSession(authOptions);
  const supabase = await createClient();
  let supabaseUser = null;
  if (session?.user?.email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", session.user.email)
      .single();
    if (!error) {
      supabaseUser = data;
    }
  }
  return <UserButtonClient user={session?.user} supabaseUser={supabaseUser} />;
}
