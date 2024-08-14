"use client";

import Link from "next/link";
import { BellIcon, UserIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/app/global-context";
import { MenuHrCenter } from "./menu";
import { CardBootstrapIcon } from "@/theme/icons/cardBootstrapIcon";

export const HeaderHrCenter = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const { globalParam, setGlobalParam } = useGlobalContext();

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const offsetTop = headerRef.current.offsetTop;
        if (window.scrollY > offsetTop + 50) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section id="header" ref={headerRef} className="sm:block hidden">
        <div
          className={`${
            isFixed ? "fixed" : ""
          }  flex justify-between items-center bg-[#383636] left-0 top-0 right-0 pt-3 px-[22px] z-[3]`}
        >
          <div className="logo-header">
            <Link href="/">
              <img
                src="/imgs/logo-new-hr-center.svg"
                alt="/"
                className="w-auto h-[50px]"
              />
            </Link>
          </div>
          <div id="menu">
            <MenuHrCenter />
          </div>
          <div className="flex">
            <div className="flex items-center mr-[50px] text-white">
              <Link
                href="http://192.168.1.2:3000"
                target="_blank"
                className="text-xs mr-[30px]"
              >
                Dành cho ứng viên <br />
                <div className="text-sm leading-[14px] pt-2 inline block font-medium">
                  Tìm việc làm
                </div>
              </Link>
              <div
                className={`text-xs text-default cursor-pointer ${
                  globalParam && "hidden"
                }`}
              >
                Nhà tuyển dụng
                <br />
                <div className="text-sm leading-[14px] pt-2 inline block font-medium">
                  Đăng tin tuyển dụng
                </div>
              </div>
            </div>
            <div className={`hidden  ${globalParam && "!block"}  `}>
              <div className={`items-center flex space-x-4`}>
                <div className="relative">
                  <BellIcon className="text-[#F37A20] mr-3 w-6" />
                  <div className="absolute content-[''] text-xs text-center w-4 h-4 top-[-4px] right-2 rounded-full bg-[#C40202] text-white">
                    1
                  </div>
                </div>
                <img
                  src="/imgs/messenger.svg"
                  alt=""
                  className="w-6 h-auto mr-3"
                />
                <div
                  className={` flex items-center px-5 py-2 rounded-2xl bg-[#595757]`}
                >
                  <CardBootstrapIcon className="w-6 text-default mr-2 text-white" />
                  <div className=" text-white">Giỏ hàng</div>
                </div>
                <div
                  className={` flex items-center px-5 py-1 rounded-2xl bg-[#595757]`}
                >
                  <div className="grid mr-2">
                    <div className="text-[8px] text-white">Bạn đang có</div>
                    <div className="w-full text-xs bg-gradient-to-r text-base from-[#F89E1B] to-[#F37A20] rounded-lg text-center text-white">
                      20
                    </div>
                  </div>
                  <div>
                    <img src="/imgs/arrow.svg" alt="" className="w-4" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="inline-block p-0.5 rounded-full bg-[#F37A20]">
                    <UserIcon className="text-white w-6" />
                  </div>
                  <ChevronDownIcon className="text-[#F37A20] w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
