"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Zap, 
  Gauge, 
  BatteryCharging, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Award
} from "lucide-react";
import { Store } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/utils";

export default function CinematicScooterShowcase() {
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(Store.getSettings());
    const handleUpdate = () => setSettings(Store.getSettings());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const defaultHotspots = [
    {
      id: "headlamp",
      title: "Classic Round Projector LED Headlamp",
      stat: "1800 Lumens",
      sub: "Dynamic LED DRL Ring",
      desc: "Aero-styled chrome rim with high-penetration projector beam for razor-sharp night visibility and timeless retro appeal.",
      x: "38%",
      y: "25%"
    },
    {
      id: "chassis",
      title: "Satin Matte Monocoque Steel Body",
      stat: "Aerospace Grade",
      sub: "Low Centre of Gravity",
      desc: "Solid curved pressed-steel monocoque chassis engineered for sports agility, high durability, and mirror-finish road presence.",
      x: "42%",
      y: "45%"
    },
    {
      id: "saddle",
      title: "Sculpted Dual Touring Saddle",
      stat: "Premium Vegan Leather",
      sub: "28L Underseat Bay",
      desc: "Ergonomically contoured touring saddle with high-density foam cushioning, passenger backrest mount, and full-face helmet storage.",
      x: "64%",
      y: "38%"
    },
    {
      id: "battery",
      title: "4.0 kWh Liquid-Cool Lithium Pack",
      stat: "160 km True Range",
      sub: "Fast Charge: 55 Mins",
      desc: "Automotive-grade NMC battery with smart active BMS telemetry, 8-year warranty protection, and intelligent regenerative energy harvesting.",
      x: "50%",
      y: "52%"
    },
    {
      id: "motor",
      title: "Whisper-Quiet Electric Mid-Drive",
      stat: "6.5 kW Peak",
      sub: "32 Nm Instant Torque",
      desc: "Seamless electric propulsion launching 0 to 40 km/h in 3.2 seconds with multi-stage regenerative braking.",
      x: "72%",
      y: "52%"
    }
  ];

  const hotspots = settings?.showcaseHotspots?.length > 0 ? settings.showcaseHotspots : defaultHotspots;
  const currentHotspot = hotspots[activeHotspot] || hotspots[0];
  const showcaseImage = settings?.showcaseImage || "/vehicles/srev-stealth-scooter.jpg";

  return (
    <section className="relative py-24 bg-gradient-to-b from-dark-bg via-[#080d14] to-dark-bg border-t border-dark-border/60 overflow-hidden">
      
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-electric/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-royal/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric tracking-wider uppercase shadow-[0_0_15px_rgba(0,168,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-tealAccent" />
            <span>{settings?.showcaseTag || "Cinematic Engineering Highlight"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {settings?.showcaseHeadline ? (
              settings.showcaseHeadline.includes(".") ? (
                <>
                  {settings.showcaseHeadline.split(".")[0]}. <br className="hidden sm:inline" />
                  <span className="text-gradient-electric">{settings.showcaseHeadline.split(".").slice(1).join(".").trim()}</span>
                </>
              ) : (
                <span className="text-gradient-electric">{settings.showcaseHeadline}</span>
              )
            ) : (
              <>
                Next-Gen <span className="text-gradient-electric">Electric Super Scooter</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-zinc-300">
            {settings?.showcaseSub || "Forged in automotive-grade curved steel with satin matte graphite finish, ultra-dense 4.0 kWh battery, and whisper-quiet high-torque electric mid-drive."}
          </p>
        </div>

        {/* Interactive Feature Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Showcase with Hotspots (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#111620] via-dark-card to-dark-bg border border-electric/40 p-2.5 sm:p-3 shadow-[0_0_60px_rgba(0,168,255,0.25)]">
              
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black/95">
                <Image
                  src={showcaseImage}
                  alt={settings?.showcaseModel || "SREV Stealth Pro Classic"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-transparent to-black/30 pointer-events-none" />

                {/* Hotspot Interactive Markers */}
                {hotspots.map((spot, index) => (
                  <button
                    key={spot.id || index}
                    onClick={() => setActiveHotspot(index)}
                    style={{ left: spot.x || "50%", top: spot.y || "50%" }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group`}
                    title={spot.title}
                  >
                    <span className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-transform ${
                      activeHotspot === index 
                        ? "scale-125 bg-electric text-dark-bg shadow-[0_0_20px_#00A8FF]" 
                        : "bg-black/85 border border-electric/60 text-white hover:scale-110"
                    }`}>
                      <span className={`absolute inline-flex h-full w-full rounded-full bg-electric opacity-75 ${
                        activeHotspot === index ? "animate-ping" : "hidden"
                      }`} />
                      <span className="text-xs font-black relative">{index + 1}</span>
                    </span>
                  </button>
                ))}

                {/* Model Badge */}
                <div className="absolute top-4 left-4 bg-dark-bg/90 backdrop-blur border border-electric/40 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-electric animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {settings?.showcaseModel || "SREV Stealth Pro Classic"}
                  </span>
                </div>

                {/* Performance HUD Bar */}
                <div className="absolute bottom-4 left-4 right-4 bg-dark-card/90 backdrop-blur border border-dark-border p-3.5 rounded-2xl grid grid-cols-3 gap-2 text-center shadow-2xl">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">0 - 40 km/h</div>
                    <div className="text-base font-black text-electric">{settings?.showcaseSpeed || "3.2 Sec"}</div>
                  </div>
                  <div className="border-x border-dark-border/80">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">Top Speed</div>
                    <div className="text-base font-black text-white">{settings?.showcaseTopSpeed || "95 km/h"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">True Range</div>
                    <div className="text-base font-black text-tealAccent">{settings?.showcaseRange || "160 km"}</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Interactive Feature Description Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-dark-border pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-tealAccent flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Interactive Engineering Hotspot #{activeHotspot + 1}</span>
                </span>
                <span className="text-xs font-mono font-bold text-electric">
                  {currentHotspot?.stat}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white">
                  {currentHotspot?.title}
                </h3>
                {currentHotspot?.sub && (
                  <div className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-electric/15 text-electric border border-electric/30">
                    {currentHotspot?.sub}
                  </div>
                )}
                <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                  {currentHotspot?.desc}
                </p>
              </div>

              {/* Hotspot Switchers */}
              <div className="space-y-2 pt-2 border-t border-dark-border">
                <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                  Explore Components
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {hotspots.map((spot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHotspot(idx)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                        activeHotspot === idx
                          ? "bg-electric text-dark-bg border-electric shadow-md"
                          : "bg-dark-bg border-dark-border text-zinc-400 hover:text-white hover:border-electric/50"
                      }`}
                    >
                      #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/test-ride"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center text-white bg-gradient-to-r from-royal to-electric hover:opacity-95 shadow-[0_0_20px_rgba(0,168,255,0.4)] flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Book VIP Test Ride</span>
                </Link>

                <a
                  href={getWhatsAppLink(settings?.whatsapp || "+919876543210", `Hi SREVZONE! I would like to inquire about the ${settings?.showcaseModel || "SREV Stealth Pro Classic"}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold text-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
