"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function EmiCalculatorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/vehicles");
  }, [router]);

  return (
    <div className="min-h-[60vh] bg-dark-bg flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Zap className="w-10 h-10 text-electric mx-auto animate-pulse" />
        <h2 className="text-lg font-bold text-white">Redirecting to SREVZONE Electric Vehicles...</h2>
        <Link href="/vehicles" className="inline-block text-xs text-electric hover:underline">
          Click here if not redirected automatically
        </Link>
      </div>
    </div>
  );
}
