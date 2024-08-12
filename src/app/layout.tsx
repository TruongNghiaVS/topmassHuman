"use client";

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Footer } from "@/partial/footer";
import { Header } from "@/partial/header";
import { usePathname } from "next/navigation";
import { GlobalProvider } from "./global-context";

const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto", // Optional: Define a CSS variable for the font
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const pathValidated = ["/dang-ky", "/dang-nhap", "/quen-mat-khau"];
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto `}>
        <GlobalProvider>
          {!pathValidated.includes(path) && (
            <div className="relative z-[10]">
              <Header />
            </div>
          )}
          {children}
          {!pathValidated.includes(path) && <Footer />}
        </GlobalProvider>
      </body>
    </html>
  );
}
