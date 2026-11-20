import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export const metadata = {
  title: "SREVZONE - Premium Electric Vehicle Showroom & Hub",
  description: "POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS. Explore top-brand electric scooters, bikes, cycles, commercial cargo and service booking at SREVZONE.",
  manifest: "/manifest.json",
  icons: {
    icon: "/brand/srevzone-logo.png",
    apple: "/brand/srevzone-logo.png"
  }
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/brand/srevzone-logo.png" />
        <link rel="apple-touch-icon" href="/brand/srevzone-logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-dark-bg text-white min-h-screen flex flex-col selection:bg-electric selection:text-dark-bg antialiased">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <BottomNav />

        {/* Register Service Worker Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('SREVZONE Service Worker registered with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('SREVZONE ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
