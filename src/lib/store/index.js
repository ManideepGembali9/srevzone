import {
  initialCategories,
  initialVehicles,
  initialAccessories,
  initialPromotions,
  initialDailyUpdates,
  initialServicePackages,
  initialTestimonials,
  initialWebsiteSettings,
  initialGalleryItems
} from "../initialData";
import { supabase } from "../supabase";

async function syncToSupabase(table, data) {
  if (!supabase) return;
  try {
    const res = await supabase.from(table).upsert(data);
    if (res.error) {
      // Supabase table might not exist or need schema creation; silently fall back
    }
  } catch (err) {
    // Non-blocking fallback
  }
}

const STORAGE_KEYS = {
  VEHICLES: "srevzone_vehicles",
  CATEGORIES: "srevzone_categories",
  ACCESSORIES: "srevzone_accessories",
  PROMOTIONS: "srevzone_promotions",
  UPDATES: "srevzone_updates",
  SERVICE_PACKAGES: "srevzone_service_packages",
  SERVICE_BOOKINGS: "srevzone_service_bookings",
  TEST_RIDES: "srevzone_test_rides",
  ENQUIRIES: "srevzone_enquiries",
  SETTINGS: "srevzone_settings",
  NOTIFICATIONS: "srevzone_notifications",
  GALLERY: "srevzone_gallery",
  WISHLIST: "srevzone_wishlist",
  COMPARE: "srevzone_compare"
};

function getLocalData(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Storage error:", e);
    return fallback;
  }
}

function setLocalData(key, data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("srevzone_storage_updated"));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

