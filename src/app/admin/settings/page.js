"use client";

import { useState, useEffect } from "react";
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Globe, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Sparkles,
  Layout,
  FileText,
  Share2,
  Palette,
  Eye,
  Zap,
  Info,
  ShieldCheck,
  Wrench,
  Award,
  Plus,
  Trash2
} from "lucide-react";
import { Store } from "@/lib/store";
import ImageUploadPicker from "@/components/admin/ImageUploadPicker";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState("brand");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(Store.getSettings());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Store.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  if (!settings) return null;

  const tabs = [
    { id: "brand", label: "Brand & Logo", icon: Globe },
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "showcase", label: "Cinematic Showcase", icon: Sparkles },
    { id: "advantages", label: "Why Choose Us / Advantages", icon: Award },
    { id: "services", label: "Service Centre", icon: Wrench },
    { id: "about", label: "About Us Content", icon: FileText },
    { id: "contact", label: "Contact & Location", icon: MapPin },
    { id: "social", label: "Social & Links", icon: Share2 },
    { id: "theme", label: "Theme & Palette", icon: Palette }
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Website Content & Settings Studio</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Complete editorial control over your showroom website. Edit every section from hero visuals and cinematic engineering to service guarantees and contact info.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 shadow-[0_0_20px_rgba(0,168,255,0.4)] transition-all shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="font-semibold">All changes saved successfully! The live public website has been updated immediately.</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-dark-border pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? "bg-electric/20 text-electric border border-electric/40 shadow-[0_0_15px_rgba(0,168,255,0.2)]"
                  : "bg-dark-card border border-dark-border text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TAB 1: Brand & Logo */}
        {activeTab === "brand" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-electric" />
                <span>Brand Identity & Official Assets</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Controls the primary logo text, brand identity, and legal dealership tagline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Brand Name</label>
                <input
                  type="text"
                  value={settings.brandName || "SREVZONE"}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Official Tagline</label>
                <input
                  type="text"
                  value={settings.officialTagline || "POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS"}
                  onChange={(e) => setSettings({ ...settings, officialTagline: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric uppercase font-bold text-electric"
                />
              </div>
            </div>

            <div className="pt-2">
              <ImageUploadPicker
                label="Official Showroom Brand Logo"
                helpText="Default: /brand/srevzone-logo.png. Upload high-res logo from your PC or pick from showroom gallery."
                value={settings.logoUrl || "/brand/srevzone-logo.png"}
                onChange={(url) => setSettings({ ...settings, logoUrl: url })}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Hero Section */}
        {activeTab === "hero" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layout className="w-4 h-4 text-electric" />
                <span>Homepage Hero Editorial & Stage Showcase</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Directly customize the main headline, description, action buttons, metrics, and featured stage vehicle.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">
                  Hero Main Headline (Use period for newline break)
                </label>
                <input
                  type="text"
                  value={settings.heroHeadline || "POWER YOUR RIDE. EXPERIENCE THE FUTURE."}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Hero Supporting Subtitle</label>
                <textarea
                  rows={2}
                  value={settings.heroSupportingText || "Discover the new SREV Stealth Pro Classic — handcrafted monocoque steel, satin graphite finish, and exhilarating 160 km range."}
                  onChange={(e) => setSettings({ ...settings, heroSupportingText: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Primary Button Text</label>
                  <input
                    type="text"
                    value={settings.heroPrimaryBtnText || "EXPLORE VEHICLES"}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryBtnText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Secondary Button Text</label>
                  <input
                    type="text"
                    value={settings.heroSecondaryBtnText || "CONTACT US"}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryBtnText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* Hero Vehicle Display Card Controls */}
              <div className="p-5 rounded-2xl bg-dark-bg/60 border border-electric/30 space-y-4">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-electric" />
                  <span>Featured Stage Vehicle Details (Shown on Right)</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Model Name</label>
                    <input
                      type="text"
                      value={settings.heroVehicleName || "SREV Stealth Pro Classic"}
                      onChange={(e) => setSettings({ ...settings, heroVehicleName: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Subtitle / Edition</label>
                    <input
                      type="text"
                      value={settings.heroVehicleSubtitle || "Satin Matte Graphite • Retro Futurism Edition"}
                      onChange={(e) => setSettings({ ...settings, heroVehicleSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Ex-Showroom Price</label>
                    <input
                      type="text"
                      value={settings.heroVehiclePrice || "₹1,49,999"}
                      onChange={(e) => setSettings({ ...settings, heroVehiclePrice: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold text-electric"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <ImageUploadPicker
                    label="Hero Stage Vehicle Photograph"
                    helpText="Featured photograph displayed on the illuminated showroom stage in the hero section."
                    value={settings.heroImageUrl || "/vehicles/srev-stealth-scooter.jpg"}
                    onChange={(url) => setSettings({ ...settings, heroImageUrl: url })}
                  />
                </div>
              </div>

              {/* Trust Metric Counters */}
              <div className="pt-4 border-t border-dark-border">
                <label className="block text-zinc-300 mb-3 font-bold">Showroom Trust Metric Counters</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Happy Riders</span>
                    <input
                      type="text"
                      value={settings.stats?.happyRiders || "12,500+"}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, happyRiders: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">EV Models</span>
                    <input
                      type="text"
                      value={settings.stats?.modelsAvailable || "45+"}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, modelsAvailable: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Green Kms</span>
                    <input
                      type="text"
                      value={settings.stats?.zeroCarbonKm || "18M+ km"}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, zeroCarbonKm: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Warranty</span>
                    <input
                      type="text"
                      value={settings.stats?.warrantyYears || "Up to 8 Yrs"}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, warrantyYears: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white font-bold"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: Cinematic Showcase */}
        {activeTab === "showcase" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-electric" />
                <span>Cinematic Engineering Showcase Section</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Customize the flagship 2-wheeler spotlight, technical performance HUD specs, and interactive components.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Showcase Model Name</label>
                  <input
                    type="text"
                    value={settings.showcaseModel || "SREV Stealth Pro Classic"}
                    onChange={(e) => setSettings({ ...settings, showcaseModel: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Badge / Tagline Pill</label>
                  <input
                    type="text"
                    value={settings.showcaseTag || "Flagship Engineering Showcase"}
                    onChange={(e) => setSettings({ ...settings, showcaseTag: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Headline</label>
                <input
                  type="text"
                  value={settings.showcaseHeadline || "Aerospace Monocoque Steel. Electric Prowess."}
                  onChange={(e) => setSettings({ ...settings, showcaseHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Description Text</label>
                <textarea
                  rows={2}
                  value={settings.showcaseSub || "Forged in automotive-grade curved steel with satin matte graphite finish, ultra-dense 4.0 kWh battery, and whisper-quiet high-torque electric mid-drive."}
                  onChange={(e) => setSettings({ ...settings, showcaseSub: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              {/* Performance HUD Inputs */}
              <div className="p-4 rounded-2xl bg-dark-bg/60 border border-dark-border space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Performance HUD Specs</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">0 - 40 km/h</label>
                    <input
                      type="text"
                      value={settings.showcaseSpeed || "3.2 Sec"}
                      onChange={(e) => setSettings({ ...settings, showcaseSpeed: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white font-bold text-electric"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Top Speed</label>
                    <input
                      type="text"
                      value={settings.showcaseTopSpeed || "95 km/h"}
                      onChange={(e) => setSettings({ ...settings, showcaseTopSpeed: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">True Range</label>
                    <input
                      type="text"
                      value={settings.showcaseRange || "160 km"}
                      onChange={(e) => setSettings({ ...settings, showcaseRange: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white font-bold text-tealAccent"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Battery</label>
                    <input
                      type="text"
                      value={settings.showcaseBattery || "4.0 kWh IP67"}
                      onChange={(e) => setSettings({ ...settings, showcaseBattery: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-white font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <ImageUploadPicker
                  label="Showcase Vehicle Photograph"
                  helpText="Main high-definition photo featured in the Cinematic Showcase."
                  value={settings.showcaseImage || "/vehicles/srev-stealth-scooter.jpg"}
                  onChange={(url) => setSettings({ ...settings, showcaseImage: url })}
                />
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: Why Choose Us / Advantages */}
        {activeTab === "advantages" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-electric" />
                <span>Why Discerning EV Riders Choose SREVZONE (Advantages)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Customize the headline and all 6 core showroom advantages shown on the homepage.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Section Headline</label>
                <input
                  type="text"
                  value={settings.advantagesHeadline || "Why Discerning EV Riders Choose SREVZONE"}
                  onChange={(e) => setSettings({ ...settings, advantagesHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Section Subtitle</label>
                <textarea
                  rows={2}
                  value={settings.advantagesSub || "We don’t just sell electric vehicles. We engineer your entire transition to electric mobility with unmatched trust, warranty, and long-term service."}
                  onChange={(e) => setSettings({ ...settings, advantagesSub: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              {/* Advantage Cards */}
              <div className="space-y-4 pt-3">
                <label className="block text-zinc-300 font-bold">Advantage Cards (6 Items)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(settings.advantagesList || []).map((adv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-electric uppercase">Advantage #{idx + 1}</span>
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-[10px] mb-1 font-semibold">Title</label>
                        <input
                          type="text"
                          value={adv.title}
                          onChange={(e) => {
                            const updated = [...(settings.advantagesList || [])];
                            updated[idx].title = e.target.value;
                            setSettings({ ...settings, advantagesList: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-dark-card border border-dark-border rounded-lg text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-[10px] mb-1 font-semibold">Stat Badge</label>
                        <input
                          type="text"
                          value={adv.stat || ""}
                          onChange={(e) => {
                            const updated = [...(settings.advantagesList || [])];
                            updated[idx].stat = e.target.value;
                            setSettings({ ...settings, advantagesList: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-dark-card border border-dark-border rounded-lg text-tealAccent font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-[10px] mb-1 font-semibold">Description</label>
                        <textarea
                          rows={2}
                          value={adv.desc}
                          onChange={(e) => {
                            const updated = [...(settings.advantagesList || [])];
                            updated[idx].desc = e.target.value;
                            setSettings({ ...settings, advantagesList: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-dark-card border border-dark-border rounded-lg text-zinc-300 text-[11px] resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: Service Centre Section */}
        {activeTab === "services" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-electric" />
                <span>Service Centre & Workshop Section</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Customize the service centre teaser headline, subtitle, and breakdown emergency hotline.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Service Headline</label>
                <input
                  type="text"
                  value={settings.serviceTeaserHeadline || "Precision Care for Your Electric Vehicle"}
                  onChange={(e) => setSettings({ ...settings, serviceTeaserHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Service Description Subtitle</label>
                <textarea
                  rows={2}
                  value={settings.serviceTeaserSub || "Equipped with computerized diagnostic tools, battery state-of-health analyzers, and certified EV mechanics. Genuine parts and 100% transparent pricing."}
                  onChange={(e) => setSettings({ ...settings, serviceTeaserSub: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Emergency Breakdown Hotline</label>
                <input
                  type="text"
                  value={settings.serviceHotline || "+91 98765 43210"}
                  onChange={(e) => setSettings({ ...settings, serviceHotline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold text-tealAccent"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: About Us Content */}
        {activeTab === "about" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-electric" />
                <span>About Us Editorial Story</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Customize your showroom origin story, mission statement, green pledge, and Mega Hub facility description.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">About Main Headline</label>
                <input
                  type="text"
                  value={settings.aboutHeadline || "Powering the Future of Mobility"}
                  onChange={(e) => setSettings({ ...settings, aboutHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Founding Story & Heritage</label>
                <textarea
                  rows={3}
                  value={settings.aboutIntro || ""}
                  onChange={(e) => setSettings({ ...settings, aboutIntro: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Vision & Ecosystem Goal</label>
                <textarea
                  rows={3}
                  value={settings.aboutVision || ""}
                  onChange={(e) => setSettings({ ...settings, aboutVision: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Green Dealership Pledge</label>
                <textarea
                  rows={3}
                  value={settings.aboutPledge || ""}
                  onChange={(e) => setSettings({ ...settings, aboutPledge: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Mega Hub Facility Title</label>
                  <input
                    type="text"
                    value={settings.megaHubTitle || "The SREVZONE Mega Hub"}
                    onChange={(e) => setSettings({ ...settings, megaHubTitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Facility Area & Highlights</label>
                  <input
                    type="text"
                    value={settings.megaHubDesc || ""}
                    onChange={(e) => setSettings({ ...settings, megaHubDesc: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Contact & Location */}
        {activeTab === "contact" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-electric" />
                <span>Showroom Location & Direct Touchpoints</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Keep customer contact numbers, WhatsApp, opening hours, and location links up to date.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Showroom Name</label>
                <input
                  type="text"
                  value={settings.showroomName || "SREVZONE EV Mega Hub"}
                  onChange={(e) => setSettings({ ...settings, showroomName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Physical Showroom Address</label>
                <textarea
                  rows={2}
                  value={settings.address || ""}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Calling Phone</label>
                  <input
                    type="text"
                    value={settings.phone || "+91 98765 43210"}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">WhatsApp Hotline</label>
                  <input
                    type="text"
                    value={settings.whatsapp || "+91 98765 43210"}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Support Email</label>
                  <input
                    type="email"
                    value={settings.email || "contact@srevzone.com"}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Showroom Operating Hours</label>
                  <input
                    type="text"
                    value={settings.openingHours || "Monday - Sunday: 09:00 AM - 08:30 PM"}
                    onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 font-bold">Google Maps Navigation URL</label>
                  <input
                    type="text"
                    value={settings.googleMapsUrl || ""}
                    onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: Social Links */}
        {activeTab === "social" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-electric" />
                <span>Social Media Channels & Communities</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Link your official Instagram reels, YouTube showroom walkthroughs, and community channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Instagram URL</label>
                <input
                  type="text"
                  value={settings.socials?.instagram || ""}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">YouTube URL</label>
                <input
                  type="text"
                  value={settings.socials?.youtube || ""}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, youtube: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Facebook URL</label>
                <input
                  type="text"
                  value={settings.socials?.facebook || ""}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, facebook: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 font-bold">Twitter / X URL</label>
                <input
                  type="text"
                  value={settings.socials?.twitter || ""}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: Theme & Accents */}
        {activeTab === "theme" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="border-b border-dark-border pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-electric" />
                <span>Design System & Futuristic Lighting Palettes</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Verified high-contrast automotive color tokens.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-2">
                <div className="w-full h-10 rounded-xl bg-[#050505] border border-dark-border" />
                <div className="font-bold text-white">Deep Black</div>
                <div className="text-[10px] text-zinc-500 font-mono">#050505 (Primary Bg)</div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-2">
                <div className="w-full h-10 rounded-xl bg-[#101318] border border-dark-border" />
                <div className="font-bold text-white">Dark Charcoal</div>
                <div className="text-[10px] text-zinc-500 font-mono">#101318 (Cards & Modals)</div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-2">
                <div className="w-full h-10 rounded-xl bg-[#00A8FF] shadow-[0_0_15px_#00A8FF]" />
                <div className="font-bold text-white">Electric Blue</div>
                <div className="text-[10px] text-zinc-500 font-mono">#00A8FF (Neon Glow)</div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-2">
                <div className="w-full h-10 rounded-xl bg-[#20C5B5] shadow-[0_0_15px_#20C5B5]" />
                <div className="font-bold text-white">Teal Accent</div>
                <div className="text-[10px] text-zinc-500 font-mono">#20C5B5 (Green EV Energy)</div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at Bottom */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-border">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-95 shadow-[0_0_25px_rgba(0,168,255,0.4)] transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Website Content</span>
          </button>
        </div>

      </form>
    </div>
  );
}
