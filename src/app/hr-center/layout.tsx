"use client";

import useAuth from "@/hook/useAuthToken";
import useAuthToken from "@/hook/useAuthToken";
import { HeaderHrCenter } from "@/partial/hr-center/header";
import MenuLeft from "@/partial/hr-center/menu-left";

export default function HrCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth();
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
