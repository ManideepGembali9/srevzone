"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Zap, 
  BatteryCharging, 
  Gauge, 
  ShieldCheck, 
  Clock, 
  Heart, 
  MessageCircle, 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  Award,
  Sparkles,
  Truck
} from "lucide-react";
import VehicleCard from "@/components/vehicles/VehicleCard";
import TestRideModal from "@/components/home/TestRideModal";
import { Store } from "@/lib/store";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [vehicle, setVehicle] = useState(null);
  const [allVehicles, setAllVehicles] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'features' | 'video'
  
  // Test Ride Modal
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);
  
  // Wishlist state
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (!id) return;
    const v = Store.getVehicleById(id);
    if (v) {
      setVehicle(v);
      setActiveImage(v.image);
      setSelectedColor(v.colors?.[0] || "");
      setInWishlist(Store.getWishlist().includes(v.id));
    }
    setAllVehicles(Store.getVehicles());

    const handleUpdate = () => {
      const updated = Store.getVehicleById(id);
      if (updated) {
        setVehicle(updated);
        setInWishlist(Store.getWishlist().includes(updated.id));
      }
      setAllVehicles(Store.getVehicles());
    };

    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, [id]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Zap className="w-12 h-12 text-electric mx-auto animate-pulse" />
          <h2 className="text-xl font-bold text-white">Loading Vehicle Specifications...</h2>
          <Link href="/vehicles" className="inline-block text-xs text-electric hover:underline">
            Back to All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const effectivePrice = vehicle.discountPrice || vehicle.price;
  const discountAmount = vehicle.discountPrice && vehicle.price > vehicle.discountPrice ? vehicle.price - vehicle.discountPrice : 0;

  const handleToggleWishlist = () => {
    const list = Store.toggleWishlist(vehicle.id);
    setInWishlist(list.includes(vehicle.id));
  };

  const galleryImages = [vehicle.image, ...(vehicle.gallery || [])].filter((url, i, arr) => arr.indexOf(url) === i);
  const similarVehicles = allVehicles.filter(v => v.categoryId === vehicle.categoryId && v.id !== vehicle.id).slice(0, 3);

  const whatsappMessage = `Hello SREVZONE! I am interested in booking or enquiring about the ${vehicle.brand} ${vehicle.name} (${formatCurrency(effectivePrice)}). Please provide details regarding availability, booking process, and showroom delivery time.`;

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-textMuted mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/vehicles" className="hover:text-white transition-colors">Vehicles</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-electric font-semibold">{vehicle.name}</span>
        </div>

        {/* Vehicle Main Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery & Video (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Active Display Stage */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-dark-card border border-dark-border shadow-[0_0_35px_rgba(0,168,255,0.2)]">
              {activeTab === "video" && vehicle.videoUrl ? (
                <iframe
                  src={vehicle.videoUrl}
                  title={vehicle.name}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={activeImage || vehicle.image}
                  alt={vehicle.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              )}

              {/* Floating category badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-electric text-dark-bg uppercase tracking-wider">
                  {vehicle.categoryName}
                </span>
                {vehicle.isNewArrival && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-dark-bg uppercase tracking-wider">
                    New 2026 Model
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2.5 rounded-full backdrop-blur transition-all ${
                    inWishlist ? "bg-red-500 text-white shadow-lg" : "bg-black/60 text-white hover:text-red-400 hover:bg-black/80"
                  }`}
                  title={inWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImage(img);
                    setActiveTab("overview");
                  }}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img && activeTab !== "video"
                      ? "border-electric scale-105 shadow-md"
                      : "border-dark-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}

              {vehicle.videoUrl && (
                <button
                  onClick={() => setActiveTab("video")}
                  className={`relative w-24 h-16 rounded-xl shrink-0 border-2 bg-dark-card flex flex-col items-center justify-center text-xs font-bold transition-all ${
                    activeTab === "video"
                      ? "border-electric text-electric scale-105"
                      : "border-dark-border text-zinc-400 hover:text-white"
                  }`}
                >
                  <Play className="w-5 h-5 fill-current mb-0.5" />
                  <span>Promo Reel</span>
                </button>
              )}
            </div>

            {/* Color Options */}
            {vehicle.colors && vehicle.colors.length > 0 && (
              <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400">Available Showroom Colours:</span>
                <div className="flex items-center gap-2">
                  {vehicle.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                        selectedColor === color
                          ? "bg-electric/20 text-electric border border-electric/40 font-bold"
                          : "bg-dark-bg text-zinc-400 border border-dark-border hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Pricing, Specs & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="text-xs font-extrabold text-electric uppercase tracking-wider">{vehicle.brand}</div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">{vehicle.name}</h1>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Model Variant: {vehicle.model}</div>
              <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="p-6 rounded-3xl bg-dark-card border border-electric/30 shadow-[0_0_30px_rgba(0,168,255,0.15)] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider">Official Ex-Showroom Price</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-white">{formatCurrency(effectivePrice)}</span>
                    {discountAmount > 0 && (
                      <span className="text-sm text-zinc-500 line-through">
                        {formatCurrency(vehicle.price)}
                      </span>
                    )}
                  </div>
                </div>

                {discountAmount > 0 && (
                  <div className="text-right">
                    <span className="px-3 py-1 text-xs font-black rounded-full bg-red-600 text-white shadow-lg">
                      Save {formatCurrency(discountAmount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-xs text-emerald-400 flex items-center gap-2 pt-1 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Eligible for State EV Subsidy + Zero Road Tax</span>
              </div>
              <div className="text-xs text-zinc-300 flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-electric shrink-0" />
                <span>{vehicle.warranty || "5 Years / 60,000 km Battery Warranty"}</span>
              </div>
            </div>

            {/* High-Level Spec Highlights */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-electric" /> Certified Range
                </div>
                <div className="text-lg font-black text-white mt-1">{vehicle.drivingRange}</div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-tealAccent" /> Top Speed
                </div>
                <div className="text-lg font-black text-white mt-1">{vehicle.maxSpeed}</div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-royal" /> Battery Pack
                </div>
                <div className="text-lg font-black text-white mt-1">{vehicle.batteryCapacity}</div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Charging Time
                </div>
                <div className="text-lg font-black text-white mt-1">{vehicle.chargingTime}</div>
              </div>
            </div>

            {/* Direct Action Buttons: Test Ride & WhatsApp */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setTestRideModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 shadow-[0_0_25px_rgba(0,168,255,0.4)] transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Book VIP Test Ride</span>
              </button>

              <a
                href={getWhatsAppLink("+919876543210", whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Showroom Direct Benefits (Replacing EMI clutter) */}
            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-electric" />
                <span>SREVZONE Showroom Guarantee</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent shrink-0" />
                  <span>Immediate Showroom Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent shrink-0" />
                  <span>100% Genuine OEM Spares</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent shrink-0" />
                  <span>Best Exchange Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent shrink-0" />
                  <span>Complimentary Doorstep Setup</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Specifications & Features */}
        <div className="mt-16 pt-10 border-t border-dark-border/60">
          <div className="flex border-b border-dark-border gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "overview" ? "border-electric text-electric" : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Full Specifications
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "features" ? "border-electric text-electric" : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Smart Features ({vehicle.features?.length || 0})
            </button>
          </div>

          <div className="py-8">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(vehicle.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3.5 rounded-xl bg-dark-card border border-dark-border text-xs">
                    <span className="capitalize text-zinc-400 font-medium">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="text-white font-bold">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3.5 rounded-xl bg-dark-card border border-dark-border text-xs">
                  <span className="text-zinc-400 font-medium">Motor Power</span>
                  <span className="text-white font-bold">{vehicle.motorPower}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 rounded-xl bg-dark-card border border-dark-border text-xs">
                  <span className="text-zinc-400 font-medium">Warranty Coverage</span>
                  <span className="text-white font-bold">{vehicle.warranty}</span>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vehicle.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-dark-card border border-dark-border text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-tealAccent shrink-0" />
                    <span className="font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Similar Vehicles Grid */}
        {similarVehicles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-dark-border/60">
            <h3 className="text-2xl font-bold text-white mb-6">
              Similar <span className="text-gradient-electric">{vehicle.categoryName}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((sim) => (
                <VehicleCard
                  key={sim.id}
                  vehicle={sim}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Global Test Ride Modal */}
      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        initialVehicle={vehicle}
        vehicles={allVehicles}
      />
    </div>
  );
}
