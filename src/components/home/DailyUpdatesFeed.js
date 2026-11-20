"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Play, Pin, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function DailyUpdatesFeed({ updates }) {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!updates || updates.length === 0) return null;

  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-electric uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Showroom Moments & Deliveries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Daily <span className="text-gradient-electric">Showroom Updates</span>
            </h2>
          </div>
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:text-white transition-colors group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {updates.slice(0, 4).map((upd) => (
            <div
              key={upd.id}
              className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <Image
                  src={upd.imageUrl}
                  alt={upd.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/30 to-transparent" />

                {/* Pin Badge */}
                {upd.isPinned && (
                  <div className="absolute top-3 left-3 bg-electric/90 text-dark-bg font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow flex items-center gap-1 uppercase tracking-wider">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>Pinned</span>
                  </div>
                )}

                {/* Category tag */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur border border-white/10 text-zinc-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  {upd.category}
                </div>

                {/* Video Play Button if video exists */}
                {upd.videoUrl && (
                  <button
                    onClick={() => setActiveVideo(upd.videoUrl)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-electric/90 text-dark-bg flex items-center justify-center shadow-[0_0_20px_rgba(0,168,255,0.7)] hover:scale-110 transition-transform"
                    title="Watch Video"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                )}

                {/* Date indicator */}
                <div className="absolute bottom-2 left-3 text-[11px] font-medium text-zinc-400">
                  {upd.date}
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-electric transition-colors line-clamp-2">
                  {upd.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {upd.caption}
                </p>

                <div className="pt-2 border-t border-dark-border/60 flex items-center gap-1 text-[11px] font-semibold text-tealAccent">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified SREVZONE Update</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl bg-dark-card rounded-2xl overflow-hidden border border-electric/40 shadow-2xl">
            <div className="flex items-center justify-between p-3 border-b border-dark-border">
              <span className="text-xs font-bold text-white">Showroom Video Reel</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-zinc-400 hover:text-white px-2 py-1 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={activeVideo}
                title="SREVZONE Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
