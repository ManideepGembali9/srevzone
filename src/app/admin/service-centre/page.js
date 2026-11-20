"use client";

import { useState, useEffect } from "react";
import { 
  Wrench, 
  Clock, 
  Calendar, 
  Phone, 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  X
} from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";

export default function AdminServiceCentrePage() {
  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings' | 'packages'
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Package Modal State
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [pkgFormData, setPkgFormData] = useState({
    name: "",
    price: 799,
    duration: "90 Mins",
    description: "",
    popular: false,
    points: ["32-Point Comprehensive EV Diagnostics"]
  });

  useEffect(() => {
    const load = () => {
      setBookings(Store.getServiceBookings());
      setPackages(Store.getServicePackages());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    Store.updateServiceBookingStatus(id, newStatus);
  };

  const handleOpenAddPkg = () => {
    setEditingPkg(null);
    setPkgFormData({
      name: "",
      price: 799,
      duration: "90 Mins",
      description: "",
      popular: false,
      points: ["32-Point Diagnostic Inspection"]
    });
    setPkgModalOpen(true);
  };

  const handleOpenEditPkg = (p) => {
    setEditingPkg(p);
    setPkgFormData({
      ...p,
      points: p.points || []
    });
    setPkgModalOpen(true);
  };

  const handleDeletePkg = (id) => {
    if (confirm("Delete this service package?")) {
      Store.deleteServicePackage(id);
    }
  };

  const handleSubmitPkg = (e) => {
    e.preventDefault();
    const payload = {
      ...pkgFormData,
      price: Number(pkgFormData.price),
      points: Array.isArray(pkgFormData.points) ? pkgFormData.points : String(pkgFormData.points).split("\n").filter(Boolean)
    };
    if (editingPkg) payload.id = editingPkg.id;
    Store.saveServicePackage(payload);
    setPkgModalOpen(false);
  };

  const filteredBookings = bookings.filter(b => {
    if (statusFilter === "all") return true;
    return b.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Workshop & Service Centre</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage customer service bookings, update live job statuses, and configure workshop maintenance packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "bookings"
                ? "bg-electric text-dark-bg"
                : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
            }`}
          >
            Service Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "packages"
                ? "bg-electric text-dark-bg"
                : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
            }`}
          >
            Manage Packages ({packages.length})
          </button>
        </div>
      </div>

      {activeTab === "bookings" ? (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between bg-dark-card p-4 rounded-2xl border border-dark-border">
            <div className="flex gap-2">
              {["all", "Pending", "Confirmed", "In Progress", "Completed", "Cancelled"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === st
                      ? "bg-royal text-white font-bold"
                      : "bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                  }`}
                >
                  {st === "all" ? "All Bookings" : st}
                </button>
              ))}
            </div>
            <span className="text-xs text-zinc-400">
              Showing {filteredBookings.length} appointments
            </span>
          </div>

          {/* Bookings Table */}
          <div className="rounded-3xl border border-dark-border bg-dark-card overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-dark-border bg-dark-bg/60 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Service Package</th>
                    <th className="p-4">Appointment Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/60">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="font-bold text-white">{b.customerName}</div>
                        <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{b.phone}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{b.vehicleModel}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{b.regNumber || "No Plate Listed"}</div>
                      </td>

                      <td className="p-4">
                        <div className="text-zinc-200 font-semibold">{b.serviceName}</div>
                        {b.notes && <div className="text-[10px] text-zinc-400 italic line-clamp-1">"{b.notes}"</div>}
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{b.date}</div>
                        <div className="text-[10px] text-tealAccent">{b.timeSlot}</div>
                      </td>

                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none ${
                            b.status === "Pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                            b.status === "Confirmed" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                            b.status === "In Progress" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
                            b.status === "Completed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                            "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          <option value="Pending" className="bg-dark-bg text-white">Pending</option>
                          <option value="Confirmed" className="bg-dark-bg text-white">Confirmed</option>
                          <option value="In Progress" className="bg-dark-bg text-white">In Progress</option>
                          <option value="Completed" className="bg-dark-bg text-white">Completed</option>
                          <option value="Cancelled" className="bg-dark-bg text-white">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <a
                          href={getWhatsAppLink(b.phone, `Hello ${b.customerName}, regarding your ${b.vehicleModel} service booking at SREVZONE on ${b.date} (${b.timeSlot}): Your status is currently: ${b.status}. Please let us know if you need assistance.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:opacity-90 shadow"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleOpenAddPkg}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 rounded-2xl bg-dark-card border border-dark-border flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-textMuted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-electric" /> {pkg.duration}
                    </span>
                    <span className="text-xl font-black text-electric">{formatCurrency(pkg.price)}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{pkg.name}</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">ID: {pkg.id}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEditPkg(pkg)}
                      className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePkg(pkg.id)}
                      className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Package Add/Edit Modal */}
      {pkgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-xl font-bold text-white">
                {editingPkg ? "Edit Service Package" : "Add Service Package"}
              </h3>
              <button onClick={() => setPkgModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPkg} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Package Name *</label>
                <input
                  type="text"
                  value={pkgFormData.name}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, name: e.target.value })}
                  required
                  placeholder="e.g. Periodic General EV Service"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Price (₹) *</label>
                  <input
                    type="number"
                    value={pkgFormData.price}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Estimated Duration</label>
                  <input
                    type="text"
                    value={pkgFormData.duration}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, duration: e.target.value })}
                    placeholder="e.g. 90 Mins"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={pkgFormData.description}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div className="pt-4 border-t border-dark-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPkgModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent shadow-md"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
