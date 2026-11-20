"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Plus, Edit, Trash2, X, Check, Search } from "lucide-react";
import { Store } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import ImageUploadPicker from "@/components/admin/ImageUploadPicker";

export default function AdminAccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const emptyForm = {
    name: "",
    category: "Helmets",
    price: 3999,
    discountPrice: 3299,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    description: "",
    stock: 20,
    brand: "SREVZONE Gear"
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const load = () => setAccessories(Store.getAccessories());
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete "${name}"?`)) {
      Store.deleteAccessory(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
      stock: Number(formData.stock)
    };
    if (editingItem) payload.id = editingItem.id;
    Store.saveAccessory(payload);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Accessories & EV Chargers</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage smart LED helmets, fast DC wallbox chargers, modular batteries, body covers, and riding gear.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden bg-dark-card border border-dark-border flex flex-col justify-between shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
              <Image src={item.image} alt={item.name} fill sizes="300px" className="object-cover" />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-bold text-electric">
                {item.category}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-400">
                {item.stock} in stock
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-[10px] font-semibold text-zinc-500 uppercase">{item.brand}</div>
                <h3 className="text-base font-bold text-white mt-0.5">{item.name}</h3>
                <div className="text-base font-black text-white mt-1">
                  {formatCurrency(item.discountPrice || item.price)}
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono">ID: {item.id}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
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
          <div className="relative w-full max-w-lg bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? "Edit Accessory" : "Add Accessory"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. SREV Smart LED Aero Helmet"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  >
                    <option value="Helmets">Helmets</option>
                    <option value="EV Chargers">EV Chargers</option>
                    <option value="Batteries">Batteries</option>
                    <option value="Spare Parts">Spare Parts</option>
                    <option value="Vehicle Accessories">Vehicle Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Offer Price (₹)</label>
                  <input
                    type="number"
                    value={formData.discountPrice || ""}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <ImageUploadPicker
                label="Product Photograph"
                helpText="Upload accessory photo from your PC or choose from showroom gallery."
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                required
              />

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
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
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
