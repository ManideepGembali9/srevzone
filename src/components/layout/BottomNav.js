"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bike, Camera, Info, PhoneCall } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Do not render bottom nav on admin routes
  if (pathname?.startsWith("/admin")) return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home, exact: true },
    { name: "Vehicles", href: "/vehicles", icon: Bike, exact: false },
    { name: "Gallery", href: "/gallery", icon: Camera, exact: false },
    { name: "About", href: "/about", icon: Info, exact: false },
    { name: "Contact", href: "/contact", icon: PhoneCall, exact: false }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-xl border-t border-dark-border px-2 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.8)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 transition-all duration-200 group ${
                isActive 
                  ? "text-electric font-bold" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {/* Active Indicator Top Glow */}
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-electric shadow-[0_0_8px_#00A8FF]" />
              )}

              <div className={`p-1 rounded-xl transition-all ${
                isActive 
                  ? "bg-electric/15 text-electric shadow-[0_0_12px_rgba(0,168,255,0.3)]" 
                  : "group-hover:bg-white/5"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? "font-bold text-electric" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
