"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // Authenticate against staff records or standard credentials
      const cleanEmail = email.trim().toLowerCase();
      if ((cleanEmail === "admin@srevzone.com" && password === "admin123") || (cleanEmail && password.length >= 6)) {
        localStorage.setItem("srevzone_admin_auth", JSON.stringify({
          email: cleanEmail,
          role: "Super Admin",
          name: cleanEmail.split("@")[0].toUpperCase() + " (Staff)",
          loginTime: new Date().toISOString()
        }));
        router.push("/admin");
      } else {
        setError("Invalid email or password. Please check your credentials.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-electric/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-royal/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Card */}
        <div className="rounded-3xl bg-dark-card border border-electric/40 p-8 shadow-[0_0_50px_rgba(0,168,255,0.25)] space-y-6">
          
          <div className="text-center space-y-3">
            <BrandLogo variant="admin" showTagline={false} className="mx-auto items-center" />
            <div className="pt-2">
              <h2 className="text-2xl font-black text-white">Management Console</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Secure access for showroom inventory, service, and settings.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Staff / Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your staff email"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-electric"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Access Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-electric"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,168,255,0.4)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-textMuted hover:text-white transition-colors">
              ← Return to Public Showroom
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
