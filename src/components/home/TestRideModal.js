"use client";

import { useState } from "react";
import { Zap, X, Calendar, Clock, MapPin, CheckCircle2, User, Phone } from "lucide-react";
import { Store } from "@/lib/store";

export default function TestRideModal({
  isOpen,
  onClose,
  initialVehicle = null,
  vehicles = []
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    vehicleId: initialVehicle?.id || (vehicles[0]?.id || ""),
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:00 AM",
    location: "SREVZONE Mega Hub Showroom",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      alert("Please enter your name and contact phone number.");
      return;
    }

    const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId) || initialVehicle;
    Store.createTestRide({
      ...formData,
      vehicleName: selectedVehicle?.name || "Selected EV"
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,168,255,0.3)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-dark-bg border border-dark-border text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">VIP Test Ride Reserved!</h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
              Our EV specialist will call you shortly on <strong>{formData.phone}</strong> to confirm your slot and prepare your helmet & vehicle.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-xs font-bold text-electric uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Zero-Emission Thrill</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Book VIP Test Ride</h3>
              <p className="text-xs text-zinc-400">
                Experience instant electric torque on our dedicated test track or at your doorstep.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Vehicle Selection */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Select Vehicle</label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id} className="bg-dark-bg text-white">
                      {v.name} ({v.brand}) - {v.drivingRange}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Arun Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Preferred Date</label>
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
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Preferred Time Slot</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    >
                      <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:30 AM">11:30 AM - 12:30 PM</option>
                      <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="04:00 PM">04:00 PM - 05:00 PM</option>
                      <option value="06:00 PM">06:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Preference */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Ride Location</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, location: "SREVZONE Mega Hub Showroom" })}
                    className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                      formData.location.includes("Showroom")
                        ? "border-electric bg-electric/10 text-white font-bold"
                        : "border-dark-border bg-dark-bg text-zinc-400 hover:text-white"
                    }`}
                  >
                    🏢 Showroom Track
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, location: "Home / Office Doorstep" })}
                    className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                      formData.location.includes("Doorstep")
                        ? "border-electric bg-electric/10 text-white font-bold"
                        : "border-dark-border bg-dark-bg text-zinc-400 hover:text-white"
                    }`}
                  >
                    🏡 Doorstep Test Ride
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,168,255,0.4)]"
              >
                Confirm Free Test Ride Slot
              </button>
              <p className="text-[10px] text-zinc-500 text-center mt-2">
                *Valid driving licence required for high-speed two-wheelers. Helmets sanitized and provided.
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
