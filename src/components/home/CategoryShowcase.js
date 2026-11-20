"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bike, Zap, Compass, Truck, ShieldAlert, Layers, Sparkles, Activity } from "lucide-react";

const ICON_MAP = {
  Bike: Bike,
  Zap: Zap,
  Compass: Compass,
  Truck: Truck,
  ShieldAlert: ShieldAlert,
  Layers: Layers,
  Sparkles: Sparkles,
  Activity: Activity
};

export default function CategoryShowcase({ categories }) {
  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-electric uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Multi-Segment Electric Mobility</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Explore By <span className="text-gradient-electric">Vehicle Category</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:text-white transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || Bike;
            return (
              <Link
                key={category.id}
                href={`/vehicles?category=${category.id}`}
                className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,168,255,0.2)] flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/40 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-dark-bg/80 backdrop-blur border border-white/10 text-electric">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Count badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur border border-white/10 text-[11px] font-semibold text-zinc-300">
                    {category.count || "Available"} Models
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-electric transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dark-border flex items-center justify-between text-xs font-semibold text-electric group-hover:text-white transition-colors">
                    <span>Browse Vehicles</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
