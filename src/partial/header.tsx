"use client";

import { Menu } from "./menu";
import Link from "next/link";
import {
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";

import { useEffect, useRef, useState } from "react";
import Modal from "@/component/modal";
import { LoginForm } from "@/component/login";
import useSWR from "swr";
import { getToken, removeToken } from "@/utils/token";
import { IDropdownMenu, INotification } from "@/interface/interface";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GET_ALL_NOTIFICATION } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import { MenuMobile } from "./menu-mobile";
import { ProfileUser } from "@/module/helper/master-data";

export const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [notis, setNotis] = useState<INotification[]>([]);
  const { data: token, mutate } = useSWR("token", getToken, {
    refreshInterval: 100,
  });
  const { data: listNotis, error } = useSWR(
    `${GET_ALL_NOTIFICATION}?status=0`,
    fetcher
  );
  const { currentUser } = ProfileUser();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    const handleScroll = () => {
      if (headerRef.current) {
        const offsetTop = headerRef.current.clientHeight;
        if (window.scrollY > offsetTop) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    if (listNotis) {
      setNotis(listNotis.data);
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [token, listNotis, setNotis]);

  return (
    <>
      <section id="header" ref={headerRef}>
        <div
          className={`${
            isFixed ? "fixed" : ""
          }  lg:flex justify-between hidden items-center bg-white left-0 top-0 right-0 pt-3 px-[22px] z-[3]`}
        >
          <div className="logo-header">
            <Link href="/">
              <img
                src="/imgs/logo-new.svg"
                alt="/"
                className="w-auto h-[50px]"
              />
            </Link>
          </div>
          <div id="menu">
            <Menu />
          </div>
          <div className="flex">
            <div className="flex items-center mr-[50px]">
              <Link
                href="https://topmass.vn/"
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
                  isLogin && "hidden"
                }`}
              >
                <div>
                  Nhà tuyển dụng
                  <br />
                  <div className="text-sm leading-[14px] pt-2 inline block font-medium">
                    <button onClick={openModal}>Đăng nhập</button>/
                    <Link href="/dang-ky">Đăng ký</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={`items-center hidden ${isLogin && "!flex"}`}>
              <Link href="/hr-center/thong-bao">
                <div className="relative">
                  <BellIcon className="text-[#F37A20] mr-3 w-6" />
                  {notis &&
                    notis.filter((item) => item.status === 0).length > 0 && (
                      <div className="absolute content-[''] text-xs text-center w-4 h-4 top-[-4px] right-2 rounded-full bg-[#C40202] text-white">
                        {notis.filter((item) => item.status === 0).length}
                      </div>
                    )}
                </div>
              </Link>
              {/* <Link href="/nhan-tin">
                <img
                  src="/imgs/messenger.svg"
                  alt=""
                  className="w-6 h-auto mr-3"
                />
              </Link> */}
              <div className="flex reflex items-center relative group/title ">
                <div className="inline-block p-0.5 rounded-full bg-[#F37A20] mr-1">
                  <UserIcon className="text-white w-6" />
                </div>
                <ChevronDownIcon className="text-[#F37A20] mr-3 w-6" />
                <DropdownUser
                  pathCheck=""
                  setIsLogin={setIsLogin}
                  mutate={mutate}
                />
              </div>
            </div>
            <div className={` hidden items-center ${isLogin && "!flex"}`}>
              <div className="grid mr-2">
                <div className="text-[8px]">Bạn đang có</div>
                <div className="w-full text-xs bg-gradient-to-r text-base from-[#F89E1B] to-[#F37A20] rounded-lg text-center text-white">
                  {currentUser?.numberLightning <= 0
                    ? 0
                    : currentUser?.numberLightning}
                </div>
              </div>
              <div>
                <img src="/imgs/arrow.svg" alt="" className="w-6" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            isFixed ? "fixed" : ""
          }  lg:hidden block bg-white left-0 top-0 right-0 z-[10]`}
        >
          <div className="relative flex justify-center items-center">
            <img
              src="/imgs/bg-logo-footer.png"
              alt=""
              className="max-h-[50px] absolute right-5 top-0 bottom-0"
            />
            <Link href="/">
              <img
                src="/imgs/logo-new.svg"
                alt="/"
                className="w-auto h-[50px] py-3 "
              />
            </Link>
            <MenuMobile />
          </div>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="md:min-w-[700px] max-h-[60vh] overflow-auto relative"
      >
        <LoginForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export const DropdownUser = ({
  subMenu,
  pathCheck,
  setIsLogin,
  mutate,
}: IDropdownMenu) => {
  const path = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    removeToken();
    setIsLogin(false);
    toast.success("Đăng xuất thành công");
    router.push("/");
    if (mutate) {
      mutate();
    }
  };

  return (
    <ul className="p-2 rounded-lg group/subMenu overflow-hidden border-[#d9dbe9] h-0 transition-all ease-in-out duration-300 text-sm leading-[19px] absolute top-[calc(100%+20px)] right-0 bg-white min-w-[250px] py-[5px] z-[-1] group-hover/title:z-[11] group-hover/title:h-auto shadow-md opacity-0 group-hover/title:opacity-100 group-hover/title:top-full">
      <li
        className={`group/item normal-case whitespace-nowrap my-2 bg-[#e4e4e4] p-0 rounded`}
        onClick={handleLogout}
      >
        <Link
          href="#"
          className={`group/submenu font-medium text-[#3B4358] no-underline group-hover/item:text-default px-[15px] py-3 flex items-center relative`}
        >
          <ArrowLeftStartOnRectangleIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
          Đăng xuất
        </Link>
      </li>
    </ul>
  );
};
