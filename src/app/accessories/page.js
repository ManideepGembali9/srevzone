"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, MessageCircle, Check, Search, ShieldCheck, Tag } from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setAccessories(Store.getAccessories());
    const handleUpdate = () => setAccessories(Store.getAccessories());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const categories = ["all", "Helmets", "EV Chargers", "Batteries", "Vehicle Accessories"];

  const filtered = accessories.filter(item => {
    if (selectedCat !== "all" && item.category !== selectedCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return item.name?.toLowerCase().includes(q) || item.brand?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Genuine EV Gear & Spares</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Accessories, Chargers & <span className="text-gradient-electric">Power Packs</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Certified ISI smart LED helmets, 7.4 kW fast home wallbox chargers, high-cycle LiFePO4 batteries, and heavy-duty all-weather protection gear.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-dark-card p-4 rounded-2xl border border-dark-border">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCat === c
                    ? "bg-gradient-to-r from-royal to-electric text-white shadow-md"
                    : "bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                }`}
              >
                {c === "all" ? "All Products" : c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search gear & chargers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-dark-bg border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-electric"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const hasDiscount = item.discountPrice && item.discountPrice < item.price;
            return (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur border border-white/10 text-zinc-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </div>

                  {item.stock > 0 ? (
                    <div className="absolute bottom-2 left-3 text-[11px] font-medium text-emerald-400">
                      ● In Stock ({item.stock} Available)
                    </div>
                  ) : (
                    <div className="absolute bottom-2 left-3 text-[11px] font-medium text-amber-400">
                      ● Available on Order
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] font-semibold text-electric uppercase tracking-wider">
                      {item.brand}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-electric transition-colors mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase font-semibold">Price</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-white">
                          {formatCurrency(item.discountPrice || item.price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-zinc-500 line-through">
                            {formatCurrency(item.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={getWhatsAppLink("+919876543210", `Hi SREVZONE! I would like to order or enquire about the accessory: ${item.name} (${formatCurrency(item.discountPrice || item.price)}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
