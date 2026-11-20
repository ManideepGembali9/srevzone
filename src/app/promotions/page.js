"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Copy, Check, Clock, Zap, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Store } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/utils";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setPromotions(Store.getPromotions());
    const handleUpdate = () => setPromotions(Store.getPromotions());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Festive Bonanzas & Exchange Discounts</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Promotions & <span className="text-gradient-electric">Special Offers</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Maximise your savings with official SREVZONE exchange bonuses, subsidized corporate fleet pricing, and complimentary extended battery warranty packages.
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="rounded-3xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 shadow-[0_0_30px_rgba(0,168,255,0.15)] flex flex-col justify-between"
            >
              {/* Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                <Image
                  src={promo.bannerImage}
                  alt={promo.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 fill-current" />
                  <span>{promo.discount}</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-white/10 text-zinc-300 text-xs px-3 py-1 rounded-xl flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-electric" />
                  <span>Valid: {promo.startDate} to {promo.endDate}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{promo.title}</h2>
                  <div className="text-sm font-semibold text-tealAccent mt-1">{promo.tagline}</div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                    {promo.description}
                  </p>
                </div>

                {/* Coupon & CTA Bar */}
                <div className="pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="w-full sm:w-auto bg-dark-bg border border-dashed border-electric/50 px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3">
                    <span className="text-sm font-mono font-bold text-electric tracking-widest">
                      {promo.couponCode}
                    </span>
                    <button
                      onClick={() => handleCopy(promo.couponCode, promo.id)}
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Copy Coupon"
                    >
                      {copiedId === promo.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="w-full sm:w-auto flex items-center gap-2">
                    <Link
                      href="/test-ride"
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90 shadow-md text-center"
                    >
                      Claim Offer
                    </Link>
                    <a
                      href={getWhatsAppLink("+919876543210", `Hi SREVZONE! I want to avail the ${promo.title} (${promo.couponCode}) offer.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#25D366] text-white hover:opacity-90"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
