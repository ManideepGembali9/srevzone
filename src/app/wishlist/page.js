"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Zap, Trash2 } from "lucide-react";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { Store } from "@/lib/store";

export default function WishlistPage() {
  const [vehicles, setVehicles] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const load = () => {
      setVehicles(Store.getVehicles());
      setWishlistIds(Store.getWishlist());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const savedVehicles = vehicles.filter(v => wishlistIds.includes(v.id));

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Electric Vehicles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            My <span className="text-gradient-electric">Wishlist</span> ({savedVehicles.length})
          </h1>
        </div>

        {savedVehicles.length === 0 ? (
          <div className="py-20 text-center bg-dark-card border border-dark-border rounded-3xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-dark-bg border border-dark-border mx-auto flex items-center justify-center text-zinc-500">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Your Wishlist is Empty</h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Save your favorite electric scooters, bikes, and cycles to compare specs or book a VIP test ride later.
            </p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90"
            >
              <span>Explore EV Showroom</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
