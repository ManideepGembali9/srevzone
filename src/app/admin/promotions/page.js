"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Tag, Plus, Edit, Trash2, X, Check, Clock, Eye } from "lucide-react";
import { Store } from "@/lib/store";
import ImageUploadPicker from "@/components/admin/ImageUploadPicker";

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const emptyForm = {
    title: "",
    tagline: "",
    description: "",
    discount: "Flat ₹10,000 Off",
    couponCode: "SREVGREEN",
    bannerImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "2026-12-31",
    isActive: true,
    isFeatured: true
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const load = () => setPromotions(Store.getPromotions());
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPromo(p);
    setFormData(p);
    setModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (confirm(`Delete promotion "${title}"?`)) {
      Store.deletePromotion(id);
    }
  };

  const handleToggleActive = (p) => {
    Store.savePromotion({ ...p, isActive: !p.isActive });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (editingPromo) payload.id = editingPromo.id;
    Store.savePromotion(payload);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Promotions & Advertising</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Create promotional campaigns, discount coupon codes, festive bonuses, and banner advertisements.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {promotions.map((p) => (
          <div
            key={p.id}
            className="rounded-3xl overflow-hidden bg-dark-card border border-dark-border flex flex-col justify-between shadow-xl"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
              <Image src={p.bannerImage} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                {p.discount}
              </div>

              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur px-3 py-1 rounded-xl text-zinc-300 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-electric" />
                <span>Till {p.endDate}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <button
                    onClick={() => handleToggleActive(p)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {p.isActive ? "● Active" : "Inactive"}
                  </button>
                </div>
                <div className="text-xs font-semibold text-tealAccent mt-1">{p.tagline}</div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{p.description}</p>
              </div>

              <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-zinc-500">Coupon:</span> <strong className="font-mono text-electric ml-1">{p.couponCode}</strong>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-xl font-bold text-white">
                {editingPromo ? "Edit Promotional Offer" : "Create Promotional Offer"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Campaign Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Mega Green Exchange Fest"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Catchy Subtitle / Tagline *</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  required
                  placeholder="e.g. Flat ₹15,000 Exchange Bonus + 0% Down Payment"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Discount Label *</label>
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    required
                    placeholder="e.g. Flat ₹15,000 Off"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Coupon Code *</label>
                  <input
                    type="text"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                    required
                    placeholder="e.g. GREEN2026"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric uppercase font-mono"
                  />
                </div>
              </div>

              <ImageUploadPicker
                label="Promotional Banner Image"
                helpText="Upload campaign banner from your PC or choose from showroom gallery."
                value={formData.bannerImage}
                onChange={(url) => setFormData({ ...formData, bannerImage: url })}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Detailed Terms & Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-electric w-4 h-4"
                  />
                  <span className="font-semibold text-white">Active (Visible on public site)</span>
                </label>
              </div>

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
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent shadow-md"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
