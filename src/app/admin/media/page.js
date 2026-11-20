"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Camera, 
  Plus, 
  Edit, 
  Trash2, 
  Pin, 
  Play, 
  X, 
  Check, 
  UploadCloud, 
  Image as ImageIcon,
  Sparkles,
  Layers
} from "lucide-react";
import { Store } from "@/lib/store";
import ImageUploadPicker from "@/components/admin/ImageUploadPicker";

export default function AdminMediaPage() {
  const [activeTab, setActiveTab] = useState("gallery"); // 'gallery' | 'updates'
  const [galleryItems, setGalleryItems] = useState([]);
  const [updates, setUpdates] = useState([]);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State for Gallery Item
  const emptyGalleryForm = {
    title: "",
    category: "Showroom",
    type: "photo", // 'photo' | 'video'
    url: "",
    videoUrl: "",
    description: ""
  };

  // Form State for Daily Update
  const emptyUpdateForm = {
    title: "",
    caption: "",
    imageUrl: "",
    videoUrl: "",
    category: "Customer Delivery",
    isPinned: false
  };

  const [galleryForm, setGalleryForm] = useState(emptyGalleryForm);
  const [updateForm, setUpdateForm] = useState(emptyUpdateForm);

  useEffect(() => {
    const load = () => {
      setGalleryItems(Store.getGalleryItems());
      setUpdates(Store.getDailyUpdates());
    };
    load();
    window.addEventListener("srevzone_storage_updated", load);
    return () => window.removeEventListener("srevzone_storage_updated", load);
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    if (activeTab === "gallery") {
      setGalleryForm(emptyGalleryForm);
    } else {
      setUpdateForm(emptyUpdateForm);
    }
    setModalOpen(true);
  };

  const handleOpenEditGallery = (item) => {
    setEditingItem(item);
    setGalleryForm(item);
    setModalOpen(true);
  };

  const handleOpenEditUpdate = (u) => {
    setEditingItem(u);
    setUpdateForm(u);
    setModalOpen(true);
  };

  const handleDeleteGallery = (id, title) => {
    if (confirm(`Delete gallery item "${title}"?`)) {
      Store.deleteGalleryItem(id);
    }
  };

  const handleDeleteUpdate = (id, title) => {
    if (confirm(`Delete update "${title}"?`)) {
      Store.deleteDailyUpdate(id);
    }
  };

  const handleTogglePin = (u) => {
    Store.saveDailyUpdate({ ...u, isPinned: !u.isPinned });
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (!galleryForm.url && galleryForm.type === "photo") {
      alert("Please upload a photo from PC or pick from gallery.");
      return;
    }
    const payload = { ...galleryForm };
    if (editingItem) payload.id = editingItem.id;
    Store.saveGalleryItem(payload);
    setModalOpen(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!updateForm.imageUrl) {
      alert("Please upload a photo from PC or pick from gallery.");
      return;
    }
    const payload = { ...updateForm };
    if (editingItem) payload.id = editingItem.id;
    Store.saveDailyUpdate(payload);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Gallery & Media Studio</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Upload high-definition photographs from your PC, manage video walk-throughs, and publish showroom delivery feeds.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 shadow-[0_0_20px_rgba(0,168,255,0.35)] transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{activeTab === "gallery" ? "Add Photo to Gallery" : "Publish Daily Update"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-border pb-3">
        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "gallery"
              ? "bg-electric/20 text-electric border border-electric/40 shadow-md"
              : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Showroom Photo Gallery ({galleryItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("updates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "updates"
              ? "bg-electric/20 text-electric border border-electric/40 shadow-md"
              : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Daily Updates & Stories ({updates.length})</span>
        </button>
      </div>

      {/* TAB 1: Gallery Items */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-zinc-300">
              Photographs here are automatically displayed on the public <strong className="text-white">/gallery</strong> page and available in the image picker across all admin forms.
            </span>
            <button
              onClick={handleOpenAdd}
              className="px-3 py-1.5 rounded-lg bg-electric/15 text-electric border border-electric/30 font-bold hover:bg-electric/25 shrink-0"
            >
              + Upload File from PC
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-electric/50 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image src={item.url || "/brand/srevzone-logo.png"} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 bg-electric/90 text-dark-bg font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                    {item.category}
                  </div>

                  {item.type === "video" && (
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-electric text-dark-bg">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">
                      {item.type === "video" ? "Video Reel" : "Photograph"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditGallery(item)}
                        className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                        title="Edit Item"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(item.id, item.title)}
                        className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Daily Updates */}
      {activeTab === "updates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((u) => (
            <div
              key={u.id}
              className="rounded-2xl overflow-hidden bg-dark-card border border-dark-border flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image src={u.imageUrl || "/brand/srevzone-logo.png"} alt={u.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/20 to-transparent" />

                {u.isPinned && (
                  <div className="absolute top-3 left-3 bg-electric text-dark-bg font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>Pinned</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-zinc-300">
                  {u.category}
                </div>

                {u.videoUrl && (
                  <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-electric text-dark-bg">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                )}

                <div className="absolute bottom-3 left-3 text-[11px] text-zinc-400">
                  {u.date || "Recently"}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{u.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-3 leading-relaxed">{u.caption}</p>
                </div>

                <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                  <button
                    onClick={() => handleTogglePin(u)}
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      u.isPinned ? "text-electric font-bold" : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    <Pin className="w-3 h-3" />
                    <span>{u.isPinned ? "Unpin" : "Pin to Top"}</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEditUpdate(u)}
                      className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUpdate(u.id, u.title)}
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
      )}

      {/* Modal for Gallery Item or Daily Update */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-electric" />
                <span>
                  {activeTab === "gallery" 
                    ? (editingItem ? "Edit Gallery Item" : "Add Photo / Video to Gallery")
                    : (editingItem ? "Edit Showroom Update" : "Publish Daily Update")
                  }
                </span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Form */}
            {activeTab === "gallery" ? (
              <form onSubmit={handleGallerySubmit} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Media Title *</label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    required
                    placeholder="e.g. Ather 450 Apex Showroom Display"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Category Tag</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    >
                      <option value="Showroom">Showroom</option>
                      <option value="Customer Delivery">Customer Delivery</option>
                      <option value="Action">Action & Test Track</option>
                      <option value="Service Lab">Service Lab</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Media Type</label>
                    <select
                      value={galleryForm.type}
                      onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    >
                      <option value="photo">Photograph (Upload from PC)</option>
                      <option value="video">Promotional Video</option>
                    </select>
                  </div>
                </div>

                {/* Upload from PC or Pick from Gallery */}
                <ImageUploadPicker
                  label="Photograph File"
                  helpText="Upload photo from your PC or choose an existing photo from the gallery."
                  value={galleryForm.url}
                  onChange={(url) => setGalleryForm({ ...galleryForm, url })}
                  required={galleryForm.type === "photo"}
                />

                {galleryForm.type === "video" && (
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">YouTube / Video Embed URL</label>
                    <input
                      type="text"
                      value={galleryForm.videoUrl || ""}
                      onChange={(e) => setGalleryForm({ ...galleryForm, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Short Description</label>
                  <textarea
                    rows={2}
                    value={galleryForm.description || ""}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    placeholder="Short description of this showroom photograph..."
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
                    Save to Gallery
                  </button>
                </div>
              </form>
            ) : (
              /* Daily Update Form */
              <form onSubmit={handleUpdateSubmit} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Post Title *</label>
                  <input
                    type="text"
                    value={updateForm.title}
                    onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                    required
                    placeholder="e.g. 5 Ola S1 Units Handed Over to Happy Owners!"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Category Tag</label>
                  <select
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  >
                    <option value="Customer Delivery">Customer Delivery</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Service Camp">Service Camp</option>
                    <option value="Commercial Handover">Commercial Handover</option>
                    <option value="Showroom Event">Showroom Event</option>
                  </select>
                </div>

                {/* Upload from PC or Gallery */}
                <ImageUploadPicker
                  label="Update Photo"
                  helpText="Upload delivery photo from your PC or pick from showroom gallery."
                  value={updateForm.imageUrl}
                  onChange={(url) => setUpdateForm({ ...updateForm, imageUrl: url })}
                  required
                />

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Promotional Video URL (Optional)</label>
                  <input
                    type="text"
                    value={updateForm.videoUrl || ""}
                    onChange={(e) => setUpdateForm({ ...updateForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Story / Description *</label>
                  <textarea
                    rows={3}
                    value={updateForm.caption}
                    onChange={(e) => setUpdateForm({ ...updateForm, caption: e.target.value })}
                    required
                    placeholder="Write the story behind this customer handover or showroom update..."
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="pinned"
                    checked={updateForm.isPinned}
                    onChange={(e) => setUpdateForm({ ...updateForm, isPinned: e.target.checked })}
                    className="accent-electric w-4 h-4"
                  />
                  <label htmlFor="pinned" className="font-semibold text-white cursor-pointer">
                    Pin to Top of Public Showroom Feed
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
                    Publish Update
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
