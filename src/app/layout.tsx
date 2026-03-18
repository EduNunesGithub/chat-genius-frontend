import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutClient } from "@/app/layout-client";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  description: "Plataforma de gerenciamento de scripts e chat inteligente.",
  title: "Chat Genius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistMono.variable} ${geistSans.variable} flex h-dvh w-full`}
      >
        <LayoutClient>{children}</LayoutClient>
        <Toaster />
      </body>
    </html>
  );
}