export const Store = {
  // Website Settings
  getSettings() {
    const stored = getLocalData(STORAGE_KEYS.SETTINGS, {});
    return { ...initialWebsiteSettings, ...stored };
  },
  updateSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    setLocalData(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Categories
  getCategories() {
    return getLocalData(STORAGE_KEYS.CATEGORIES, initialCategories);
  },
  saveCategory(category) {
    const list = this.getCategories();
    if (category.id) {
      const idx = list.findIndex(c => c.id === category.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...category };
      } else {
        list.push(category);
      }
    } else {
      category.id = `cat-${Date.now()}`;
      list.push(category);
    }
    setLocalData(STORAGE_KEYS.CATEGORIES, list);
    return category;
  },
  deleteCategory(id) {
    const list = this.getCategories().filter(c => c.id !== id);
    setLocalData(STORAGE_KEYS.CATEGORIES, list);
  },

  // Vehicles
  getVehicles() {
    return getLocalData(STORAGE_KEYS.VEHICLES, initialVehicles);
  },
  getVehicleById(id) {
    const vehicles = this.getVehicles();
    return vehicles.find(v => v.id === id) || null;
  },
  saveVehicle(vehicle) {
    const list = this.getVehicles();
    if (vehicle.id) {
      const idx = list.findIndex(v => v.id === vehicle.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...vehicle };
      } else {
        list.push(vehicle);
      }
    } else {
      vehicle.id = `srev-v${Date.now()}`;
      list.push(vehicle);
    }
    setLocalData(STORAGE_KEYS.VEHICLES, list);
    return vehicle;
  },
  deleteVehicle(id) {
    const list = this.getVehicles().filter(v => v.id !== id);
    setLocalData(STORAGE_KEYS.VEHICLES, list);
  },

  // Accessories
  getAccessories() {
    return getLocalData(STORAGE_KEYS.ACCESSORIES, initialAccessories);
  },
  saveAccessory(accessory) {
    const list = this.getAccessories();
    if (accessory.id) {
      const idx = list.findIndex(a => a.id === accessory.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...accessory };
      } else {
        list.push(accessory);
      }
    } else {
      accessory.id = `acc-${Date.now()}`;
      list.push(accessory);
    }
    setLocalData(STORAGE_KEYS.ACCESSORIES, list);
    return accessory;
  },
  deleteAccessory(id) {
    const list = this.getAccessories().filter(a => a.id !== id);
    setLocalData(STORAGE_KEYS.ACCESSORIES, list);
  },

  // Promotions
  getPromotions() {
    return getLocalData(STORAGE_KEYS.PROMOTIONS, initialPromotions);
  },
  savePromotion(promo) {
    const list = this.getPromotions();
    if (promo.id) {
      const idx = list.findIndex(p => p.id === promo.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...promo };
      } else {
        list.push(promo);
      }
    } else {
      promo.id = `promo-${Date.now()}`;
      list.push(promo);
    }
    setLocalData(STORAGE_KEYS.PROMOTIONS, list);
    return promo;
  },
  deletePromotion(id) {
    const list = this.getPromotions().filter(p => p.id !== id);
    setLocalData(STORAGE_KEYS.PROMOTIONS, list);
  },

  // Daily Updates & Media
  getDailyUpdates() {
    return getLocalData(STORAGE_KEYS.UPDATES, initialDailyUpdates);
  },
  saveDailyUpdate(update) {
    const list = this.getDailyUpdates();
    if (update.id) {
      const idx = list.findIndex(u => u.id === update.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...update };
      } else {
        list.unshift(update);
      }
    } else {
      update.id = `upd-${Date.now()}`;
      update.date = "Just now";
      list.unshift(update);
    }
    setLocalData(STORAGE_KEYS.UPDATES, list);
    return update;
  },
  deleteDailyUpdate(id) {
    const list = this.getDailyUpdates().filter(u => u.id !== id);
    setLocalData(STORAGE_KEYS.UPDATES, list);
  },

  // Service Packages & Bookings
  getServicePackages() {
    return getLocalData(STORAGE_KEYS.SERVICE_PACKAGES, initialServicePackages);
  },
  saveServicePackage(pkg) {
    const list = this.getServicePackages();
    if (pkg.id) {
      const idx = list.findIndex(p => p.id === pkg.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...pkg };
      } else {
        list.push(pkg);
      }
    } else {
      pkg.id = `srv-${Date.now()}`;
      list.push(pkg);
    }
    setLocalData(STORAGE_KEYS.SERVICE_PACKAGES, list);
    return pkg;
  },
  deleteServicePackage(id) {
    const list = this.getServicePackages().filter(p => p.id !== id);
    setLocalData(STORAGE_KEYS.SERVICE_PACKAGES, list);
  },
  getServiceBookings() {
    return getLocalData(STORAGE_KEYS.SERVICE_BOOKINGS, [
      {
        id: "sb-101",
        customerName: "Rahul Varma",
        phone: "+91 98450 12345",
        vehicleModel: "Ather 450X Gen 3",
        regNumber: "KA 03 MZ 4128",
        serviceName: "General Periodic EV Service",
        date: "2026-11-25",
        timeSlot: "10:00 AM",
        status: "Pending",
        notes: "Front brake squeaking slightly.",
        createdAt: "2026-11-19T14:30:00.000Z"
      },
      {
        id: "sb-102",
        customerName: "Ananya Sen",
        phone: "+91 97312 99881",
        vehicleModel: "Ola S1 Pro",
        regNumber: "KA 51 EB 9090",
        serviceName: "High-Voltage Battery Diagnostic & Cell Balancing",
        date: "2026-11-22",
        timeSlot: "02:30 PM",
        status: "Confirmed",
        notes: "Annual battery health certification needed.",
        createdAt: "2026-11-18T11:00:00.000Z"
      }
    ]);
  },
  createServiceBooking(booking) {
    const list = this.getServiceBookings();
    const newBooking = {
      ...booking,
      id: `sb-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    list.unshift(newBooking);
    setLocalData(STORAGE_KEYS.SERVICE_BOOKINGS, list);
    syncToSupabase("service_bookings", newBooking);
    return newBooking;
  },
  updateServiceBookingStatus(id, newStatus) {
    const list = this.getServiceBookings();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      setLocalData(STORAGE_KEYS.SERVICE_BOOKINGS, list);
      syncToSupabase("service_bookings", list[idx]);
    }
  },

  // Test Ride Bookings
  getTestRides() {
    return getLocalData(STORAGE_KEYS.TEST_RIDES, [
      {
        id: "tr-201",
        customerName: "Karthik Subramanian",
        phone: "+91 98860 33221",
        vehicleId: "srev-v01",
        vehicleName: "Ather 450 Apex",
        date: "2026-11-21",
        timeSlot: "11:30 AM",
        location: "SREVZONE Mega Hub Showroom",
        status: "Confirmed",
        notes: "Interested in exchange bonus for Activa.",
        createdAt: "2026-11-19T09:15:00.000Z"
      },
      {
        id: "tr-202",
        customerName: "Sunita Reddy",
        phone: "+91 99001 54321",
        vehicleId: "srev-v02",
        vehicleName: "Ultraviolette F77 Mach 2",
        date: "2026-11-23",
        timeSlot: "04:00 PM",
        location: "Home Doorstep Test Ride",
        status: "Pending",
        notes: "Needs helmet provided.",
        createdAt: "2026-11-20T08:00:00.000Z"
      }
    ]);
  },
  createTestRide(ride) {
    const list = this.getTestRides();
    const newRide = {
      ...ride,
      id: `tr-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    list.unshift(newRide);
    setLocalData(STORAGE_KEYS.TEST_RIDES, list);
    syncToSupabase("test_rides", newRide);
    return newRide;
  },
  updateTestRideStatus(id, newStatus) {
    const list = this.getTestRides();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      setLocalData(STORAGE_KEYS.TEST_RIDES, list);
      syncToSupabase("test_rides", list[idx]);
    }
  },

  // Customer Inquiries
  getEnquiries() {
    return getLocalData(STORAGE_KEYS.ENQUIRIES, [
      {
        id: "enq-301",
        name: "Deepak Patel",
        phone: "+91 94480 77665",
        email: "deepak.p@gmail.com",
        subject: "EMI & Zero Down Payment Scheme",
        message: "Can I get finance for Ather 450 Apex with HDFC Bank? What is the minimum interest rate?",
        vehicleName: "Ather 450 Apex",
        status: "New",
        createdAt: "2026-11-19T16:40:00.000Z"
      },
      {
        id: "enq-302",
        name: "Meera Nair",
        phone: "+91 96112 33445",
        email: "meera.nair@outlook.com",
        subject: "Battery Warranty Details",
        message: "Does the 8-year warranty cover degradation below 70% state of health?",
        vehicleName: "Ola S1 Pro Gen 2",
        status: "Contacted",
        createdAt: "2026-11-18T10:15:00.000Z"
      }
    ]);
  },
  createEnquiry(enquiry) {
    const list = this.getEnquiries();
    const newEnq = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: "New",
      createdAt: new Date().toISOString()
    };
    list.unshift(newEnq);
    setLocalData(STORAGE_KEYS.ENQUIRIES, list);
    return newEnq;
  },
  updateEnquiryStatus(id, newStatus) {
    const list = this.getEnquiries();
    const idx = list.findIndex(e => e.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      setLocalData(STORAGE_KEYS.ENQUIRIES, list);
    }
  },

  // Wishlist
  getWishlist() {
    return getLocalData(STORAGE_KEYS.WISHLIST, []);
  },
  toggleWishlist(vehicleId) {
    const list = this.getWishlist();
    const exists = list.includes(vehicleId);
    const updated = exists ? list.filter(id => id !== vehicleId) : [...list, vehicleId];
    setLocalData(STORAGE_KEYS.WISHLIST, updated);
    return updated;
  },

  // Comparison
  getCompareList() {
    return getLocalData(STORAGE_KEYS.COMPARE, []);
  },
  toggleCompare(vehicleId) {
    const list = this.getCompareList();
    const exists = list.includes(vehicleId);
    let updated = [];
    if (exists) {
      updated = list.filter(id => id !== vehicleId);
    } else {
      if (list.length >= 4) {
        alert("You can compare up to 4 vehicles at a time.");
        return list;
      }
      updated = [...list, vehicleId];
    }
    setLocalData(STORAGE_KEYS.COMPARE, updated);
    return updated;
  },
  clearCompare() {
    setLocalData(STORAGE_KEYS.COMPARE, []);
    return [];
  },

  // Notifications
  getNotifications() {
    return getLocalData(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: "notif-01",
        title: "⚡ Festive Mega Green Exchange Fest Live!",
        message: "Get up to ₹15,000 extra exchange bonus on trading your old scooter at SREVZONE today.",
        url: "/promotions",
        sentAt: "2026-11-18 10:00 AM",
        recipientCount: 1420
      },
      {
        id: "notif-02",
        title: "🚀 Ultraviolette F77 Mach 2 Arrived!",
        message: "Experience India's fastest electric superbike with 305 km range. Book your slot now.",
        url: "/vehicles/srev-v02",
        sentAt: "2026-11-19 02:30 PM",
        recipientCount: 1455
      }
    ]);
  },
  sendNotification(notification) {
    const list = this.getNotifications();
    const newNotif = {
      ...notification,
      id: `notif-${Date.now()}`,
      sentAt: new Date().toLocaleString("en-IN"),
      recipientCount: 1512
    };
    list.unshift(newNotif);
    setLocalData(STORAGE_KEYS.NOTIFICATIONS, list);
    return newNotif;
  },

  // Testimonials
  getTestimonials() {
    return initialTestimonials;
  },

  // Gallery Management
  getGalleryItems() {
    return getLocalData(STORAGE_KEYS.GALLERY, initialGalleryItems);
  },
  saveGalleryItem(item) {
    const list = this.getGalleryItems();
    if (item.id) {
      const idx = list.findIndex(g => g.id === item.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...item };
      } else {
        list.unshift(item);
      }
    } else {
      item.id = `g-${Date.now()}`;
      list.unshift(item);
    }
    setLocalData(STORAGE_KEYS.GALLERY, list);
    syncToSupabase("gallery", item);
    return item;
  },
  deleteGalleryItem(id) {
    const list = this.getGalleryItems().filter(g => g.id !== id);
    setLocalData(STORAGE_KEYS.GALLERY, list);
  },

  // Aggregated Photo Media Library for Image Picker
  getAllMediaPhotos() {
    const photos = [];
    const seen = new Set();

    // 1. Gallery items
    this.getGalleryItems().forEach(g => {
      if (g.url && !seen.has(g.url)) {
        seen.add(g.url);
        photos.push({ url: g.url, title: g.title || "Gallery Photo", source: "Gallery" });
      }
    });

    // 2. Vehicle photos
    this.getVehicles().forEach(v => {
      if (v.image && !seen.has(v.image)) {
        seen.add(v.image);
        photos.push({ url: v.image, title: v.name || "Vehicle Photo", source: "Vehicles" });
      }
      if (v.gallery) {
        v.gallery.forEach(img => {
          if (img && !seen.has(img)) {
            seen.add(img);
            photos.push({ url: img, title: `${v.name} Gallery`, source: "Vehicles" });
          }
        });
      }
    });

    // 3. Daily Updates photos
    this.getDailyUpdates().forEach(u => {
      if (u.imageUrl && !seen.has(u.imageUrl)) {
        seen.add(u.imageUrl);
        photos.push({ url: u.imageUrl, title: u.title || "Daily Update", source: "Updates" });
      }
    });

    // 4. Accessories photos
    this.getAccessories().forEach(a => {
      if (a.image && !seen.has(a.image)) {
        seen.add(a.image);
        photos.push({ url: a.image, title: a.name || "Accessory", source: "Accessories" });
      }
    });

    return photos;
  }
};
