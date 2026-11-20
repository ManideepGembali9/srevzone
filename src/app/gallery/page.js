"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Play, Image as ImageIcon, Sparkles } from "lucide-react";
import { Store } from "@/lib/store";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeMedia, setActiveMedia] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    setGalleryItems(Store.getGalleryItems());
    const handleUpdate = () => setGalleryItems(Store.getGalleryItems());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const filtered = galleryItems.filter(item => {
    if (filter === "all") return true;
    if (filter === "photos") return item.type === "photo";
    if (filter === "videos") return item.type === "video";
    return item.category === filter;
  });

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>High-Resolution Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Photo & Video <span className="text-gradient-electric">Gallery</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Immerse yourself in SREVZONE showroom atmosphere, track test rides, delivery celebrations, and cutting-edge battery service diagnostics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["all", "photos", "videos", "Showroom", "Customer Delivery", "Service Lab"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-royal to-electric text-white shadow-lg"
                  : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
              }`}
            >
              {f === "all" ? "All Media" : f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-dark-card border border-dark-border hover:border-electric/50 transition-all cursor-pointer shadow-lg"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/20 to-transparent" />

              {item.type === "video" ? (
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-electric text-dark-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              ) : (
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 backdrop-blur text-zinc-300">
                  <ImageIcon className="w-4 h-4" />
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-semibold text-electric uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white truncate mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-dark-card rounded-3xl overflow-hidden border border-electric/40 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-dark-border">
              <span className="text-sm font-bold text-white">{activeMedia.title}</span>
              <button
                onClick={() => setActiveMedia(null)}
                className="text-zinc-400 hover:text-white px-2 py-1 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>
            {activeMedia.type === "video" && activeMedia.videoUrl ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={activeMedia.videoUrl}
                  title={activeMedia.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full">
                <Image src={activeMedia.url} alt={activeMedia.title} fill className="object-contain" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
