"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Search,
  Filter
} from "lucide-react";
import { Store } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/utils";

function AdminCustomersContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "test-rides" ? "test-rides" : "enquiries";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [enquiries, setEnquiries] = useState([]);
  const [testRides, setTestRides] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = () => {
      setEnquiries(Store.getEnquiries());
      setTestRides(Store.getTestRides());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleEnquiryStatus = (id, newStatus) => {
    Store.updateEnquiryStatus(id, newStatus);
  };

  const handleTestRideStatus = (id, newStatus) => {
    Store.updateTestRideStatus(id, newStatus);
  };

  const filteredEnquiries = enquiries.filter(e => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.name?.toLowerCase().includes(q) || e.phone?.includes(q) || e.subject?.toLowerCase().includes(q);
  });

  const filteredRides = testRides.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.customerName?.toLowerCase().includes(q) || r.phone?.includes(q) || r.vehicleName?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Customer CRM & Inquiries</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage incoming purchase inquiries, exchange requests, and VIP test ride reservations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "enquiries"
                ? "bg-electric text-dark-bg"
                : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
            }`}
          >
            Inquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("test-rides")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "test-rides"
                ? "bg-electric text-dark-bg"
                : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
            }`}
          >
            Test Rides ({testRides.length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by customer name, mobile or topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs bg-dark-card border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
        />
      </div>

      {/* Content Stage */}
      {activeTab === "enquiries" ? (
        <div className="rounded-3xl border border-dark-border bg-dark-card overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/60 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Subject / Topic</th>
                  <th className="p-4">Vehicle Mentioned</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      <div className="font-bold text-white">{enq.name}</div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{enq.phone}</div>
                      {enq.email && <div className="text-[10px] text-zinc-500">{enq.email}</div>}
                    </td>

                    <td className="p-4 font-semibold text-zinc-200">
                      {enq.subject}
                    </td>

                    <td className="p-4 text-electric font-semibold">
                      {enq.vehicleName || "General EV"}
                    </td>

                    <td className="p-4 max-w-xs">
                      <p className="text-zinc-300 italic line-clamp-2">"{enq.message}"</p>
                    </td>

                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none ${
                          enq.status === "New" ? "bg-red-500/20 text-red-400 border-red-500/40" :
                          enq.status === "Contacted" ? "bg-blue-500/20 text-blue-400 border-blue-500/40" :
                          enq.status === "Converted" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" :
                          "bg-zinc-700/30 text-zinc-400 border-zinc-600"
                        }`}
                      >
                        <option value="New" className="bg-dark-bg text-white">New</option>
                        <option value="Contacted" className="bg-dark-bg text-white">Contacted</option>
                        <option value="Converted" className="bg-dark-bg text-white">Converted</option>
                        <option value="Closed" className="bg-dark-bg text-white">Closed</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <a
                        href={getWhatsAppLink(enq.phone, `Hello ${enq.name}! Thank you for your inquiry regarding "${enq.subject}" at SREVZONE. How may we assist you today?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:opacity-90 shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dark-border bg-dark-card overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/60 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Vehicle to Test</th>
                  <th className="p-4">Date & Time Slot</th>
                  <th className="p-4">Location Preference</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {filteredRides.map((ride) => (
                  <tr key={ride.id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      <div className="font-bold text-white">{ride.customerName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{ride.phone}</div>
                      {ride.notes && <div className="text-[10px] text-zinc-500 italic">Note: {ride.notes}</div>}
                    </td>

                    <td className="p-4 font-bold text-electric">
                      {ride.vehicleName}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-white">{ride.date}</div>
                      <div className="text-[10px] text-tealAccent">{ride.timeSlot}</div>
                    </td>

                    <td className="p-4 text-zinc-300 font-medium">
                      {ride.location}
                    </td>

                    <td className="p-4">
                      <select
                        value={ride.status}
                        onChange={(e) => handleTestRideStatus(ride.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none ${
                          ride.status === "Pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" :
                          ride.status === "Confirmed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" :
                          ride.status === "Completed" ? "bg-blue-500/20 text-blue-400 border-blue-500/40" :
                          "bg-red-500/20 text-red-400 border-red-500/40"
                        }`}
                      >
                        <option value="Pending" className="bg-dark-bg text-white">Pending</option>
                        <option value="Confirmed" className="bg-dark-bg text-white">Confirmed</option>
                        <option value="Completed" className="bg-dark-bg text-white">Completed</option>
                        <option value="Cancelled" className="bg-dark-bg text-white">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <a
                        href={getWhatsAppLink(ride.phone, `Hello ${ride.customerName}! Your SREVZONE VIP Test Ride for the ${ride.vehicleName} is scheduled on ${ride.date} at ${ride.timeSlot} (${ride.location}). Please confirm your availability.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:opacity-90 shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Confirm Slot</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminCustomersPage() {
  return (
    <Suspense fallback={<div className="text-xs text-zinc-400">Loading Inquiries CRM...</div>}>
      <AdminCustomersContent />
    </Suspense>
  );
}
