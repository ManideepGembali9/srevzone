"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Zap } from "lucide-react";
import { Store } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/utils";

export default function ContactPage() {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Vehicle Pricing & Availability",
    vehicleName: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSettings(Store.getSettings());
    const handleUpdate = () => setSettings(Store.getSettings());
    window.addEventListener("srevzone_storage_updated", handleUpdate);
    return () => window.removeEventListener("srevzone_storage_updated", handleUpdate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please enter your name, phone, and message.");
      return;
    }

    Store.createEnquiry(formData);
    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "Vehicle Pricing & Availability",
      vehicleName: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect with SREVZONE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Get in Touch with Our <span className="text-gradient-electric">EV Experts</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Have questions about battery life, FAME II state subsidies, exchange bonuses, or charging installations? We’re here to assist.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Showroom Details & Quick Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white">Showroom Headquarters</h3>
              
              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-electric/10 text-electric shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Address</div>
                    <div className="font-medium mt-0.5">{settings?.address || "SREVZONE EV Mega Hub, Outer Ring Road, Bangalore - 560103"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-tealAccent/10 text-tealAccent shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Opening Hours</div>
                    <div className="font-medium mt-0.5">{settings?.openingHours || "Monday - Sunday: 09:00 AM - 08:30 PM (All 7 Days)"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-royal/10 text-royal shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Phone Inquiries</div>
                    <a href={`tel:${settings?.phone || "+919876543210"}`} className="font-medium text-white hover:text-electric transition-colors mt-0.5 block">
                      {settings?.phone || "+91 98765 43210"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-electric/10 text-electric shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Email</div>
                    <a href={`mailto:${settings?.email || "contact@srevzone.com"}`} className="font-medium text-white hover:text-electric transition-colors mt-0.5 block">
                      {settings?.email || "contact@srevzone.com"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <div className="pt-4 border-t border-dark-border">
                <a
                  href={getWhatsAppLink(settings?.whatsapp || "+919876543210", "Hello SREVZONE! I have an inquiry regarding electric vehicles.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-dark-border bg-black/60 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124443.37525381983!2d77.56828555!3d12.92342545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e05b3ff75%3A0x6b7724285e6b770!2sOuter%20Ring%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen=""
                loading="lazy"
                title="SREVZONE Map"
              />
            </div>

          </div>

          {/* Interactive Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-dark-card border border-electric/30 shadow-[0_0_35px_rgba(0,168,255,0.15)]">
            
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You for Reaching Out!</h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
                  Your enquiry has been received by our senior EV specialist team. We will call you back within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-electric text-dark-bg hover:opacity-90 transition-opacity"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Send Customer Enquiry</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill in your details below and an EV specialist will respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Anish Gupta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. anish@example.com (Optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Subject / Query Type</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                    >
                      <option value="Vehicle Pricing & Availability">Vehicle Pricing & Availability</option>
                      <option value="Exchange Bonus Evaluation">Old Vehicle Exchange Bonus</option>
                      <option value="Zero Down Payment Finance">0% Down Payment Finance & EMI</option>
                      <option value="Battery Health & Warranty">Battery Health & Warranty</option>
                      <option value="Commercial Fleet Deal">Commercial Fleet Purchase</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Vehicle of Interest (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Ather 450 Apex, Ola S1 Pro, Revolt RV400..."
                    value={formData.vehicleName}
                    onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Message / Query *</label>
                  <textarea
                    rows={4}
                    placeholder="Write your questions here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,168,255,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
