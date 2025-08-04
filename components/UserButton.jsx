import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserButtonClient from "./UserButtonClient";

export default async function UserButton() {
  const session = await getServerSession(authOptions);
  return <UserButtonClient user={session?.user} />;
}
