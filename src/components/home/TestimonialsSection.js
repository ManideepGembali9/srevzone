"use client";

import Image from "next/image";
import { Star, Quote, CheckCircle } from "lucide-react";

export default function TestimonialsSection({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-electric uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Quote className="w-3.5 h-3.5" />
            <span>Customer Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Loved By <span className="text-gradient-electric">12,500+ Electric Riders</span>
          </h2>
          <p className="text-sm text-zinc-400">
            Real stories from commuters, sports enthusiasts, and commercial fleet owners who chose SREVZONE.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-electric/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-dark-border/60 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-electric/40 bg-zinc-800">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-tealAccent" />
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {t.role} • {t.location}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
