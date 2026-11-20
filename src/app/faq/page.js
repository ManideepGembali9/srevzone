"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, Zap, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does the SREVZONE battery warranty work?",
      a: "All electric vehicles sold at SREVZONE come with an official OEM warranty, typically ranging from 5 to 8 years (or up to 1,00,000 km) on the lithium battery pack. We also provide our exclusive SREVZONE Battery Assurance Camp, certifying health and cell balance."
    },
    {
      q: "Can I charge an electric scooter or bike at my apartment?",
      a: "Yes! Many models (like Revolt RV400 and Ather portable packs) feature removable batteries that you can carry to your home and plug into any standard 5A/15A socket. For fixed-battery models, our certified team handles wallbox charger installation at your designated parking spot."
    },
    {
      q: "Are electric vehicles eligible for state and central government subsidies?",
      a: "Absolutely. Electric two-wheelers and three-wheelers qualify for state EV subsidies, zero road tax, and zero registration fees in Karnataka and most Indian states. SREVZONE fast-tracks subsidy paperwork directly at the time of invoice."
    },
    {
      q: "Can I exchange my old petrol scooter or motorcycle?",
      a: "Yes. With our 'Mega Green Exchange Fest', we inspect and value your existing petrol vehicle within 30 minutes, offer a top valuation, and apply an extra ₹15,000 exchange bonus toward your new EV."
    },
    {
      q: "How do doorstep test rides work?",
      a: "Simply select your vehicle on our 'Book Test Ride' page, choose 'Doorstep VIP Ride', and specify your address. Our test ride representative arrives with sanitized helmets and the vehicle ready for you to test on your own daily route."
    },
    {
      q: "What is the cost of running an electric vehicle compared to petrol?",
      a: "A typical petrol scooter costs ₹2.50 to ₹3.00 per kilometer in fuel. An electric scooter like Ather or Ola consumes ~3 to 4 units of electricity for a 100 km full charge, costing only ₹0.25 to ₹0.35 per kilometer — saving you over ₹45,000 annually!"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-xs font-bold text-electric uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Frequently Asked <span className="text-gradient-electric">Questions</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Clear, honest answers about electric vehicle range, battery health, charging at home, and subsidies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-electric transition-colors"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-electric shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-dark-border/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-8 rounded-3xl bg-dark-card border border-electric/30 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Our EV engineers and finance advisors are available on WhatsApp to answer any query.
          </p>
          <a
            href={getWhatsAppLink("+919876543210", "Hello SREVZONE! I have a question about electric vehicle models and charging.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat with EV Advisor</span>
          </a>
        </div>

      </div>
    </div>
  );
}
