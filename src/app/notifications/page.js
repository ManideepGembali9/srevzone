"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bell, 
  BellRing, 
  Check, 
  Clock, 
  Sparkles, 
  Tag, 
  Wrench, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck, 
  Trash2, 
  Zap,
  Smartphone
} from "lucide-react";
import { Store } from "@/lib/store";
import { PushNotification } from "@/lib/pushNotifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState("default");
  const [testSent, setTestSent] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const load = () => {
      setNotifications(Store.getNotifications());
      setPermission(PushNotification.getPermission());
    };
    load();

    window.addEventListener("srevzone_storage_updated", load);
    window.addEventListener("srevzone_push_permission_changed", () => {
      setPermission(PushNotification.getPermission());
    });

    return () => {
      window.removeEventListener("srevzone_storage_updated", load);
    };
  }, []);

  const handleEnablePush = async () => {
    const res = await PushNotification.requestPermission();
    setPermission(res);
    if (res === "granted") {
      await PushNotification.show({
        title: "⚡ SREVZONE Notifications Active!",
        body: "You will now receive flash offers, test-ride updates, and new EV arrivals.",
        url: "/promotions"
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  const handleTestAlert = async () => {
    const ok = await PushNotification.show({
      title: "⚡ SREVZONE Live Alert",
      body: "This is a real-time notification on your device from SREVZONE Electric Vehicles.",
      url: "/vehicles"
    });
    if (ok) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear all notifications from this view?")) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "offers") return n.url?.includes("promotion") || n.title?.toLowerCase().includes("fest") || n.title?.toLowerCase().includes("bonus");
    if (activeFilter === "arrivals") return n.url?.includes("vehicle") || n.title?.toLowerCase().includes("arrival");
    if (activeFilter === "service") return n.url?.includes("service") || n.title?.toLowerCase().includes("service") || n.title?.toLowerCase().includes("camp");
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-bg text-white py-10 pb-28 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-dark-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric text-xs font-bold mb-2">
              <BellRing className="w-3.5 h-3.5 animate-pulse" />
              <span>Real-Time Broadcast Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Notifications & Alerts</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Stay ahead with flash exchange bonuses, new vehicle launches, and VIP service camps.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold bg-dark-card border border-dark-border text-zinc-400 hover:text-red-400 hover:border-red-400/40 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear View</span>
            </button>
          )}
        </div>

        {/* Device Push Permission Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-dark-card via-[#0a1322] to-dark-card border border-electric/40 shadow-[0_0_40px_rgba(0,168,255,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-electric/20 border border-electric/40 flex items-center justify-center text-electric shrink-0 shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Device Push Notifications</h3>
                {permission === "granted" ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Enabled</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Not Enabled
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-md">
                {permission === "granted"
                  ? "Your device is set up to receive instant showroom alerts even when your browser is closed."
                  : "Enable browser notifications to receive immediate alerts when new EV models and festival exchange discounts drop."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {permission === "granted" ? (
              <button
                type="button"
                onClick={handleTestAlert}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-royal hover:bg-royal-hover border border-electric/40 transition-all flex items-center gap-2 shadow-md"
              >
                <Bell className="w-4 h-4 text-electric" />
                <span>Test Alert</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEnablePush}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,168,255,0.4)] flex items-center gap-2"
              >
                <BellRing className="w-4 h-4" />
                <span>Enable Notifications</span>
              </button>
            )}
          </div>
        </div>

        {testSent && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 shrink-0" />
            <span>Notification triggered on your device successfully!</span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: "all", label: "All Alerts", count: notifications.length },
            { id: "offers", label: "Offers & Bonuses" },
            { id: "arrivals", label: "New Arrivals" },
            { id: "service", label: "Service & Camps" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? "bg-electric text-dark-bg font-bold shadow-md"
                  : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Notifications Stream */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-dark-card border border-dark-border space-y-3">
              <Bell className="w-10 h-10 mx-auto text-zinc-600" />
              <h3 className="text-base font-bold text-white">No notifications in this category</h3>
              <p className="text-xs text-zinc-400">
                You’re all caught up! New vehicle announcements and showroom updates will appear here.
              </p>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 text-xs font-bold text-electric hover:underline pt-2"
              >
                <span>Browse Electric Vehicles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => {
              const isOffer = notif.url?.includes("promotion") || notif.title?.toLowerCase().includes("fest") || notif.title?.toLowerCase().includes("bonus");
              const isService = notif.url?.includes("service") || notif.title?.toLowerCase().includes("service");

              return (
                <div
                  key={notif.id || index}
                  className="p-5 sm:p-6 rounded-3xl bg-dark-card border border-dark-border hover:border-electric/50 transition-all shadow-md group flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                      isOffer 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                        : isService 
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-royal/20 text-electric border border-electric/40"
                    }`}>
                      {isOffer ? <Tag className="w-5 h-5" /> : isService ? <Wrench className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-electric transition-colors">
                          {notif.title}
                        </h3>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-red-600 text-white">
                            Latest
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-3 pt-2 text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span>{notif.sentAt || "Recent"}</span>
                        </span>
                        <span>•</span>
                        <span className="text-zinc-400">Verified SREVZONE Showroom Broadcast</span>
                      </div>
                    </div>
                  </div>

                  {notif.url && (
                    <Link
                      href={notif.url}
                      className="self-end sm:self-center px-4 py-2 rounded-xl text-xs font-bold bg-dark-bg border border-dark-border hover:border-electric text-electric hover:bg-electric hover:text-dark-bg transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
          >
            ← Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
