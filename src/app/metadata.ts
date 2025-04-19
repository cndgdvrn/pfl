import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PFL - Plans For Life",
  description: "Kişisel aktivite ve alışkanlık takibi için PWA uygulaması",
  applicationName: "PFL - Kişisel Aktivite Takip Uygulaması",
  appleWebApp: {
    capable: true,
    title: "PFL",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  themeColor: "#3B82F6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "PFL - Plans For Life",
    title: "PFL - Plans For Life",
    description: "Kişisel aktivite ve alışkanlık takibi için PWA uygulaması",
    images: [{
      url: "/icons/icon-512x512.png",
    }],
  },
}; 