import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MiniGenius",
    template: "%s — MiniGenius",
  },
  description: "L'app éducative pour les petits génies — Maths, Français et plus encore !",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MiniGenius",
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="bg-bg text-ink font-body antialiased min-w-[320px]">
        <ServiceWorkerRegistration />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
