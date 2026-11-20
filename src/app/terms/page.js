import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-electric hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-xs text-zinc-500">SREVZONE Showroom & Digital Management Platform</p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border text-xs sm:text-sm text-zinc-300 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Platform Services</h2>
            <p>
              SREVZONE provides digital automotive inventory display, test ride reservation, service booking, and accessories ordering. Product prices, specifications, battery range estimates, and subsidies displayed on the platform are indicative of ex-showroom values and subject to applicable statutory taxes and manufacturer revisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Test Ride Eligibility</h2>
            <p>
              To participate in a test ride for two-wheelers, customers must possess a valid Indian Driving Licence (for high-speed vehicles above 25 km/h) and follow showroom safety protocols including mandatory helmet usage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Exchange Bonus & Subsidies</h2>
            <p>
              Exchange bonus calculations are finalized upon physical vehicle inspection at SREVZONE Mega Hub. State EV subsidies are subject to government guidelines and quota availability at the time of vehicle registration.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Intellectual Property</h2>
            <p>
              The official SREVZONE brand name, official tagline ("POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS"), and logo symbol are proprietary assets of SREVZONE.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
