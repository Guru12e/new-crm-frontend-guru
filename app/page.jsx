import OnBoarding from "@/components/OnBoarding";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/home`);
  }

  return (
    <div>
      <OnBoarding />
    </div>
  );
}
