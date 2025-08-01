"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/on-boarding";

  useEffect(() => {
    signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className="flex flex-col items-center justify-center h-screen new-gradient text-white">
      <Image
        src="/images/logo3.png"
        alt="Astrokids.ai Logo"
        width={120}
        height={120}
        className="mb-6 animate-pulse"
      />
      <h1 className="text-3xl font-bold mb-4">Redirecting you to the stars…</h1>
      <p className="text-lg text-center max-w-md">
        We’re preparing your personalized cosmic experience on{" "}
        <strong>Astrokids.ai</strong>.<br />
        Hang tight while we connect you via Google!
      </p>
      <div className="mt-10">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
