"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Bike, Compass, Truck, ShieldAlert, Layers, Sparkles, Activity } from "lucide-react";
import { Store } from "@/lib/store";

const ICON_MAP = {
  Bike,
  Zap,
  Compass,
  Truck,
  ShieldAlert,
  Layers,
  Sparkles,
  Activity
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    setCategories(Store.getCategories());
    setVehicles(Store.getVehicles());
    const handleUpdate = () => {
      setCategories(Store.getCategories());
      setVehicles(Store.getVehicles());
    };
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Complete EV Range</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Electric Vehicle <span className="text-gradient-electric">Categories</span>
          </h1>
          <p className="text-sm text-zinc-400">
            From agile daily commuter scooters to commercial logistics powerhouses and racing electric cycles – discover zero-emission vehicles built for your lifestyle.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Bike;
            const categoryVehicles = vehicles.filter(v => v.categoryId === cat.id);
            return (
              <div
                key={cat.id}
                className="group rounded-3xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,168,255,0.25)] flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/40 to-transparent" />

                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-dark-bg/80 backdrop-blur border border-white/10 text-electric">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-extrabold bg-black/70 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                      {categoryVehicles.length || cat.count || 0} Models Ready
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-electric transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                    <Link
                      href={`/vehicles?category=${cat.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-royal to-electric px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <span>Explore {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
