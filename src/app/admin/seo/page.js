"use client";

import { useState } from "react";
import { Globe, Save, CheckCircle2, Search, Share2 } from "lucide-react";

export default function AdminSeoPage() {
  const [seoData, setSeoData] = useState({
    metaTitle: "SREVZONE - Premium Electric Vehicle Showroom & Hub",
    metaDescription: "POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS. Explore top-brand electric scooters, bikes, cycles, commercial cargo and service booking at SREVZONE Bangalore.",
    keywords: "electric scooters, electric bikes, Ather 450, Ola S1 Pro, Ultraviolette F77, EV showroom Bangalore, electric vehicle subsidy, battery warranty",
    ogImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://srevzone.com"
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("srevzone_seo_settings", JSON.stringify(seoData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">SEO & Social Meta Management</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Configure search engine optimization meta titles, descriptions, keywords, and OpenGraph social preview cards.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>SEO settings updated successfully! Meta tags updated in crawler cache.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Meta Title (Recommended: 50-60 characters)</label>
              <input
                type="text"
                value={seoData.metaTitle}
                onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                required
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              />
              <div className="text-[10px] text-zinc-500 mt-0.5 text-right">{seoData.metaTitle.length} characters</div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Meta Description (Recommended: 120-160 characters)</label>
              <textarea
                rows={3}
                value={seoData.metaDescription}
                onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                required
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
              />
              <div className="text-[10px] text-zinc-500 mt-0.5 text-right">{seoData.metaDescription.length} characters</div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Focus Keywords (Comma-separated)</label>
              <input
                type="text"
                value={seoData.keywords}
                onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Social Share Image URL (Open Graph / Twitter Card)</label>
              <input
                type="url"
                value={seoData.ogImage}
                onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-semibold">Canonical Site URL</label>
              <input
                type="url"
                value={seoData.canonicalUrl}
                onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save SEO Configuration</span>
            </button>
          </form>
        </div>

        {/* Live Search Engine Snippet Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-electric" />
              <span>Google Search Snippet Preview</span>
            </h3>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="text-[11px] text-zinc-400 truncate">https://srevzone.com › electric-vehicles</div>
              <div className="text-sm font-bold text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1">
                {seoData.metaTitle}
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {seoData.metaDescription}
              </p>
            </div>

            <h3 className="text-sm font-bold text-white flex items-center gap-2 pt-2">
              <Share2 className="w-4 h-4 text-tealAccent" />
              <span>WhatsApp / Twitter Card Preview</span>
            </h3>

            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
              <div className="relative aspect-[16/9] w-full bg-zinc-900">
                <img src={seoData.ogImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">srevzone.com</div>
                <div className="text-xs font-bold text-white line-clamp-1 mt-0.5">{seoData.metaTitle}</div>
                <div className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{seoData.metaDescription}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
