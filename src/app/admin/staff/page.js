"use client";

import { useState, useEffect } from "react";
import { Users, Plus, ShieldCheck, Edit, Trash2, X, Check, Lock, Mail } from "lucide-react";

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([
    {
      id: "usr-01",
      name: "SREVZONE Master Admin",
      email: "admin@srevzone.com",
      role: "Super Admin",
      status: "Active",
      createdAt: "2026-01-15"
    },
    {
      id: "usr-02",
      name: "Rajesh Kannan",
      email: "rajesh.sales@srevzone.com",
      role: "Sales Manager",
      status: "Active",
      createdAt: "2026-03-10"
    },
    {
      id: "usr-03",
      name: "Dr. Sandeep Rao",
      email: "sandeep.service@srevzone.com",
      role: "Service & Battery Head",
      status: "Active",
      createdAt: "2026-04-20"
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Sales Specialist",
    password: ""
  });

  const handleToggleStatus = (id) => {
    setStaff(staff.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === "Active" ? "Suspended" : "Active" };
      }
      return s;
    }));
  };

  const handleDelete = (id, name) => {
    if (confirm(`Remove staff member "${name}"?`)) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setStaff([...staff, newUser]);
    setModalOpen(false);
    setFormData({ name: "", email: "", role: "Sales Specialist", password: "" });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Staff & Access Permissions</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage showroom sales staff, service technicians, and administrative roles with granular access controls.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent hover:opacity-90 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="rounded-3xl border border-dark-border bg-dark-card overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-dark-border bg-dark-bg/60 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined On</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="font-bold text-white">{s.name}</div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{s.email}</div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-dark-bg border border-dark-border font-semibold text-electric">
                      {s.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(s.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        s.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      ● {s.status}
                    </button>
                  </td>

                  <td className="p-4 text-zinc-400">
                    {s.createdAt}
                  </td>

                  <td className="p-4 text-right">
                    {s.role !== "Super Admin" && (
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-zinc-400 hover:text-red-400"
                        title="Remove User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-dark-card border border-electric/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <h3 className="text-xl font-bold text-white">Add Staff Account</h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Anand Mahindra"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Staff Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="e.g. anand@srevzone.com"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Role & Access Level</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-electric"
                >
                  <option value="Showroom Manager">Showroom Manager</option>
                  <option value="Sales Specialist">Sales Specialist</option>
                  <option value="Service & Battery Head">Service & Battery Head</option>
                  <option value="Marketing & Media Manager">Marketing & Media Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Initial Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Temporary password"
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
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-royal via-electric to-tealAccent shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
