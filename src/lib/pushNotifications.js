// SREVZONE Push Notification & Alert Utilities

export const PushNotification = {
  // Check if browser supports notifications
  isSupported() {
    return typeof window !== "undefined" && ("Notification" in window || "serviceWorker" in navigator);
  },

  // Get current permission status
  getPermission() {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "unsupported";
    }
    return Notification.permission;
  },

  // Request browser permission
  async requestPermission() {
    if (!this.isSupported()) return "unsupported";
    try {
      const permission = await Notification.requestPermission();
      window.dispatchEvent(new CustomEvent("srevzone_push_permission_changed", { detail: permission }));
      return permission;
    } catch (err) {
      console.warn("Failed to request notification permission:", err);
      return "denied";
    }
  },

  // Safely trigger a notification on this device
  async show({ title, body, url = "/", icon = "/icons/icon-192.png" }) {
    if (typeof window === "undefined") return false;

    // Check permission first
    if ("Notification" in window && Notification.permission !== "granted") {
      const permission = await this.requestPermission();
      if (permission !== "granted") return false;
    }

    // Try via ServiceWorker first (required by Android Chrome)
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration && typeof registration.showNotification === "function") {
          await registration.showNotification(title, {
            body,
            icon,
            badge: icon,
            vibrate: [100, 50, 100],
            data: { url }
          });
          return true;
        }
      } catch (swErr) {
        console.warn("ServiceWorker showNotification failed, trying fallback:", swErr);
      }
    }

    // Fallback for desktop Safari/Firefox where new Notification() is allowed
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        const notif = new Notification(title, {
          body,
          icon
        });
        notif.onclick = () => {
          window.focus();
          if (url && url !== "/") window.location.href = url;
        };
        return true;
      } catch (err) {
        console.warn("Desktop notification fallback failed:", err);
      }
    }

    return false;
  }
};
