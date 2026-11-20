"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Bike, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  Check, 
  Upload, 
  Zap, 
  Star, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import ImageUploadPicker from "@/components/admin/ImageUploadPicker";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Form State
  const emptyForm = {
    name: "",
    brand: "",
    model: "",
    categoryId: "cat-scooters",
    price: 120000,
    discountPrice: 110000,
    description: "",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "",
    batteryCapacity: "3.5 kWh Li-ion",
    drivingRange: "140 km / charge",
    maxSpeed: "90 km/h",
    chargingTime: "4 hrs",
    motorPower: "6.0 kW PMSM",
    colors: ["Classic Black", "Electric Blue", "Pure White"],
    warranty: "5 Years / 60,000 km Battery Warranty",
    stock: 5,
    isFeatured: false,
    isNewArrival: true,
    specifications: {
      acceleration: "0-40 km/h in 3.1 sec",
      braking: "Dual Disc CBS",
      display: "7-inch Smart Touchscreen"
    },
    features: [
      "Fast DC Charging Capable",
      "Smart Bluetooth Smartphone App",
      "Regenerative Braking"
    ]
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const load = () => {
      setVehicles(Store.getVehicles());
      setCategories(Store.getCategories());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingVehicle(v);
    setFormData({
      ...v,
      colors: v.colors || ["Electric Blue"],
      specifications: v.specifications || {},
      features: v.features || []
    });
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      Store.deleteVehicle(id);
    }
  };

  const handleToggleFeatured = (v) => {
    Store.saveVehicle({ ...v, isFeatured: !v.isFeatured });
  };

  const handleToggleNew = (v) => {
    Store.saveVehicle({ ...v, isNewArrival: !v.isNewArrival });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === formData.categoryId);
    const payload = {
      ...formData,
      categoryName: cat ? cat.name : "Electric Vehicle",
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
      stock: Number(formData.stock),
      colors: Array.isArray(formData.colors) ? formData.colors : String(formData.colors).split(",").map(c => c.trim())
    };

    if (editingVehicle) {
      payload.id = editingVehicle.id;
    }

    Store.saveVehicle(payload);
    setModalOpen(false);
  };

  const filtered = vehicles.filter(v => {
    if (selectedCat !== "all" && v.categoryId !== selectedCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return v.name?.toLowerCase().includes(q) || v.brand?.toLowerCase().includes(q) || v.model?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Electric Vehicle Inventory</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage showroom EV models, pricing, technical specs, images, and stock availability.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-[0_0_20px_rgba(0,168,255,0.35)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by vehicle name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
          >
            <option value="all">All Categories ({vehicles.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="rounded-3xl border border-dark-border bg-dark-card overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-dark-border bg-dark-bg/60 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4">Vehicle</th>
                <th className="p-4">Category</th>
                <th className="p-4">Ex-Showroom Price</th>
                <th className="p-4">Battery / Range</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">New Arrival</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Vehicle Thumbnail & Title */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-black/60 shrink-0">
                      <Image src={v.image} alt={v.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-white hover:text-electric transition-colors">{v.name}</div>
                      <div className="text-[10px] text-zinc-500">{v.brand} • {v.model}</div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 text-zinc-300">
                    <span className="px-2.5 py-0.5 rounded-full bg-dark-bg border border-dark-border text-[11px]">
                      {v.categoryName}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="font-bold text-white">{formatCurrency(v.discountPrice || v.price)}</div>
                    {v.discountPrice && v.discountPrice < v.price && (
                      <div className="text-[10px] text-zinc-500 line-through">{formatCurrency(v.price)}</div>
                    )}
                  </td>

                  {/* Specs */}
                  <td className="p-4">
                    <div className="text-zinc-200 font-medium">{v.drivingRange}</div>
                    <div className="text-[10px] text-zinc-500">{v.batteryCapacity}</div>
                  </td>

                  {/* Stock */}
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      v.stock > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {v.stock > 0 ? `${v.stock} Units` : "Out of Stock"}
                    </span>
                  </td>

                  {/* Featured Toggle */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(v)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        v.isFeatured
                          ? "bg-amber-400/20 border-amber-400 text-amber-400"
                          : "border-dark-border text-zinc-600 hover:text-white"
                      }`}
                      title={v.isFeatured ? "Featured" : "Set Featured"}
                    >
                      <Star className={`w-3.5 h-3.5 ${v.isFeatured ? "fill-current" : ""}`} />
                    </button>
                  </td>

                  {/* New Arrival Toggle */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleNew(v)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        v.isNewArrival
                          ? "bg-electric/20 border-electric text-electric"
                          : "border-dark-border text-zinc-600 hover:text-white"
                      }`}
                      title={v.isNewArrival ? "New Arrival" : "Set as New Arrival"}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/vehicles/${v.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(v)}
                        className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-electric"
                        title="Edit Vehicle"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id, v.name)}
                        className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Vehicle Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-xl font-bold text-white">
                {editingVehicle ? "Edit Electric Vehicle" : "Add New Electric Vehicle"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              
              {/* Row 1: Name, Brand, Model */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Vehicle Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Ather 450 Apex"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Brand / Manufacturer *</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                    placeholder="e.g. Ather Energy"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Model Edition</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Apex 2026"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* Row 2: Category, Price, Discount Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Ex-Showroom Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Offer Discount Price (₹)</label>
                  <input
                    type="number"
                    value={formData.discountPrice || ""}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* Row 3: Image Upload from PC / Pick from Gallery & Stock */}
              <div className="space-y-3">
                <ImageUploadPicker
                  label="Vehicle Main Photograph"
                  helpText="Upload vehicle image from your PC or pick from showroom gallery."
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  required
                />

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Showroom Stock Units Available *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* Row 4: Specs (Range, Speed, Battery, Charging, Motor) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Driving Range</label>
                  <input
                    type="text"
                    value={formData.drivingRange}
                    onChange={(e) => setFormData({ ...formData, drivingRange: e.target.value })}
                    placeholder="e.g. 150 km"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Max Speed</label>
                  <input
                    type="text"
                    value={formData.maxSpeed}
                    onChange={(e) => setFormData({ ...formData, maxSpeed: e.target.value })}
                    placeholder="e.g. 90 km/h"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Battery Capacity</label>
                  <input
                    type="text"
                    value={formData.batteryCapacity}
                    onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
                    placeholder="e.g. 3.7 kWh Li-ion"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Charging Time</label>
                  <input
                    type="text"
                    value={formData.chargingTime}
                    onChange={(e) => setFormData({ ...formData, chargingTime: e.target.value })}
                    placeholder="e.g. 4 hrs"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Vehicle Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              {/* Video URL & Warranty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Promotional Video URL (YouTube embed)</label>
                  <input
                    type="text"
                    value={formData.videoUrl || ""}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Warranty Terms</label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-electric w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-white">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="accent-electric w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-white">Mark as New Arrival</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-dark-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md"
                >
                  Save Vehicle to Database
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
