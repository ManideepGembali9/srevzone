"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Zap, Calendar, Clock, MapPin, CheckCircle2, User, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

function TestRideContent() {
  const searchParams = useSearchParams();
  const initialVehicleId = searchParams.get("vehicle") || "";

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    vehicleId: initialVehicleId,
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:00 AM",
    location: "SREVZONE Mega Hub Showroom Track",
    notes: ""
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    const list = Store.getVehicles();
    setVehicles(list);
    if (initialVehicleId) {
      const found = list.find(v => v.id === initialVehicleId);
      if (found) {
        setSelectedVehicle(found);
        setFormData(prev => ({ ...prev, vehicleId: found.id }));
      }
    } else if (list.length > 0) {
      setSelectedVehicle(list[0]);
      setFormData(prev => ({ ...prev, vehicleId: list[0].id }));
    }
  }, [initialVehicleId]);

  const handleSelectVehicle = (v) => {
    setSelectedVehicle(v);
    setFormData(prev => ({ ...prev, vehicleId: v.id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    const created = Store.createTestRide({
      ...formData,
      vehicleName: selectedVehicle?.name || "Electric Vehicle"
    });
    setConfirmedBooking(created);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Instant Electric Torque Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Book VIP <span className="text-gradient-electric">Test Ride</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Feel the exhilarating acceleration of India’s top electric scooters and superbikes. Test ride at our showroom track or request delivery to your doorstep.
          </p>
        </div>

        {confirmedBooking ? (
          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-dark-card border border-emerald-500/40 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Your VIP Test Ride is Reserved!</h2>
            <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-zinc-400">Booking ID:</span> <strong className="text-electric">{confirmedBooking.id}</strong></div>
              <div className="flex justify-between"><span className="text-zinc-400">Vehicle:</span> <strong className="text-white">{confirmedBooking.vehicleName}</strong></div>
              <div className="flex justify-between"><span className="text-zinc-400">Date & Slot:</span> <strong className="text-white">{confirmedBooking.date} at {confirmedBooking.timeSlot}</strong></div>
              <div className="flex justify-between"><span className="text-zinc-400">Location:</span> <strong className="text-tealAccent">{confirmedBooking.location}</strong></div>
            </div>
            <p className="text-xs text-zinc-300">
              Our EV ride specialist will contact you on <strong>{confirmedBooking.phone}</strong> 30 minutes before your slot.
            </p>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-electric hover:text-dark-bg text-white transition-all"
            >
              Book Another Ride
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-lg font-bold text-white">1. Select Electric Vehicle</h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => handleSelectVehicle(v)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      selectedVehicle?.id === v.id
                        ? "bg-dark-card border-electric shadow-[0_0_20px_rgba(0,168,255,0.25)]"
                        : "bg-dark-card/50 border-dark-border hover:border-dark-border/80"
                    }`}
                  >
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-black/60 shrink-0">
                      <Image src={v.image} alt={v.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-electric uppercase font-bold">{v.brand}</div>
                      <div className="text-xs font-bold text-white truncate">{v.name}</div>
                      <div className="text-[11px] text-zinc-400">{v.drivingRange} • {v.maxSpeed}</div>
                    </div>
                    {selectedVehicle?.id === v.id && (
                      <div className="w-5 h-5 rounded-full bg-electric text-dark-bg flex items-center justify-center shrink-0 font-bold text-xs">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-dark-card border border-electric/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(0,168,255,0.15)] space-y-5">
              <div>
                <h3 className="text-2xl font-extrabold text-white">2. Enter Rider Details</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Fill in your preferred date, slot, and test track location.
                </p>
              </div>

              {selectedVehicle && (
                <div className="p-3.5 rounded-xl bg-electric/10 border border-electric/30 text-xs flex items-center justify-between text-white">
                  <div>
                    Selected EV: <strong className="text-electric">{selectedVehicle.name}</strong> ({selectedVehicle.brand})
                  </div>
                  <div className="text-tealAccent font-bold">
                    {formatCurrency(selectedVehicle.discountPrice || selectedVehicle.price)}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Karthik S"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile Phone *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="e.g. 9886033221"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Time Slot *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Location Preference</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, location: "SREVZONE Mega Hub Showroom Track" })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.location.includes("Showroom")
                          ? "border-electric bg-electric/15 text-white font-bold"
                          : "border-dark-border bg-dark-bg text-zinc-400"
                      }`}
                    >
                      🏢 Showroom Test Track
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, location: "Doorstep Home / Office Test Ride" })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.location.includes("Doorstep")
                          ? "border-electric bg-electric/15 text-white font-bold"
                          : "border-dark-border bg-dark-bg text-zinc-400"
                      }`}
                    >
                      🏡 Doorstep VIP Ride
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Additional Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Also want to evaluate exchange of old Honda Activa..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,168,255,0.4)]"
                >
                  Confirm Free VIP Test Ride
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TestRidePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg flex items-center justify-center text-zinc-400 text-xs">Loading Test Ride Scheduler...</div>}>
      <TestRideContent />
    </Suspense>
  );
}
