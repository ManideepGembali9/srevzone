"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scale, Zap, X, Plus, Trash2, ArrowRight } from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function ComparePage() {
  const [vehicles, setVehicles] = useState([]);
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    const load = () => {
      setVehicles(Store.getVehicles());
      setCompareIds(Store.getCompareList());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const comparedVehicles = vehicles.filter(v => compareIds.includes(v.id));

  const handleRemove = (id) => {
    const updated = Store.toggleCompare(id);
    setCompareIds(updated);
  };

  const handleClear = () => {
    Store.clearCompare();
    setCompareIds([]);
  };

  const metrics = [
    { label: "Category", get: v => v.categoryName },
    { label: "Ex-Showroom Price", get: v => formatCurrency(v.discountPrice || v.price) },
    { label: "Certified Driving Range", get: v => v.drivingRange },
    { label: "Top Speed", get: v => v.maxSpeed },
    { label: "Battery Capacity", get: v => v.batteryCapacity },
    { label: "Charging Time (0-80%)", get: v => v.chargingTime },
    { label: "Motor Power (Peak)", get: v => v.motorPower },
    { label: "Warranty Coverage", get: v => v.warranty },
    { label: "Showroom Stock", get: v => v.stock > 0 ? `${v.stock} Units Ready` : "On Order" }
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Multi-Vehicle Spec Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Vehicle <span className="text-gradient-electric">Comparison</span>
            </h1>
          </div>

          {comparedVehicles.length > 0 && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Comparisons</span>
            </button>
          )}
        </div>

        {comparedVehicles.length === 0 ? (
          <div className="py-20 text-center bg-dark-card border border-dark-border rounded-3xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-dark-bg border border-dark-border mx-auto flex items-center justify-center text-zinc-500">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">No Vehicles in Comparison</h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Click the scale icon on any vehicle card in the catalogue to compare battery, range, price, and top speed side-by-side.
            </p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90"
            >
              <span>Browse EV Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-dark-border bg-dark-card shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="p-4 sm:p-6 text-xs font-bold text-zinc-400 uppercase w-48 bg-dark-bg/60">
                    Feature / Spec
                  </th>
                  {comparedVehicles.map((v) => (
                    <th key={v.id} className="p-4 sm:p-6 min-w-[240px] align-top">
                      <div className="relative">
                        <button
                          onClick={() => handleRemove(v.id)}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/60 mb-3">
                          <Image src={v.image} alt={v.name} fill sizes="240px" className="object-cover" />
                        </div>
                        <div className="text-[10px] text-electric uppercase font-bold">{v.brand}</div>
                        <h4 className="text-sm font-bold text-white truncate">{v.name}</h4>
                        <div className="mt-2 flex gap-2">
                          <Link
                            href={`/vehicles/${v.id}`}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white"
                          >
                            Details
                          </Link>
                          <Link
                            href={`/test-ride?vehicle=${v.id}`}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-electric text-dark-bg hover:opacity-90"
                          >
                            Test Ride
                          </Link>
                        </div>
                      </div>
                    </th>
                  ))}
                  {comparedVehicles.length < 4 && (
                    <th className="p-6 min-w-[200px] text-center align-middle">
                      <Link
                        href="/vehicles"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-dark-border hover:border-electric/50 rounded-2xl text-zinc-400 hover:text-white transition-all group"
                      >
                        <Plus className="w-8 h-8 text-zinc-500 group-hover:text-electric transition-colors mb-2" />
                        <span className="text-xs font-bold">Add Vehicle</span>
                        <span className="text-[10px] text-zinc-500 mt-1">Up to 4 vehicles</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60 text-xs">
                {metrics.map((m, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-dark-bg/20" : ""}>
                    <td className="p-4 sm:p-5 font-semibold text-zinc-400 bg-dark-bg/40">
                      {m.label}
                    </td>
                    {comparedVehicles.map((v) => (
                      <td key={v.id} className="p-4 sm:p-5 font-bold text-white">
                        {m.get(v)}
                      </td>
                    ))}
                    {comparedVehicles.length < 4 && <td />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
