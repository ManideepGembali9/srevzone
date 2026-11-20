"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tag, Copy, Check, Clock, ArrowRight, Zap, Sparkles } from "lucide-react";

export default function FeaturedOffers({ promotions }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!promotions || promotions.length === 0) return null;

  return (
    <section className="py-20 bg-dark-bg relative overflow-hidden border-t border-dark-border/40">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-royal/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-tealAccent uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited-Time Festive Offers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured <span className="text-gradient-electric">Promotions & Bonanzas</span>
            </h2>
          </div>
          <Link
            href="/promotions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:text-white transition-colors group"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,168,255,0.25)]"
            >
              {/* Banner Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                <Image
                  src={promo.bannerImage}
                  alt={promo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/30 to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Tag className="w-3 h-3 fill-current" />
                  <span>{promo.discount}</span>
                </div>

                {/* Expiry Pill */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur border border-white/10 text-zinc-300 text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-electric" />
                  <span>Valid till {promo.endDate}</span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-electric transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-xs font-semibold text-tealAccent mt-1">
                    {promo.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {promo.description}
                  </p>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-3 border-t border-dark-border flex items-center justify-between gap-2">
                  <div className="flex-1 bg-dark-bg border border-dashed border-electric/40 px-3 py-2 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-electric tracking-wider">
                      {promo.couponCode}
                    </span>
                    <button
                      onClick={() => handleCopy(promo.couponCode, promo.id)}
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Copy Coupon Code"
                    >
                      {copiedId === promo.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <Link
                    href="/test-ride"
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-royal to-electric text-white hover:opacity-90 transition-opacity whitespace-nowrap shadow-md"
                  >
                    Claim Offer
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
