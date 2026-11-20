"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  Menu, 
  Heart
} from "lucide-react";
import BrandLogo from "../brand/BrandLogo";
import MoreDrawer from "./MoreDrawer";
import { Store } from "@/lib/store";

export default function Header() {
  const pathname = usePathname();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setWishlistCount(Store.getWishlist().length);
    };
    updateCounts();

    window.addEventListener("srevzone_storage_updated", updateCounts);
    return () => {
      window.removeEventListener("srevzone_storage_updated", updateCounts);
    };
  }, []);

  // Strictly 5 main navigation options as specified
  const navLinks = [
    { name: "Home", href: "/", exact: true },
    { name: "Vehicles", href: "/vehicles", exact: false },
    { name: "Gallery", href: "/gallery", exact: false },
    { name: "About", href: "/about", exact: false },
    { name: "Contact", href: "/contact", exact: false }
  ];

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null; // Admin has its own dedicated shell

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Main Glassmorphic Navigation Bar */}
        <nav className="glass-nav py-2.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Official SREVZONE Logo */}
            <BrandLogo variant="header" showTagline={false} />

            {/* Desktop Navigation Links - Strictly 5 Items */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = link.exact 
                  ? pathname === link.href 
                  : pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-electric bg-electric/10 border border-electric/40 shadow-[0_0_15px_rgba(0,168,255,0.2)]"
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Three-Lines Menu Trigger Button */}
              <button
                onClick={() => setMoreDrawerOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-dark-card border border-dark-border hover:border-electric/50 text-zinc-300 hover:text-white transition-all ml-1 group"
                title="Menu"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5 transition-transform group-hover:scale-105" />
              </button>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-xl bg-dark-card border border-dark-border text-zinc-300 hover:text-red-400 hover:border-red-400/40 transition-colors"
                title="Saved Vehicles"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* VIP Test Ride CTA */}
              <Link
                href="/test-ride"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-royal to-electric hover:from-royal-hover hover:to-electric-hover shadow-[0_0_20px_rgba(0,168,255,0.35)] hover:shadow-[0_0_30px_rgba(0,168,255,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 fill-current text-white" />
                <span>Book Test Ride</span>
              </Link>

              {/* Mobile Three-Lines Menu Button */}
              <button
                onClick={() => setMoreDrawerOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-dark-card border border-dark-border text-zinc-300 hover:text-white hover:border-electric/40 transition-colors"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Slide-out More Drawer */}
      <MoreDrawer 
        isOpen={moreDrawerOpen} 
        onClose={() => setMoreDrawerOpen(false)} 
      />
    </>
  );
}
