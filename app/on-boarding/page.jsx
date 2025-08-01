import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OnBoardingFormComponent from "@/components/OnBoardingFormComponent";

export default async function OnBoardingForm() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/auth/redirect?callbackUrl=/on-boarding`);
  }

  return <OnBoardingFormComponent session={session} />;
}
