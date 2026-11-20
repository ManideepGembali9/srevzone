"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";

export default function VehicleCard({ vehicle }) {
  const effectivePrice = vehicle.discountPrice || vehicle.price;
  const discountPercent = vehicle.discountPrice && vehicle.price > vehicle.discountPrice
    ? Math.round(((vehicle.price - vehicle.discountPrice) / vehicle.price) * 100)
    : 0;

  const whatsappMessage = `Hello SREVZONE! I would like to enquire about the ${vehicle.brand} ${vehicle.name} priced at ${formatCurrency(effectivePrice)}. Please share availability and current showroom offers.`;

  return (
    <div className="group relative bg-dark-card border border-dark-border hover:border-electric/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,168,255,0.2)] flex flex-col justify-between">
      
      {/* 1. Vehicle Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {vehicle.isNewArrival && (
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-electric text-dark-bg rounded-full shadow-lg">
              New Arrival
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white rounded-full shadow-lg">
              Save {discountPercent}%
            </span>
          )}
          <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-black/75 backdrop-blur text-zinc-300 rounded-full border border-white/10">
            {vehicle.categoryName}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute bottom-2 left-3 text-[11px] font-medium text-emerald-400 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-0.5 rounded-lg border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{vehicle.stock > 0 ? `${vehicle.stock} Units in Showroom` : "Available on Order"}</span>
        </div>
      </div>

      {/* 2. Vehicle Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Brand, Name, Description */}
        <div>
          <div className="text-xs font-bold text-electric uppercase tracking-wider">
            {vehicle.brand}
          </div>
          <Link href={`/vehicles/${vehicle.id}`}>
            <h3 className="text-lg font-extrabold text-white group-hover:text-electric transition-colors mt-0.5 line-clamp-1">
              {vehicle.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
            {vehicle.description}
          </p>
        </div>

        {/* Key Spec Badges */}
        <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-dark-bg/70 border border-dark-border text-xs">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Zap className="w-3.5 h-3.5 text-electric shrink-0" />
            <span className="truncate">{vehicle.drivingRange || "120+ km"} Range</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent shrink-0" />
            <span className="truncate">{vehicle.maxSpeed || "80 km/h"} Speed</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-dark-border/80 space-y-3">
          
          {/* Price */}
          <div>
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Ex-Showroom Price</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">
                {formatCurrency(effectivePrice)}
              </span>
              {vehicle.discountPrice && vehicle.discountPrice < vehicle.price && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatCurrency(vehicle.price)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: "View Details" and "Enquire on WhatsApp" */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/vehicles/${vehicle.id}`}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-dark-bg border border-dark-border hover:border-electric/50 hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-electric" />
            </Link>

            <a
              href={getWhatsAppLink("+919876543210", whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#25D366]/20"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
