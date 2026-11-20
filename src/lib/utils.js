import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateEMI(principal, annualRate = 9.5, tenureMonths = 36) {
  if (!principal || principal <= 0) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

export function getWhatsAppLink(phone = "+919876543210", message = "") {
  const cleanedPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (e) {
    return dateString;
  }
}
