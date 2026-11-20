"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Layers, Plus, Edit, Trash2, X, Check, ArrowRight } from "lucide-react";
import { Store } from "@/lib/store";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    icon: "Bike",
    order: 1
  });

  useEffect(() => {
    const load = () => {
      setCategories(Store.getCategories());
      setVehicles(Store.getVehicles());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      icon: "Bike",
      order: categories.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCat(c);
    setFormData(c);
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    const attachedVehicles = vehicles.filter(v => v.categoryId === id);
    if (attachedVehicles.length > 0) {
      alert(`Cannot delete "${name}" because it currently has ${attachedVehicles.length} vehicles assigned to it. Please reassign those vehicles first.`);
      return;
    }
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      Store.deleteCategory(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      order: Number(formData.order)
    };
    if (editingCat) payload.id = editingCat.id;
    Store.saveCategory(payload);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Vehicle Categories</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Organize electric vehicles into clean market categories displayed across the customer showroom.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => {
          const vehicleCount = vehicles.filter(v => v.categoryId === c.id).length;
          return (
            <div
              key={c.id}
              className="rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                <Image src={c.image} alt={c.name} fill sizes="300px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/30 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-bold text-electric">
                  Order #{c.order}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white">
                  {vehicleCount} Vehicles
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">ID: {c.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-electric"
                      title="Edit Category"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-xl font-bold text-white">
                {editingCat ? "Edit Category" : "Add Category"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Electric Scooters"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Banner Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Display Order Priority</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
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
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
