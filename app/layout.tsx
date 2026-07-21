import type { Metadata, Viewport } from "next";
import { Nunito, Titan_One } from "next/font/google";
import "./globals.css";

const titanOne = Titan_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-titan-one",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiniGenius",
  description: "L'app éducative pour les petits génies — Maths, Français et plus encore !",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MiniGenius",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0e3a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${titanOne.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
