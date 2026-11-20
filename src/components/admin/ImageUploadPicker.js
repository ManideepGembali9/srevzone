"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Check, 
  Search, 
  Plus, 
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import { Store } from "@/lib/store";
import { uploadToSupabaseStorage } from "@/lib/supabase";

export default function ImageUploadPicker({
  value,
  onChange,
  label = "Photo Image",
  helpText = "Upload high-res photo from your PC or pick from showroom gallery.",
  required = false
}) {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setGalleryPhotos(Store.getAllMediaPhotos());
    const handleUpdate = () => setGalleryPhotos(Store.getAllMediaPhotos());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  // Handle file selection from PC
  const processFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    setUploading(true);

    // Read as Base64 data URL for instant 100% reliable local preview & persistence
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      
      // Update form value immediately
      onChange(dataUrl);

      // Auto-save into Gallery so it's reusable across the entire admin panel
      Store.saveGalleryItem({
        title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        category: "Showroom",
        type: "photo",
        url: dataUrl
      });

      // Also attempt background sync to Supabase storage
      try {
        const supabaseUrl = await uploadToSupabaseStorage(file);
        if (supabaseUrl && supabaseUrl.startsWith("http")) {
          // If Supabase returned a valid public cloud URL, upgrade it
          onChange(supabaseUrl);
        }
      } catch (err) {
        // Fallback to dataUrl already saved
      }

      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const filteredPhotos = galleryPhotos.filter(p => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return p.title?.toLowerCase().includes(q) || p.source?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-zinc-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Main Upload / Select Box */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 transition-all p-4 ${
          isDragging 
            ? "border-electric bg-electric/10 scale-[1.01]" 
            : value 
              ? "border-dark-border bg-dark-bg/60" 
              : "border-dashed border-dark-border hover:border-electric/50 bg-dark-bg/40"
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleFileInputChange}
          className="hidden" 
        />

        {value ? (
          /* Preview Mode with Action Buttons */
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-black/60 border border-dark-border shrink-0 shadow-md">
              <Image 
                src={value} 
                alt="Preview" 
                fill 
                sizes="150px"
                className="object-cover" 
              />
            </div>

            <div className="flex-1 w-full space-y-2 text-center sm:text-left">
              <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Photo Selected</span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate max-w-xs sm:max-w-md">
                {value.startsWith("data:") ? "Local File Uploaded from PC" : value}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-electric/20 text-electric border border-electric/40 hover:bg-electric/30 transition-all flex items-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Different Photo from PC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-card border border-dark-border text-zinc-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-tealAccent" />
                  <span>Pick from Gallery</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Mode: Dual Actions */
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-electric/15 text-electric mx-auto flex items-center justify-center shadow-lg">
              <UploadCloud className={`w-6 h-6 ${uploading ? "animate-bounce" : ""}`} />
            </div>

            <div>
              <div className="text-xs font-bold text-white">
                {uploading ? "Processing file from PC..." : "Upload photo from your PC or select from Gallery"}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {helpText}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal to-electric hover:opacity-95 shadow-md flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload from PC</span>
              </button>

              <button
                type="button"
                onClick={() => setGalleryModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-200 bg-dark-card border border-dark-border hover:border-electric/50 hover:text-white transition-all flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-tealAccent" />
                <span>Choose from Gallery ({galleryPhotos.length})</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* URL Input Fallback */}
      <div className="flex items-center gap-2 pt-1">
        <LinkIcon className="w-3 h-3 text-zinc-500 shrink-0" />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste direct image URL (https://...)"
          className="w-full px-3 py-1.5 text-[11px] bg-dark-bg/80 border border-dark-border/80 rounded-lg text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-electric"
        />
      </div>

      {/* Gallery Selector Modal */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-dark-card rounded-3xl border border-electric/40 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-dark-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-electric" />
                  <span>Showroom Photo Gallery</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Select any photo from your showroom collection, or upload a new photo directly from your PC.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-electric text-dark-bg hover:opacity-90 flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload PC Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="p-2 rounded-xl bg-dark-bg border border-dark-border text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="p-4 border-b border-dark-border bg-dark-bg/50">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search showroom photos by title or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-dark-card border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-electric"
                />
              </div>
            </div>

            {/* Photos Grid */}
            <div className="flex-1 overflow-y-auto p-5">
              {filteredPhotos.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 space-y-2">
                  <ImageIcon className="w-8 h-8 mx-auto text-zinc-600" />
                  <div className="text-xs">No photos found matching your search.</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredPhotos.map((photo, idx) => {
                    const isSelected = value === photo.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          onChange(photo.url);
                          setGalleryModalOpen(false);
                        }}
                        className={`group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-electric ring-2 ring-electric/50 scale-[1.02] shadow-lg"
                            : "border-dark-border hover:border-electric/60 hover:scale-[1.02]"
                        }`}
                      >
                        <Image
                          src={photo.url}
                          alt={photo.title || "Photo"}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80" />

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-electric text-dark-bg flex items-center justify-center shadow-md font-bold">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="text-[9px] uppercase font-bold text-electric">
                            {photo.source}
                          </span>
                          <div className="text-[10px] font-bold text-white truncate">
                            {photo.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-dark-border bg-dark-bg/60 flex items-center justify-between text-xs text-zinc-400">
              <span>Showing {filteredPhotos.length} showroom photos</span>
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-dark-card border border-dark-border text-white hover:bg-white/10"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
