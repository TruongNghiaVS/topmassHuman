import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { MenuItem } from "./menu-items";
import { useState } from "react";
import { MenuItemSmall } from "./menu-item-small";

export default function MenuLeft() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div>
      <div
        className={`xl:block hidden relative ${
          isOpen ? "w-[320px]" : "w-[80px]"
        } transition-all duration-300  
                ease-out p-4`}
      >
        <div className="">
          {isOpen ? (
            <div>
              <div className="flex items-center">
                <div className="inline-block p-0.5 rounded-full bg-[#F37A20] mr-3 ">
                  <UserIcon className="w-10 text-white" />
                </div>
                <div>
                  <div className="font-normal">MKT Vietstar Minh</div>
                  <div className="text-xs font-normal">Employee</div>
                  <div className="text-xs font-normal">
                    Tài khoản xác thực:{" "}
                    <span className="text-default">Cấp 1/3</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 mx-4 py-1 rounded-xl flex text-[#1165AA] text-xs bg-[#C2E5F9] px-4">
                <ShieldCheckIcon className="w-4 mr-2 text-[#1165AA]" />
                Xác thực để bảo vệ tốt hơn!
              </div>
              <MenuItem />
            </div>
          ) : (
            <div className="grid justify-center">
              <div className="inline-flex  p-0.5 rounded-full bg-[#F37A20] ">
                <UserIcon className="w-8 text-white" />
              </div>
              <MenuItemSmall />
            </div>
          )}
        </div>
        <button
          className="absolute right-[-10px] top-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ArrowLeftCircleIcon className="w-6 text-default" />
          ) : (
            <ArrowRightCircleIcon className="w-6 text-default" />
          )}
        </button>
      </div>
      <div className="block xl:hidden w-[50px] mt-4">
        <div className="grid justify-center">
          <div className="inline-flex  p-0.5 rounded-full bg-[#F37A20] ">
            <UserIcon className="w-8 text-white" />
          </div>
          <MenuItemSmall />
        </div>
      </div>
    </div>
  );
}
