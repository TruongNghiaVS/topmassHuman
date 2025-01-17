"use client";

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Footer } from "@/partial/footer";
import { Header } from "@/partial/header";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "./context/loading";
import GlobalLoadingIndicator from "@/component/loading-component";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import useAuth from "@/hook/useAuthToken";

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
  let path = usePathname();
  if (path.includes("/hr-center")) {
    path = "/hr-center";
  }
  const pathValidated = [
    "/dang-ky",
    "/dang-nhap",
    "/quen-mat-khau",
    "/hr-center",
    "/khoi-tao-mat-khau",
    "/xac-thuc-tai-khoan",
    "/xac-thuc-email",
  ];
  useAuth();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/imgs/favicon.png" type="image/png" />
        <meta
          name="google-site-verification"
          content="FfUAN2J0OdNel1OUtwxakoT5ylsBMqkatd1dVc1azh8"
        />
      </head>
      <body className={`${roboto.variable} font-roboto  min-h-screen `}>
        <LoadingProvider>
          <SWRConfig
            value={{
              revalidateOnFocus: false, // Disable revalidation on focus
            }}
          >
            <GlobalLoadingIndicator />
            <Suspense>
              {!pathValidated.includes(path) && (
                <div className="relative z-[10]">
                  <Header />
                </div>
              )}
              {children}
              <ToastContainer autoClose={1000} />
              {!pathValidated.includes(path) && <Footer />}
            </Suspense>
          </SWRConfig>
        </LoadingProvider>
      </body>
    </html>
  );
}
