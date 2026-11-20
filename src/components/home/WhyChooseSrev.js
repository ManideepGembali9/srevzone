"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Zap, Wrench, RefreshCw, Cpu, Award } from "lucide-react";
import { Store } from "@/lib/store";

export default function WhyChooseSrev({ settings: propSettings }) {
  const [settings, setSettings] = useState(propSettings || null);

  useEffect(() => {
    if (!propSettings) {
      setSettings(Store.getSettings());
    }
    const handleUpdate = () => setSettings(Store.getSettings());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, [propSettings]);

  const defaultBenefits = [
    {
      icon: Award,
      title: "Multi-Brand Electric Mega Hub",
      stat: "15,000+ sq.ft.",
      desc: "Compare top EV scooters, motorcycles, cycles, and cargo vehicles side-by-side with certified EV specialists."
    },
    {
      icon: ShieldCheck,
      title: "High-Voltage Certified Battery Lab",
      stat: "8-Year Warranty",
      desc: "State-of-the-art computerised cell impedance testing, thermal balancing, and official battery health index certificates."
    },
    {
      icon: Zap,
      title: "VIP Doorstep Test Rides",
      stat: "At Home or Office",
      desc: "Experience your dream EV on our indoor test track or schedule delivery straight to your doorstep."
    },
    {
      icon: RefreshCw,
      title: "Instant Exchange & 0% Down Payment",
      stat: "Best Valuation",
      desc: "Exchange any petrol two-wheeler or three-wheeler in 30 minutes with maximum guaranteed market valuation."
    },
    {
      icon: Cpu,
      title: "Instant State & Central EV Subsidies",
      stat: "Direct Savings",
      desc: "Zero paperwork hassle — on-the-spot government subsidy reductions and complete registration assistance."
    },
    {
      icon: Wrench,
      title: "24/7 Roadside Assistance & Spares",
      stat: "100% Genuine",
      desc: "Fully stocked central parts warehouse and certified on-road emergency response vans covering your daily commute."
    }
  ];

  const benefits = settings?.advantagesList?.length > 0 ? settings.advantagesList : defaultBenefits;
  const icons = [Award, ShieldCheck, Zap, RefreshCw, Cpu, Wrench];

  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>The SREVZONE Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {settings?.advantagesHeadline ? (
              settings.advantagesHeadline.includes("SREVZONE") ? (
                <>
                  {settings.advantagesHeadline.split("SREVZONE")[0]}
                  <span className="text-gradient-electric">SREVZONE</span>
                </>
              ) : (
                <span className="text-gradient-electric">{settings.advantagesHeadline}</span>
              )
            ) : (
              <>
                Why Discerning Riders Choose <span className="text-gradient-electric">SREVZONE</span>
              </>
            )}
          </h2>
          <p className="text-sm text-zinc-400">
            {settings?.advantagesSub || "We don’t just sell electric vehicles. We engineer your entire transition to electric mobility with unmatched trust, warranty, and long-term service."}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,168,255,0.2)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal/30 to-electric/20 border border-electric/30 flex items-center justify-center text-electric group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-electric transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between text-[11px] font-semibold text-tealAccent">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-tealAccent"></span>
                    <span>SREVZONE Certified Guarantee</span>
                  </span>
                  {item.stat && (
                    <span className="text-electric font-mono font-bold">{item.stat}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
