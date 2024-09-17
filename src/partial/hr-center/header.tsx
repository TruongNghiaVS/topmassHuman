"use client";

import Link from "next/link";
import { BellIcon, UserIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

import { useEffect, useRef, useState } from "react";
import { MenuHrCenter } from "./menu";
import { CardBootstrapIcon } from "@/theme/icons/cardBootstrapIcon";
import useSWR from "swr";
import { getToken } from "@/utils/token";
import { DropdownUser } from "../header";
import { GET_ALL_NOTIFICATION } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import { INotification } from "@/interface/interface";

export const HeaderHrCenter = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [notis, setNotis] = useState<INotification[]>([]);
  const { data: token } = useSWR("token", getToken, { refreshInterval: 500 });
  const { data: listNotis, error } = useSWR(
    `${GET_ALL_NOTIFICATION}?Status=0`,
    fetcher
  );

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > headerRef.current.clientHeight) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (listNotis) {
      setNotis(listNotis.data);
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [token, listNotis, setNotis]);

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
              <div
                className={`text-xs text-default cursor-pointer ${
                  isLogin && "hidden"
                }`}
              >
                Nhà tuyển dụng
                <br />
                <div className="text-sm leading-[14px] pt-2 inline block font-medium">
                  Đăng tin tuyển dụng
                </div>
              </div>
            </div>
            <div className={`hidden  ${isLogin && "!block"}  `}>
              <div className={`items-center flex space-x-4`}>
                <Link href="/hr-center/thong-bao">
                  <div className="relative">
                    <BellIcon className="text-[#F37A20] mr-3 w-6" />
                    {notis && notis.length > 0 && (
                      <div className="absolute content-[''] text-xs text-center w-4 h-4 top-[-4px] right-2 rounded-full bg-[#C40202] text-white">
                        {notis.length}
                      </div>
                    )}
                  </div>
                </Link>
                <img
                  src="/imgs/messenger.svg"
                  alt=""
                  className="w-6 h-auto mr-3"
                />
                {/* <Link href="/hr-center/gio-hang">
                  <div
                    className={` flex items-center px-5 py-2 rounded-2xl bg-[#595757]`}
                  >
                    <CardBootstrapIcon className="w-6 text-default mr-2 text-white" />
                    <div className=" text-white">Giỏ hàng</div>
                  </div>
                </Link> */}
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
                <div className="flex items-center relative group/title">
                  <div
                    className="inline-block p-0.5 rounded-full bg-[#F37
                  A20]"
                  >
                    <UserIcon className="text-white w-6" />
                  </div>
                  <ChevronDownIcon className="text-[#F37A20] w-6" />
                  <DropdownUser pathCheck="" setIsLogin={setIsLogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
