"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Wrench, 
  Battery, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  Zap,
  Search,
  Check
} from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

function ServiceContent() {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "";

  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  
  // Booking Form State
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    vehicleModel: "",
    regNumber: "",
    serviceName: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM",
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Status tracker state
  const [trackPhone, setTrackPhone] = useState("");
  const [trackedBookings, setTrackedBookings] = useState(null);

  useEffect(() => {
    const list = Store.getServicePackages();
    setPackages(list);
    if (!selectedPackage && list.length > 0) {
      setSelectedPackage(list[0].id);
      setFormData(prev => ({ ...prev, serviceName: list[0].name }));
    }
  }, []);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg.id);
    setFormData(prev => ({ ...prev, serviceName: pkg.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.vehicleModel) {
      alert("Please fill in required customer and vehicle details.");
      return;
    }

    const created = Store.createServiceBooking(formData);
    setBookingSuccess(created);
    setFormData({
      customerName: "",
      phone: "",
      vehicleModel: "",
      regNumber: "",
      serviceName: packages[0]?.name || "General Periodic EV Service",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "10:00 AM",
      notes: ""
    });
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackPhone) return;
    const all = Store.getServiceBookings();
    const cleanQuery = trackPhone.replace(/[^0-9]/g, "");
    const found = all.filter(b => b.phone.replace(/[^0-9]/g, "").includes(cleanQuery));
    setTrackedBookings(found);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>High-Voltage EV Service Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            SREVZONE <span className="text-gradient-electric">Service Centre</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Certified multi-brand electric vehicle diagnostics, specialized battery cell health restoration, genuine parts, and quick turnaround times.
          </p>
        </div>

        {/* Diagnostic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-dark-card border border-dark-border flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-electric/20 text-electric flex items-center justify-center shrink-0">
              <Battery className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Computerized Battery Lab</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                State-of-health (SOH) analysis, thermal sensor calibration, cell balancing and internal resistance measurement.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-card border border-dark-border flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-tealAccent/20 text-tealAccent flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Controller & Motor Tuning</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Phase angle tuning, throttle latency refinement, regenerative braking adjustment and firmware flashing.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-card border border-dark-border flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-royal/20 text-royal flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">100% Genuine Spares</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                OEM wiring harnesses, water-resistant IP67 connectors, ceramic brake pads, and heavy-duty shock absorbers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white">Choose Service Package</h3>
            <p className="text-xs text-zinc-400">
              Select a service below to prefill your booking appointment.
            </p>

            <div className="space-y-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedPackage === pkg.id
                      ? "bg-dark-card border-electric shadow-[0_0_20px_rgba(0,168,255,0.25)]"
                      : "bg-dark-card/60 border-dark-border hover:border-dark-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{pkg.name}</h4>
                    <span className="text-base font-black text-electric">{formatCurrency(pkg.price)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                    <Clock className="w-3 h-3 text-tealAccent" />
                    <span>Duration: {pkg.duration}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-dark-card border border-dark-border space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Search className="w-4 h-4 text-electric" />
                Track My Service Status
              </h4>
              <p className="text-xs text-zinc-400">
                Enter your mobile number to check the live status of your vehicle in our workshop.
              </p>
              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={trackPhone}
                  onChange={(e) => setTrackPhone(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-white/10 hover:bg-electric hover:text-dark-bg text-white rounded-xl transition-all"
                >
                  Track
                </button>
              </form>

              {trackedBookings && (
                <div className="space-y-2 pt-2">
                  {trackedBookings.length === 0 ? (
                    <div className="text-xs text-zinc-400 italic">No bookings found for this number.</div>
                  ) : (
                    trackedBookings.map((b) => (
                      <div key={b.id} className="p-3 rounded-xl bg-dark-bg border border-dark-border text-xs space-y-1">
                        <div className="flex justify-between font-bold text-white">
                          <span>{b.vehicleModel}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            b.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" :
                            b.status === "In Progress" ? "bg-blue-500/20 text-blue-400" :
                            b.status === "Confirmed" ? "bg-teal-500/20 text-tealAccent" :
                            "bg-amber-500/20 text-amber-400"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="text-zinc-400">{b.serviceName} • {b.date} ({b.timeSlot})</div>
                        {b.notes && <div className="text-[11px] text-zinc-500">Note: {b.notes}</div>}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-dark-card border border-electric/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(0,168,255,0.15)]">
            {bookingSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Service Appointment Confirmed!</h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Booking Reference: <strong className="text-electric">{bookingSuccess.id}</strong>. We have scheduled your <strong>{bookingSuccess.serviceName}</strong> on <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.timeSlot}</strong>.
                </p>
                <button
                  onClick={() => setBookingSuccess(null)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-electric text-dark-bg hover:opacity-90 transition-opacity"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Schedule Service Appointment</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Book online and skip the queue. Dedicated bay reserved for your EV.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-electric/10 border border-electric/30 text-xs font-semibold text-electric flex items-center justify-between">
                  <span>Selected Package: <strong>{formData.serviceName}</strong></span>
                  <span className="text-[11px] text-zinc-400">(Change on left)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile Number *</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Vehicle Brand & Model *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ather 450X, Ola S1, Revolt RV400"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      required
                      className="w-full px-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Registration / Number Plate</label>
                    <input
                      type="text"
                      placeholder="e.g. KA 03 AB 1234 (Optional)"
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Preferred Date *</label>
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
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Preferred Time Slot *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                      >
                        <option value="09:30 AM">09:30 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Describe Any Specific Issues / Symptoms</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Battery drops suddenly at 20%, front brake spongy, fast charging port loose..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,168,255,0.4)]"
                >
                  Confirm Service Appointment
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ServiceCentrePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg flex items-center justify-center text-zinc-400 text-xs">Loading Service Centre...</div>}>
      <ServiceContent />
    </Suspense>
  );
}
