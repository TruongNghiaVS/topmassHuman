import { ModalStorm } from "@/component/popup-notification-storm";
import { HeaderHrCenter } from "@/partial/hr-center/header";
import MenuLeft from "@/partial/hr-center/menu-left";

export default function HrCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <HeaderHrCenter />
      <div className="flex">
        <MenuLeft />
        <div className=" bg-[#E8EDF2] w-full min-h-screen overflow-hidden border-l">
          {children}
        </div>
      </div>
      <ModalStorm />
    </main>
  );
}
