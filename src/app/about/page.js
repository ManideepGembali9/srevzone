"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, ShieldCheck, Award, Users, Leaf, ArrowRight, HeartHandshake } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { Store } from "@/lib/store";

export default function AboutPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(Store.getSettings());
    const handleUpdate = () => setSettings(Store.getSettings());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg py-12 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <BrandLogo variant="header" showTagline={false} className="mx-auto items-center" />
          <h1 className="text-4xl sm:text-6xl font-black text-white pt-4">
            {settings?.aboutHeadline ? (
              settings.aboutHeadline.includes("Mobility") ? (
                <>
                  Powering the Future of <span className="text-gradient-electric">Mobility</span>
                </>
              ) : (
                <span className="text-gradient-electric">{settings.aboutHeadline}</span>
              )
            ) : (
              <>
                Powering the Future of <span className="text-gradient-electric">Mobility</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            {settings?.aboutIntro || "SREVZONE was founded with a singular conviction: the electric revolution must be uncompromising, exhilarating, and accessible to every commuter, family, and commercial business in India."}
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-dark-card border border-electric/30 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-electric/20 text-electric flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {settings?.aboutVision || "To be South Asia’s most trusted electric mobility ecosystem. By combining multi-brand curation, high-performance battery diagnostic technology, and unmatched after-sales support, we eliminate every barrier to adopting zero-emission vehicles."}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-dark-card border border-tealAccent/30 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-tealAccent/20 text-tealAccent flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Environmental Pledge</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {settings?.aboutPledge || "Every EV driven off the SREVZONE showroom floor saves an average of 1.4 tonnes of carbon dioxide annually. With over 12,500 active riders, our community offsets thousands of metric tonnes of tailpipe emissions each month."}
            </p>
          </div>
        </div>

        {/* Showroom Infrastructure Highlights */}
        <div className="rounded-3xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-3xl font-extrabold text-white">
              {settings?.megaHubTitle || "The SREVZONE Mega Hub"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              {settings?.megaHubDesc || "Spanning over 15,000 sq.ft. in Bangalore’s high-tech corridor with indoor test track and battery care."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-dark-bg border border-dark-border">
              <div className="text-3xl font-black text-electric">15,000+</div>
              <div className="text-xs font-bold text-white mt-1">Sq. Ft. Showroom</div>
              <div className="text-[11px] text-zinc-500 mt-1">Indoor test ride circuit & lounge</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg border border-dark-border">
              <div className="text-3xl font-black text-tealAccent">12 Bays</div>
              <div className="text-xs font-bold text-white mt-1">High-Voltage Service Lab</div>
              <div className="text-[11px] text-zinc-500 mt-1">Computerized cell balancing</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg border border-dark-border">
              <div className="text-3xl font-black text-white">100% OEM</div>
              <div className="text-xs font-bold text-white mt-1">Authorized Dealerships</div>
              <div className="text-[11px] text-zinc-500 mt-1">Genuine warranty & subsidies</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg border border-dark-border">
              <div className="text-3xl font-black text-royal">24/7</div>
              <div className="text-xs font-bold text-white mt-1">Roadside Assistance (RSA)</div>
              <div className="text-[11px] text-zinc-500 mt-1">Dedicated flatbed EV towing</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to Power Your Future?</h3>
          <div className="flex justify-center gap-4">
            <Link
              href="/vehicles"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90 shadow-lg"
            >
              Explore Vehicles
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-zinc-300 hover:text-white bg-dark-card border border-dark-border hover:border-electric/50"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
