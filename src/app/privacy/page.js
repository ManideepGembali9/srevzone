import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-electric hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-zinc-500">Effective Date: November 2026 • SREVZONE Digital Platform</p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border text-xs sm:text-sm text-zinc-300 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
            <p>
              When you use SREVZONE (e.g., booking test rides, scheduling service appointments, or submitting customer enquiries), we collect relevant contact information including your full name, telephone number, email address, vehicle registration details, and preferred appointment time slots.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Use of Your Data</h2>
            <p>
              Your information is exclusively utilized to:
              <br />• Coordinate VIP showroom and doorstep test rides with certified representatives.
              <br />• Schedule vehicle maintenance and battery diagnostics at our authorized Service Centre.
              <br />• Deliver relevant push notifications regarding stock arrivals, festival exchange bonuses, or service reminders when you grant permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Push Notifications</h2>
            <p>
              We adhere strictly to opt-in standards. Browser push notifications are never sent without your explicit browser consent. You can disable notifications at any time via your device or browser site settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Data Security</h2>
            <p>
              We implement industry-standard cryptographic practices and access controls to safeguard your data against unauthorized access, loss, or alteration.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Contact Our Privacy Officer</h2>
            <p>
              For queries regarding your personal data or to request data erasure, email us at <strong className="text-electric">privacy@srevzone.com</strong> or visit our showroom at Bangalore Outer Ring Road.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
