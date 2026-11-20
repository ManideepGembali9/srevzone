"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Zap, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Check, 
  BatteryCharging, 
  Gauge, 
  ShieldCheck,
  MessageCircle
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

export default function HeroSection({ settings }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [soundPlaying, setSoundPlaying] = useState(false);

  const colors = [
    { name: "Matte Stealth Graphite", hex: "#2b2f35", borderHex: "#4f5864", active: true },
    { name: "Cyber Pearl White", hex: "#e5e7eb", borderHex: "#9ca3af" },
    { name: "Electric Neon Blue", hex: "#00a8ff", borderHex: "#1265c8" },
    { name: "Obsidian Black", hex: "#111317", borderHex: "#242a35" }
  ];

  // Play realistic futuristic electric vehicle motor acceleration sound using Web Audio API
  const playEvSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      setSoundPlaying(true);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      // Realistic EV pitch sweep: rises smoothly like an accelerating electric motor
      osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 1.8);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.3);
      gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.2);

      setTimeout(() => {
        setSoundPlaying(false);
        try { ctx.close(); } catch (e) {}
      }, 2300);
    } catch (e) {
      setSoundPlaying(false);
    }
  };

  const heroImage = settings?.heroImageUrl || "/vehicles/srev-stealth-scooter.jpg";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-dark-bg pt-8 pb-20">
      
      {/* Background Lighting & Radial Studio Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-electric/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-royal/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-tealAccent/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Subtle Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00A8FF 1px, transparent 1px), linear-gradient(to right, #00A8FF 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Hero Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric tracking-wider uppercase shadow-[0_0_15px_rgba(0,168,255,0.2)]">
              <Zap className="w-3.5 h-3.5 text-tealAccent fill-current animate-pulse" />
              <span>{settings?.officialTagline || "POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS"}</span>
            </div>

            {/* Dynamic Headline Controlled by Admin Settings */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              {settings?.heroHeadline ? (
                settings.heroHeadline.includes(".") ? (
                  <>
                    {settings.heroHeadline.split(".")[0]}. <br className="hidden sm:inline" />
                    <span className="text-gradient-electric">{settings.heroHeadline.split(".").slice(1).join(".").trim()}</span>
                  </>
                ) : (
                  <span className="text-gradient-electric">{settings.heroHeadline}</span>
                )
              ) : (
                <>
                  POWER YOUR RIDE. <br className="hidden sm:inline" />
                  <span className="text-gradient-electric">EXPERIENCE THE FUTURE.</span>
                </>
              )}
            </h1>

            {/* Dynamic Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {settings?.heroSupportingText || "Discover the new SREV Stealth Pro Classic — handcrafted monocoque steel, satin graphite finish, and exhilarating 160 km range."}
            </p>

            {/* Dynamic Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/vehicles"
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 shadow-[0_0_30px_rgba(0,168,255,0.45)] transition-all transform hover:-translate-y-0.5 tracking-wider uppercase"
              >
                <span>{settings?.heroPrimaryBtnText || "EXPLORE VEHICLES"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/test-ride"
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-extrabold text-white bg-dark-card hover:bg-dark-cardHover border border-dark-border hover:border-electric/50 transition-all shadow-lg tracking-wider uppercase"
              >
                <Zap className="w-4 h-4 text-electric fill-current" />
                <span>BOOK TEST RIDE</span>
              </Link>
            </div>

            {/* Live Trust Metrics */}
            <div className="pt-8 border-t border-dark-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{settings?.stats?.happyRiders || "12,500+"}</div>
                <div className="text-xs text-textMuted font-medium">Happy EV Riders</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-electric">{settings?.stats?.modelsAvailable || "45+"}</div>
                <div className="text-xs text-textMuted font-medium">Top EV Models</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-tealAccent">{settings?.stats?.zeroCarbonKm || "18M+ km"}</div>
                <div className="text-xs text-textMuted font-medium">Green Kms Clocked</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{settings?.stats?.warrantyYears || "Up to 8 Yrs"}</div>
                <div className="text-xs text-textMuted font-medium">Battery Warranty</div>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Showroom Stage Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Studio Stage Spotlight Background */}
              <div className="absolute -inset-4 bg-gradient-to-b from-electric/20 via-transparent to-transparent rounded-[36px] blur-xl opacity-60 pointer-events-none" />

              {/* Main Realistic Vehicle Display Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#10141c] via-[#090c10] to-[#050505] border border-electric/40 shadow-[0_10px_60px_rgba(0,168,255,0.25)] p-3 sm:p-4">
                
                {/* Stage Header Info Bar */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black text-white tracking-wider uppercase">
                      {settings?.heroVehicleBadge || "2026 Showroom Flagship"}
                    </span>
                  </div>

                  {/* Interactive EV Engine Sound Preview Button */}
                  <button
                    type="button"
                    onClick={playEvSound}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                      soundPlaying
                        ? "bg-electric text-dark-bg border-electric shadow-[0_0_15px_#00A8FF]"
                        : "bg-dark-bg/80 border-dark-border text-zinc-300 hover:text-white hover:border-electric/50"
                    }`}
                    title="Experience realistic electric motor acceleration audio"
                  >
                    {soundPlaying ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                        <span>Accelerating...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-electric" />
                        <span>Simulate EV Sound</span>
                      </>
                    )}
                  </button>
                </div>

                {/* The Realistic Scooter Photograph on Illuminated Stage */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black/90 mt-3 group">
                  <Image
                    src={heroImage}
                    alt={settings?.heroVehicleName || "SREV Stealth Pro Classic Electric Scooter"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />

                  {/* Subtle Top & Bottom Gradient Vignette for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Spec Chips Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-black/75 backdrop-blur border border-white/10 text-white">
                      {settings?.heroVehicleSpeed || "0-40 in 3.2s"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-black/75 backdrop-blur border border-electric/40 text-electric">
                      {settings?.heroVehicleRange || "160 km Range"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-black/75 backdrop-blur border border-tealAccent/40 text-tealAccent">
                      4.0 kWh IP67
                    </span>
                  </div>

                  {/* Bottom Vehicle Identity Banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0e131ab3] backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-bold text-tealAccent uppercase tracking-widest">
                          SREVZONE BESPOKE SERIES
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {settings?.heroVehicleName || "SREV Stealth Pro Classic"}
                        </h3>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {settings?.heroVehicleSubtitle || "Satin Matte Graphite • Retro Futurism Edition"}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-zinc-400 uppercase font-semibold">Ex-Showroom</div>
                        <div className="text-lg sm:text-xl font-black text-electric">
                          {settings?.heroVehiclePrice || "₹1,49,999"}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Color Swatches */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-400 font-semibold">Finish:</span>
                        <div className="flex items-center gap-1.5">
                          {colors.map((c, i) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => setSelectedColor(i)}
                              className={`w-5 h-5 rounded-full transition-transform border-2 ${
                                selectedColor === i 
                                  ? "scale-125 ring-2 ring-electric/60 shadow-md" 
                                  : "opacity-70 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: c.hex, borderColor: c.borderHex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/vehicles/srev-v01`}
                        className="text-[11px] font-bold text-white hover:text-electric flex items-center gap-1 transition-colors"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                </div>

                {/* Studio Platform Floor Glow Reflection */}
                <div className="h-2 w-3/4 mx-auto bg-gradient-to-r from-transparent via-electric to-transparent blur-[3px] opacity-70 mt-1" />

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
