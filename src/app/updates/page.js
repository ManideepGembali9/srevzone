"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Play, Pin, Calendar, Tag, CheckCircle2 } from "lucide-react";
import { Store } from "@/lib/store";

export default function UpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    setUpdates(Store.getDailyUpdates());
    const handleUpdate = () => setUpdates(Store.getDailyUpdates());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const categories = ["all", ...Array.from(new Set(updates.map(u => u.category).filter(Boolean)))];

  const filteredUpdates = updates.filter(u => {
    if (activeFilter === "all") return true;
    return u.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Showroom Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Daily Showroom <span className="text-gradient-electric">Updates & Deliveries</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Real photos and videos from SREVZONE: exciting customer handover celebrations, new vehicle unboxings, community rides, and service camp activities.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-royal to-electric text-white shadow-lg"
                  : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "All Updates" : cat}
            </button>
          ))}
        </div>

        {/* Updates Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUpdates.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/30 to-transparent" />

                {item.isPinned && (
                  <div className="absolute top-3 left-3 bg-electric text-dark-bg font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow flex items-center gap-1 uppercase">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>Pinned</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur border border-white/10 text-zinc-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {item.category}
                </div>

                {item.videoUrl && (
                  <button
                    onClick={() => setActiveVideo(item.videoUrl)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-electric text-dark-bg flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    title="Watch Video"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                )}

                <div className="absolute bottom-3 left-3 text-xs text-zinc-300 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-electric" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white hover:text-electric transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-border/60 flex items-center gap-1.5 text-xs font-semibold text-tealAccent">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SREVZONE Verified Moment</span>
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
              <span className="text-xs font-bold text-white">Video Player</span>
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
                title="Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
