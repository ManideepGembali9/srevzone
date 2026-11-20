"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  Send, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Sparkles, 
  Smartphone, 
  Users, 
  Trash2, 
  RotateCw, 
  ExternalLink 
} from "lucide-react";
import { Store } from "@/lib/store";
import { PushNotification } from "@/lib/pushNotifications";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "⚡ Festive Mega Green Exchange Fest Live!",
    message: "Get up to ₹15,000 extra exchange bonus on trading your old petrol vehicle at SREVZONE today.",
    url: "/promotions"
  });
  const [sentSuccess, setSentSuccess] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(1512);

  useEffect(() => {
    const load = () => {
      setNotifications(Store.getNotifications());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    // Save to Store (persists for all customers on /notifications)
    const newNotif = Store.sendNotification({
      title: formData.title,
      message: formData.message,
      url: formData.url || "/promotions"
    });

    // Also trigger on current device via PushNotification API
    await PushNotification.show({
      title: formData.title,
      body: formData.message,
      url: formData.url || "/promotions"
    });

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const handleTestDevice = async () => {
    const success = await PushNotification.show({
      title: formData.title || "⚡ SREVZONE Test Alert",
      body: formData.message || "This is a live test notification from SREVZONE Admin Console.",
      url: formData.url || "/promotions"
    });

    if (success) {
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3000);
    } else {
      alert("Notification permission required. Please allow notifications when prompted by your browser.");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Delete this notification record from history?")) {
      const updated = notifications.filter(n => n.id !== id);
      setNotifications(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("srevzone_notifications", JSON.stringify(updated));
        window.dispatchEvent(new Event("srevzone_storage_updated"));
      }
    }
  };

  const applyPreset = (preset) => {
    setFormData({
      title: preset.title,
      message: preset.message,
      url: preset.url
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Browser Push Notifications</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Broadcast instant real-time alerts to customer devices for new arrivals, exchange offers, and service reminders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTestDevice}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-dark-card border border-electric/40 text-electric hover:bg-electric/15 transition-all flex items-center gap-2"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Test On This Device</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Composer Form (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-dark-card border border-electric/30 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-electric" />
              <span>Compose Web Push Notification</span>
            </h3>
            <span className="text-[11px] font-bold text-tealAccent flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{subscribersCount.toLocaleString()} Active Devices</span>
            </span>
          </div>

          {sentSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Push notification dispatched to {subscribersCount.toLocaleString()} subscribed devices & saved!</span>
            </div>
          )}

          {testSuccess && (
            <div className="p-3 rounded-xl bg-electric/20 border border-electric/40 text-electric text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Test notification displayed on your device!</span>
            </div>
          )}

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Quick Templates:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset({
                  title: "⚡ Festive Mega Green Exchange Fest Live!",
                  message: "Get up to ₹15,000 extra exchange bonus on trading your old petrol vehicle at SREVZONE today.",
                  url: "/promotions"
                })}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-dark-bg border border-dark-border hover:border-electric text-zinc-300 hover:text-white transition-colors"
              >
                Festive Offer
              </button>
              <button
                type="button"
                onClick={() => applyPreset({
                  title: "🚀 New Arrival: 2026 Ather 450 Apex In Stock!",
                  message: "Test ride India's quickest electric scooter with 100 km/h top speed & Warp+ mode at SREVZONE.",
                  url: "/vehicles"
                })}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-dark-bg border border-dark-border hover:border-electric text-zinc-300 hover:text-white transition-colors"
              >
                New Arrival
              </button>
              <button
                type="button"
                onClick={() => applyPreset({
                  title: "🛠️ Free 36-Point Monsoon EV Battery Camp",
                  message: "Complimentary battery health check and motor diagnostics this weekend at SREVZONE Service Hub.",
                  url: "/service"
                })}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-dark-bg border border-dark-border hover:border-electric text-zinc-300 hover:text-white transition-colors"
              >
                Service Camp
              </button>
            </div>
          </div>

          <form onSubmit={handleSendNotification} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 mb-1 font-bold">Notification Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. ⚡ New Ultraviolette F77 Mach 2 In Stock!"
                className="w-full px-3 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-semibold"
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-1 font-bold">Notification Message *</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Write compelling alert text..."
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-1 font-bold">Target URL on Click</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="e.g. /promotions or /vehicles"
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              />
            </div>

            {/* Notification Live Device Preview */}
            <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Device Preview</span>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal to-electric flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bell className="w-5 h-5 fill-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{formData.title || "Alert Title"}</span>
                    <span className="text-[9px] text-zinc-500">now</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{formData.message || "Message body..."}</p>
                  <div className="text-[9px] text-electric font-semibold mt-1">srevzone.com • Tap to open {formData.url || "/"}</div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,168,255,0.4)] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Notification Now</span>
            </button>
          </form>
        </div>

        {/* History Log (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-electric" />
                <span>Notification Dispatch History</span>
              </h3>
              <span className="text-xs text-zinc-400 font-medium">
                {notifications.length} Broadcasts
              </span>
            </div>

            {notifications.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No notifications sent yet. Compose and broadcast your first alert above.
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-2xl bg-dark-bg border border-dark-border text-xs space-y-2 hover:border-dark-border/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-bold text-white text-sm leading-snug">{n.title}</h4>
                      <button
                        type="button"
                        onClick={() => handleDelete(n.id)}
                        className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-zinc-300 leading-relaxed text-[11px]">{n.message}</p>

                    <div className="flex flex-wrap items-center justify-between pt-1 text-[10px] text-zinc-400 border-t border-dark-border/60">
                      <span className="flex items-center gap-1 text-electric font-semibold">
                        <ExternalLink className="w-3 h-3" />
                        <span>{n.url || "/"}</span>
                      </span>
                      <span>{n.sentAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
