"use client";

import { HeaderHrCenter } from "@/partial/hr-center/header";
import MenuLeft from "@/partial/hr-center/menu-left";

export default function HrCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathValidated = ["/dang-ky", "/dang-nhap", "/quen-mat-khau"];
  return (
    <main>
      <HeaderHrCenter />
      <div className="flex">
        <MenuLeft />
        <div className=" bg-[#E8EDF2] w-full min-h-screen overflow-hidden border-l">
          {children}
        </div>
      </div>
    </main>
  );
}
