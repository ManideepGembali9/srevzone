"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Bike, 
  Layers, 
  ShoppingBag, 
  Tag, 
  Camera, 
  Bell, 
  Users, 
  Calendar, 
  Wrench, 
  Settings, 
  Search, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname === "/admin/login") return;

    const auth = localStorage.getItem("srevzone_admin_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      try {
        setAuthenticatedUser(JSON.parse(auth));
      } catch (e) {
        setAuthenticatedUser({ name: "SREVZONE Admin", role: "Super Admin" });
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("srevzone_admin_auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted) return null;

  const navSections = [
    {
      title: "Core",
      items: [
        { name: "Overview", href: "/admin", icon: LayoutDashboard }
      ]
    },
    {
      title: "Inventory",
      items: [
        { name: "Vehicle Management", href: "/admin/vehicles", icon: Bike },
        { name: "Category Management", href: "/admin/categories", icon: Layers },
        { name: "Accessories & Spares", href: "/admin/accessories", icon: ShoppingBag }
      ]
    },
    {
      title: "Operations & CRM",
      items: [
        { name: "Service Centre", href: "/admin/service-centre", icon: Wrench },
        { name: "Customers & Enquiries", href: "/admin/customers", icon: Users },
        { name: "Test Ride Bookings", href: "/admin/customers?tab=test-rides", icon: Calendar }
      ]
    },
    {
      title: "Marketing & Updates",
      items: [
        { name: "Promotions & Offers", href: "/admin/promotions", icon: Tag },
        { name: "Daily Updates & Media", href: "/admin/media", icon: Camera },
        { name: "Push Notifications", href: "/admin/notifications", icon: Bell }
      ]
    },
    {
      title: "Platform & Settings",
      items: [
        { name: "Website Settings", href: "/admin/settings", icon: Settings },
        { name: "SEO Management", href: "/admin/seo", icon: Globe },
        { name: "Staff Management", href: "/admin/staff", icon: ShieldCheck }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-dark-card border-r border-dark-border shrink-0 justify-between">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-dark-border">
          <BrandLogo variant="admin" showTagline={false} />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((sec, i) => (
            <div key={i} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-electric/15 text-electric border border-electric/30 font-bold shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Footer & Live Website Link */}
        <div className="p-4 border-t border-dark-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 rounded-xl bg-dark-bg border border-dark-border hover:border-electric/40 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-electric" />
              <span>View Public Showroom</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <div className="flex items-center justify-between pt-2 px-1 text-xs">
            <div className="truncate">
              <div className="font-bold text-white text-xs truncate">{authenticatedUser?.name || "Admin"}</div>
              <div className="text-[10px] text-zinc-500">{authenticatedUser?.role || "Super Admin"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Stage */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-dark-card/80 backdrop-blur border-b border-dark-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-dark-bg text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="font-bold text-white capitalize">
                {pathname?.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-electric hover:underline font-semibold"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Operational" />
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-64 bg-dark-card border-r border-dark-border p-4 flex flex-col justify-between z-10">
              <div className="flex items-center justify-between pb-4 border-b border-dark-border">
                <BrandLogo variant="admin" showTagline={false} />
                <button onClick={() => setSidebarOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {navSections.map((sec, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[10px] font-bold uppercase text-zinc-500 px-2">{sec.title}</div>
                    {sec.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-3 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Admin Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
