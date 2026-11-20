"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  Grid3X3, 
  List, 
  RotateCcw, 
  Zap, 
  ChevronRight,
  X
} from "lucide-react";
import VehicleCard from "@/components/vehicles/VehicleCard";
import TestRideModal from "@/components/home/TestRideModal";
import { Store } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

function VehiclesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState(450000);
  const [minRange, setMinRange] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  
  // Modals & Drawers
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);

  useEffect(() => {
    const load = () => {
      setVehicles(Store.getVehicles());
      setCategories(Store.getCategories());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
  }, [searchParams]);

  const brands = useMemo(() => {
    const set = new Set(vehicles.map(v => v.brand).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = v.name?.toLowerCase().includes(query);
        const matchesBrand = v.brand?.toLowerCase().includes(query);
        const matchesModel = v.model?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel) return false;
      }

      if (selectedCategory !== "all" && v.categoryId !== selectedCategory) {
        return false;
      }

      if (selectedBrand !== "all" && v.brand !== selectedBrand) {
        return false;
      }

      const effectivePrice = v.discountPrice || v.price;
      if (effectivePrice > maxPrice) return false;

      const rangeNum = parseInt(v.drivingRange) || 0;
      if (rangeNum < minRange) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      const rangeA = parseInt(a.drivingRange) || 0;
      const rangeB = parseInt(b.drivingRange) || 0;
      const speedA = parseInt(a.maxSpeed) || 0;
      const speedB = parseInt(b.maxSpeed) || 0;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "range-high") return rangeB - rangeA;
      if (sortBy === "speed-high") return speedB - speedA;
      if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [vehicles, searchTerm, selectedCategory, selectedBrand, maxPrice, minRange, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setMaxPrice(450000);
    setMinRange(0);
    setSortBy("featured");
  };

  const handleOpenTestRide = (vehicle) => {
    setSelectedVehicleForModal(vehicle);
    setTestRideModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-textMuted mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-electric font-semibold">Electric Vehicles Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Explore All <span className="text-gradient-electric">Electric Vehicles</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Compare top brands, battery ranges, fast charging times, and zero-emission specs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-dark-card border border-dark-border mb-8 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by model, brand (e.g. Ather, Ola, Ultraviolette)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-electric"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              >
                <option value="all">All Categories ({vehicles.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric capitalize"
              >
                <option value="all">All Brands</option>
                {brands.filter(b => b !== "all").map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="range-high">Driving Range: High to Low</option>
                <option value="speed-high">Top Speed: High to Low</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-dark-border/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs">
            <div className="md:col-span-5 space-y-1">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="font-medium text-textMuted">Max Price:</span>
                <span className="font-bold text-electric">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="30000"
                max="450000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-electric bg-dark-bg h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="md:col-span-5 space-y-1">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="font-medium text-textMuted">Min Driving Range:</span>
                <span className="font-bold text-tealAccent">{minRange} km+</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={minRange}
                onChange={(e) => setMinRange(Number(e.target.value))}
                className="w-full accent-tealAccent bg-dark-bg h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <div className="flex items-center border border-dark-border rounded-lg overflow-hidden bg-dark-bg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-electric/20 text-electric font-bold" : "text-zinc-500 hover:text-white"}`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-electric/20 text-electric font-bold" : "text-zinc-500 hover:text-white"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 text-xs text-textMuted">
          <div>
            Showing <strong className="text-white">{filteredVehicles.length}</strong> of {vehicles.length} electric vehicles
          </div>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {filteredVehicles.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                onTestRideClick={handleOpenTestRide}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-dark-card border border-dark-border rounded-3xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-dark-bg border border-dark-border mx-auto flex items-center justify-center text-zinc-500">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No vehicles matched your filter</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Try adjusting your price range, driving range, or category filter to discover available electric models.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90 shadow-md inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        initialVehicle={selectedVehicleForModal}
        vehicles={vehicles}
      />
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg flex items-center justify-center text-zinc-400 text-xs">Loading EV Catalogue...</div>}>
      <VehiclesContent />
    </Suspense>
  );
}
