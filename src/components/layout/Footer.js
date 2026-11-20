"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Shield, 
  ArrowRight
} from "lucide-react";
import BrandLogo from "../brand/BrandLogo";
import { Store } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState(null);
  const [emailSub, setEmailSub] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSettings(Store.getSettings());
    const handleUpdate = () => setSettings(Store.getSettings());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailSub("");
    }, 4000);
  };

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg border-t border-dark-border text-zinc-400 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-60"></div>

      {/* Floating WhatsApp Quick Action Button - positioned above mobile bottom nav */}
      <a
        href={getWhatsAppLink(settings?.whatsapp || "+919876543210", "Hello SREVZONE! I would like to enquire about electric vehicles and current showroom offers.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-5 md:right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full font-bold shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all transform hover:scale-105 group"
        title="Chat with SREVZONE EV Specialist"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">WhatsApp Support</span>
      </a>

      {/* Main Footer Content with bottom clearance for mobile nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="footer" showTagline={false} />
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm pt-2">
              SREVZONE is India’s premier electric mobility destination. Delivering state-of-the-art electric scooters, motorcycles, cycles, commercial cargo and passenger three-wheelers with complete service backup and genuine parts.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                <span>{settings?.address || "SREVZONE EV Mega Hub, Outer Ring Road, Bangalore - 560103"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-tealAccent shrink-0" />
                <a href={`tel:${settings?.phone || "+919876543210"}`} className="hover:text-white transition-colors">
                  {settings?.phone || "+91 98765 43210"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-electric shrink-0" />
                <a href={`mailto:${settings?.email || "contact@srevzone.com"}`} className="hover:text-white transition-colors">
                  {settings?.email || "contact@srevzone.com"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{settings?.openingHours || "Mon - Sun: 09:00 AM - 08:30 PM"}</span>
              </div>
            </div>
          </div>

          {/* Quick EV Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase border-b border-dark-border pb-2">
              EV Showroom
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/vehicles?category=cat-scooters" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Electric Scooters
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=cat-bikes" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Electric Sport Bikes
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=cat-cycles" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Smart Electric Cycles
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=cat-commercial" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Commercial Cargo Fleets
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=cat-autos" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Passenger Electric Autos
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Accessories & Helmets
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase border-b border-dark-border pb-2">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/test-ride" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Book VIP Test Ride
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Service Appointment
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Promotions & Offers
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Daily Updates & Photos
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Showroom Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-electric/60" /> Showroom Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Legal */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase border-b border-dark-border pb-2">
              Stay Connected
            </h4>
            <p className="text-xs text-zinc-400">
              Get instant alerts on new vehicle launches, battery warranty camps, and exclusive exchange offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-dark-card border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-electric"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:from-royal-hover hover:to-electric-hover rounded-xl transition-all shadow-[0_0_15px_rgba(0,168,255,0.25)]"
              >
                {subscribed ? "Subscribed! Welcome aboard ⚡" : "Subscribe to SREV Alerts"}
              </button>
            </form>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span>•</span>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} SREVZONE. All Rights Reserved. The Future of Electric Mobility.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400">Official Tagline: <strong>POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
