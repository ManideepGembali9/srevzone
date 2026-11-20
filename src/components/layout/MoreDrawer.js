"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, 
  Tag, 
  Sparkles, 
  Wrench, 
  ShoppingBag, 
  Zap, 
  Bell, 
  Download, 
  HelpCircle, 
  Shield, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import BrandLogo from "../brand/BrandLogo";

export default function MoreDrawer({ isOpen, onClose }) {
  const pathname = usePathname();
  const [notificationStatus, setNotificationStatus] = useState("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  const handleRequestPush = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Browser push notifications are not supported by this browser.");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
    if (permission === "granted") {
      new Notification("SREVZONE Alerts Active", {
        body: "You will now receive flash offers and new EV arrival alerts!",
        icon: "/icons/icon-192.jpg"
      });
    }
  };

  const handleInstallApp = () => {
    alert("To install SREVZONE on your phone or desktop:\n\n• Android (Chrome): Tap 'Add to Home screen' or 'Install App' from the top menu (⋮).\n• iOS (Safari): Tap the Share button (square with arrow) and tap 'Add to Home Screen'.\n• Desktop (Chrome/Edge): Click the Install icon in the address bar.");
  };

  if (!isOpen) return null;

  const menuGroups = [
    {
      title: "Showroom & Offers",
      items: [
        { name: "Promotions & Offers", href: "/promotions", icon: Tag, badge: "Save" },
        { name: "Daily Updates", href: "/updates", icon: Sparkles, badge: "New" },
        { name: "Accessories & Helmets", href: "/accessories", icon: ShoppingBag },
        { name: "Notifications & Alerts", href: "/notifications", icon: Bell, badge: "Push" }
      ]
    },
    {
      title: "Customer Services",
      items: [
        { name: "Service Centre", href: "/service", icon: Wrench },
        { name: "Book a Test Ride", href: "/test-ride", icon: Zap }
      ]
    },
    {
      title: "Information & Help",
      items: [
        { name: "Frequently Asked Questions", href: "/faq", icon: HelpCircle },
        { name: "Privacy Policy", href: "/privacy", icon: Shield },
        { name: "Terms and Conditions", href: "/terms", icon: FileText }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-dark-card border-l border-dark-border h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <BrandLogo variant="header" showTagline={false} />
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-dark-bg border border-dark-border text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 px-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-electric/15 text-electric border border-electric/30 font-bold"
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-dark-bg border border-dark-border text-electric">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-red-600 text-white">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-zinc-600" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Preferences & App Install Section */}
          <div className="space-y-2 pt-2 border-t border-dark-border">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 px-2">
              App & Preferences
            </div>
            
            <Link
              href="/notifications"
              onClick={onClose}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold bg-dark-bg border border-dark-border hover:border-electric/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-royal/20 text-electric">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Push Notifications</div>
                  <div className="text-[10px] text-zinc-400">
                    {notificationStatus === "granted" ? "● Active on this device" : "Receive instant offer alerts"}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-electric flex items-center gap-1">
                <span>{notificationStatus === "granted" ? "Manage" : "Enable"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <button
              onClick={handleInstallApp}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold bg-dark-bg border border-dark-border hover:border-electric/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-tealAccent/20 text-tealAccent">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Install SREVZONE App</div>
                  <div className="text-[10px] text-zinc-400">Add to Home Screen (PWA)</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-tealAccent">Install</span>
            </button>
          </div>

        </div>

        {/* Admin Console - Kept inside the three lines menu in last position */}
        <div className="p-4 border-t border-dark-border bg-dark-bg/90">
          <Link
            href="/admin/login"
            onClick={onClose}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold bg-royal/15 border border-royal/40 text-white hover:bg-royal/25 hover:border-electric/60 transition-all shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-royal/30 text-electric border border-electric/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold flex items-center gap-1.5">
                  <span>Admin Console</span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-electric/20 text-electric border border-electric/40">
                    Staff
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400">Inventory, leads, & showroom controls</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-electric transition-colors" />
          </Link>
        </div>

      </div>
    </div>
  );
}
