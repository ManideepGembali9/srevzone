"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  ExternalLink
} from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import CinematicScooterShowcase from "@/components/home/CinematicScooterShowcase";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import DailyUpdatesFeed from "@/components/home/DailyUpdatesFeed";
import WhyChooseSrev from "@/components/home/WhyChooseSrev";
import ServiceCentreTeaser from "@/components/home/ServiceCentreTeaser";
import TestRideModal from "@/components/home/TestRideModal";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { Store } from "@/lib/store";

export default function HomePage() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [servicePackages, setServicePackages] = useState([]);
  const [settings, setSettings] = useState(null);
  
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setVehicles(Store.getVehicles());
      setCategories(Store.getCategories());
      setPromotions(Store.getPromotions());
      setUpdates(Store.getDailyUpdates());
      setServicePackages(Store.getServicePackages());
      setSettings(Store.getSettings());
    };
    loadData();

    window.addEventListener("srevzone_storage_updated", loadData);
    return () => window.removeEventListener("srevzone_storage_updated", loadData);
  }, []);

  const handleOpenTestRide = (vehicle = null) => {
    setSelectedVehicleForModal(vehicle);
    setTestRideModalOpen(true);
  };

  const featuredVehicles = vehicles.filter(v => v.isFeatured);
  const newArrivals = vehicles.filter(v => v.isNewArrival);

  return (
    <div className="w-full flex flex-col space-y-0 pb-24 md:pb-0">
      
      {/* 1. Hero Section */}
      <HeroSection settings={settings} />

      {/* 2. Cinematic Electric Scooter Showcase */}
      <CinematicScooterShowcase />

      {/* 3. Explore Vehicle Categories */}
      <CategoryShowcase categories={categories} />

      {/* 4. Featured Electric Vehicles */}
      <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-extrabold text-electric uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Showroom Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Featured <span className="text-gradient-electric">Electric Vehicles</span>
              </h2>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-sm font-bold text-electric hover:text-white transition-colors group"
            >
              <span>Explore All {vehicles.length} Vehicles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredVehicles.length > 0 ? featuredVehicles : vehicles.slice(0, 4)).map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. Latest Vehicle Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="text-xs font-extrabold text-tealAccent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Just Unveiled In Showroom</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Latest <span className="text-gradient-electric">Vehicle Arrivals</span>
                </h2>
              </div>
              <Link
                href="/vehicles?sort=newest"
                className="inline-flex items-center gap-2 text-sm font-bold text-electric hover:text-white transition-colors group"
              >
                <span>View All New Releases</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Current Promotions */}
      <FeaturedOffers promotions={promotions} />

      {/* 7. Latest Showroom Photos and Videos */}
      <DailyUpdatesFeed updates={updates} />

      {/* 8. Why Choose SREVZONE */}
      <WhyChooseSrev />

      {/* 9. Service Centre Introduction */}
      <ServiceCentreTeaser packages={servicePackages} />

      {/* 10. Contact and Showroom Location */}
      <section className="py-20 bg-dark-bg border-t border-dark-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-dark-card to-dark-bg border border-electric/30 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,168,255,0.15)] relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Visit Our Experience Centre</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">
                  Experience SREVZONE in Person
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Walk into Bangalore’s largest multi-brand electric vehicle showroom. Take test rides on our dedicated test track, consult finance officers, and test portable chargers firsthand.
                </p>

                <div className="space-y-3 pt-2 text-xs text-zinc-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                    <span>{settings?.address || "SREVZONE EV Mega Hub, Outer Ring Road, Bangalore - 560103"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-tealAccent shrink-0" />
                    <span>{settings?.openingHours || "Monday - Sunday: 09:00 AM - 08:30 PM (No Lunch Break)"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-royal shrink-0" />
                    <a href={`tel:${settings?.phone || "+919876543210"}`} className="hover:text-white transition-colors font-semibold">
                      {settings?.phone || "+91 98765 43210"}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => handleOpenTestRide(null)}
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-royal to-electric hover:opacity-90 shadow-lg uppercase tracking-wider"
                  >
                    Schedule Showroom Visit
                  </button>
                  <a
                    href={settings?.googleMapsUrl || "https://maps.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-dark-bg border border-dark-border hover:border-electric/50 transition-colors"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-4 h-4 text-electric" />
                  </a>
                </div>
              </div>

              {/* Showroom Map Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-dark-border shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124443.37525381983!2d77.56828555!3d12.92342545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e05b3ff75%3A0x6b7724285e6b770!2sOuter%20Ring%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen=""
                    loading="lazy"
                    title="SREVZONE Showroom Map"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Global Interactive Test Ride Modal */}
      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        initialVehicle={selectedVehicleForModal}
        vehicles={vehicles}
      />

    </div>
  );
}
