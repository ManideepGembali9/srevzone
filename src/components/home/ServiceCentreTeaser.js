"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, ArrowRight, CheckCircle2, Battery, Cpu, Clock, Phone } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Store } from "@/lib/store";

export default function ServiceCentreTeaser({ packages = [], settings: propSettings }) {
  const [settings, setSettings] = useState(propSettings || null);

  useEffect(() => {
    if (!propSettings) {
      setSettings(Store.getSettings());
    }
    const handleUpdate = () => setSettings(Store.getSettings());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, [propSettings]);

  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-2">
            <div className="text-xs font-bold text-tealAccent uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Dedicated High-Voltage Service Centre</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {settings?.serviceTeaserHeadline ? (
                settings.serviceTeaserHeadline.includes("Electric Vehicle") ? (
                  <>
                    {settings.serviceTeaserHeadline.split("Electric Vehicle")[0]}
                    <span className="text-gradient-electric">Electric Vehicle</span>
                  </>
                ) : (
                  <span className="text-gradient-electric">{settings.serviceTeaserHeadline}</span>
                )
              ) : (
                <>
                  Precision Care for Your <span className="text-gradient-electric">Electric Vehicle</span>
                </>
              )}
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              {settings?.serviceTeaserSub || "Equipped with computerized diagnostic tools, battery state-of-health analyzers, and certified EV mechanics. Genuine parts and 100% transparent pricing."}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <a
              href={`tel:${settings?.serviceHotline || settings?.phone || "+919876543210"}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-zinc-300 bg-dark-card border border-dark-border hover:border-electric/50 hover:text-white transition-all shadow-md"
            >
              <Phone className="w-4 h-4 text-tealAccent" />
              <span>Emergency Hotline</span>
            </a>

            <Link
              href="/service"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,168,255,0.3)]"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.slice(0, 4).map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 bg-dark-card border transition-all duration-300 flex flex-col justify-between ${
                pkg.popular
                  ? "border-electric/50 shadow-[0_0_25px_rgba(0,168,255,0.2)] relative"
                  : "border-dark-border hover:border-dark-border/80"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-electric text-dark-bg font-extrabold text-[10px] uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-textMuted flex items-center gap-1">
                    <Clock className="w-3 h-3 text-electric" />
                    <span>Est. {pkg.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {pkg.name}
                  </h3>
                  <div className="text-2xl font-black text-electric mt-2">
                    {formatCurrency(pkg.price)}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Key Points */}
                <ul className="space-y-1.5 pt-2 border-t border-dark-border/60 text-xs text-zinc-300">
                  {pkg.points?.slice(0, 3).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-dark-border">
                <Link
                  href={`/service?package=${pkg.id}`}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-center block bg-white/10 hover:bg-electric hover:text-dark-bg text-white transition-all border border-white/20"
                >
                  Schedule This Service
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
