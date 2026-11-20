"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bike, 
  Users, 
  Wrench, 
  Calendar, 
  Tag, 
  Bell, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  ShoppingBag
} from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminOverviewPage() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [testRides, setTestRides] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const load = () => {
      setVehicles(Store.getVehicles());
      setCategories(Store.getCategories());
      setEnquiries(Store.getEnquiries());
      setServiceBookings(Store.getServiceBookings());
      setTestRides(Store.getTestRides());
      setPromotions(Store.getPromotions());
      setNotifications(Store.getNotifications());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const pendingService = serviceBookings.filter(s => s.status === "Pending").length;
  const pendingTestRides = testRides.filter(t => t.status === "Pending").length;
  const newEnquiries = enquiries.filter(e => e.status === "New").length;

  const stats = [
    {
      label: "Total EV Inventory",
      value: vehicles.length,
      change: `${vehicles.filter(v => v.stock > 0).length} in stock`,
      icon: Bike,
      color: "text-electric",
      bg: "bg-electric/10 border-electric/30",
      href: "/admin/vehicles"
    },
    {
      label: "Customer Inquiries",
      value: enquiries.length,
      change: `${newEnquiries} pending reply`,
      icon: Users,
      color: "text-tealAccent",
      bg: "bg-tealAccent/10 border-tealAccent/30",
      href: "/admin/customers"
    },
    {
      label: "Service Appointments",
      value: serviceBookings.length,
      change: `${pendingService} awaiting confirmation`,
      icon: Wrench,
      color: "text-amber-400",
      bg: "bg-amber-400/10 border-amber-400/30",
      href: "/admin/service-centre"
    },
    {
      label: "VIP Test Rides",
      value: testRides.length,
      change: `${pendingTestRides} new bookings`,
      icon: Calendar,
      color: "text-royal",
      bg: "bg-royal/10 border-royal/30",
      href: "/admin/customers?tab=test-rides"
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-card via-[#0b1728] to-dark-card border border-electric/30 shadow-[0_0_35px_rgba(0,168,255,0.15)]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric/15 text-electric text-[10px] font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3 h-3 fill-current" />
            <span>Showroom Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            SREVZONE Digital Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time control of electric inventory, customer bookings, workshop jobs, and promotions.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/vehicles"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90 shadow-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Vehicle</span>
          </Link>
          <Link
            href="/admin/notifications"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-dark-bg border border-dark-border hover:border-electric/50"
          >
            <Bell className="w-3.5 h-3.5 text-electric" />
            <span>Push Alert</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              href={s.href}
              className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-electric/50 transition-all hover:shadow-[0_0_20px_rgba(0,168,255,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">{s.label}</span>
                <div className={`p-2.5 rounded-xl border ${s.bg}`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                  <span>{s.change}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2-Column Activity & Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Customer Inquiries & Test Rides (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Recent Inquiries Card */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-tealAccent" />
                <span>Recent Customer Enquiries</span>
              </h3>
              <Link href="/admin/customers" className="text-xs text-electric hover:underline font-semibold">
                View All ({enquiries.length})
              </Link>
            </div>

            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-dark-bg border border-dark-border text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{enq.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.status === "New" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-zinc-400 font-medium">
                    Phone: {enq.phone} • {enq.subject}
                  </div>
                  <p className="text-zinc-300 italic line-clamp-1">"{enq.message}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Workshop Bookings */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Workshop Service Requests</span>
              </h3>
              <Link href="/admin/service-centre" className="text-xs text-electric hover:underline font-semibold">
                Manage Service Bays
              </Link>
            </div>

            <div className="space-y-3">
              {serviceBookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-dark-bg border border-dark-border text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white">{b.customerName} ({b.vehicleModel})</div>
                    <div className="text-zinc-400 text-[11px] mt-0.5">{b.serviceName} • {b.date} ({b.timeSlot})</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    b.status === "Pending" ? "bg-amber-500/20 text-amber-400" : "bg-teal-500/20 text-tealAccent"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Inventory Quick Snapshot & Promos (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Inventory Summary */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bike className="w-4 h-4 text-electric" />
                <span>Inventory Quick View</span>
              </h3>
              <Link href="/admin/vehicles" className="text-xs text-electric hover:underline font-semibold">
                Manage
              </Link>
            </div>

            <div className="space-y-2.5">
              {vehicles.slice(0, 5).map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-bg border border-dark-border text-xs"
                >
                  <div className="truncate pr-2">
                    <div className="font-bold text-white truncate">{v.name}</div>
                    <div className="text-[11px] text-zinc-500">{v.categoryName}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-white">{formatCurrency(v.discountPrice || v.price)}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">{v.stock} in stock</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-tealAccent" />
                <span>Active Promotions</span>
              </h3>
              <Link href="/admin/promotions" className="text-xs text-electric hover:underline font-semibold">
                Manage Offers
              </Link>
            </div>

            <div className="space-y-2.5">
              {promotions.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-dark-bg border border-dark-border text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-[11px] text-zinc-400">Coupon: <span className="font-mono text-electric">{p.couponCode}</span></div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[10px] font-bold">
                    {p.discount}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
