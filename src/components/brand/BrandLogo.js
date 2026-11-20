"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Store } from "@/lib/store";

export default function BrandLogo({
  variant = "header",
  showTagline = false,
  className = "",
  href = "/"
}) {
  const [logoSrc, setLogoSrc] = useState("/brand/srevzone-logo.png");

  useEffect(() => {
    const updateLogo = () => {
      const settings = Store.getSettings();
      if (settings?.logoUrl) {
        setLogoSrc(settings.logoUrl);
      }
    };
    updateLogo();
    window.addEventListener("srevzone_storage_updated", updateLogo);
    return () => window.removeEventListener("srevzone_storage_updated", updateLogo);
  }, []);

  const content = (
    <div className={`flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] ${className}`}>
      {/* Official SREVZONE Brand Logo */}
      <div className="relative flex items-center">
        <Image
          src={logoSrc}
          alt="SREVZONE - Electric Vehicle Solutions"
          width={variant === "footer" ? 140 : variant === "admin" ? 120 : 130}
          height={variant === "footer" ? 140 : variant === "admin" ? 120 : 130}
          className={`w-auto object-contain drop-shadow-[0_0_12px_rgba(0,168,255,0.35)] ${
            variant === "footer" 
              ? "h-14 sm:h-16" 
              : variant === "admin" 
                ? "h-9 sm:h-10" 
                : "h-11 sm:h-12"
          }`}
          priority
        />
      </div>

      {variant === "admin" && (
        <span className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase bg-royal/20 text-electric border border-electric/30 rounded-xl">
          Admin Console
        </span>
      )}

      {showTagline && (
        <span className="hidden md:inline-block text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
