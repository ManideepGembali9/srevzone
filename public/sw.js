// SREVZONE Service Worker v2.0
const CACHE_NAME = 'srevzone-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/brand/srevzone-logo.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use individual fetches so one missing asset doesn't break installation
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          fetch(url).then((res) => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {})
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Navigation fallback to network first, then cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/') || fetch(event.request))
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => null);
    })
  );
});

// Direct message listener to display notifications via Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_NOTIFICATION') {
    const { title, options } = event.data;
    const finalOptions = {
      body: options?.body || 'Powering the Future with SREVZONE',
      icon: options?.icon || '/icons/icon-192.png',
      badge: options?.badge || '/icons/icon-192.png',
      vibrate: [100, 50, 100],
      data: options?.data || { url: '/' },
      ...options
    };
    self.registration.showNotification(title, finalOptions);
  }
});

// Push Notification Listener (Web Push)
self.addEventListener('push', (event) => {
  let data = {
    title: '⚡ SREVZONE Alert',
    body: 'Powering the Future - New updates and exclusive offers at SREVZONE!',
    url: '/'
  };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      { action: 'open', title: 'View Offer' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle Notification Click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
