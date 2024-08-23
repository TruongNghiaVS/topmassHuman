"use client";

import { Menu } from "./menu";
import Link from "next/link";
import { BellIcon, UserIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

import { useEffect, useRef, useState } from "react";
import Modal from "@/component/modal";
import { FacebookBootstrapIcon } from "@/theme/icons/facebookBootstrapIcon";
import TmInput from "@/component/hook-form/input";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "@/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/app/global-context";

export const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { globalParam, setGlobalParam } = useGlobalContext();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Bắt buộc nhập email")
      .email("Sai format email "),
    password: yup.string().required("Bắt buộc nhập password"),
  });

  const { handleSubmit, control } = useForm<ILogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    setGlobalParam(true);
    setIsModalOpen(false);
    toast.success("Đăng nhập thành công");
    console.log(data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
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
          }  flex justify-between items-center bg-white left-0 top-0 right-0 pt-3 px-[22px] z-[3]`}
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
                <button onClick={openModal}>
                  Nhà tuyển dụng
                  <br />
                  <div className="text-sm leading-[14px] pt-2 inline block font-medium">
                    Đăng nhập/đăng ký
                  </div>
                </button>
              </div>
            </div>
            <div className={`items-center hidden ${globalParam && "!flex"}`}>
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
              <div className="inline-block p-0.5 rounded-full bg-[#F37A20] mr-1">
                <UserIcon className="text-white w-6" />
              </div>
              <ChevronDownIcon className="text-[#F37A20] mr-3 w-6" />
            </div>
            <div className={` hidden items-center ${globalParam && "!flex"}`}>
              <div className="grid mr-2">
                <div className="text-[8px]">Bạn đang có</div>
                <div className="w-full bg-gradient-to-r text-base from-[#F89E1B] to-[#F37A20] rounded-lg text-center text-white">
                  20
                </div>
              </div>
              <div>
                <img src="/imgs/arrow.svg" alt="" className="w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <div className="text-xl font-bold text-default">
            Đăng nhập để tiếp tục
          </div>
          <div className="sm:flex grid gap-y-2 justify-center sm:justify-start mt-5 sm:mx-10 flex-row">
            <button className="flex px-4 py-2 bg-[#F1F2F4] sm:mr-20 rounded">
              <img src="/imgs/google.png" alt="" className="w-6 mr-2" /> với tài
              khoản google
            </button>
            <button className="flex px-4 py-2 bg-[#F1F2F4] rounded">
              <FacebookBootstrapIcon className="w-6 mr-2 text-[#1094F4]" /> với
              tài khoản Facebook
            </button>
          </div>
          <div className="text-center text-base font-bold mt-4 text-default">
            Hoặc đăng nhập bằng Email
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 px-4">
              <div className="font-normal">Email</div>
              <TmInput control={control} name="email" type="email" />
            </div>
            <div className="mt-4 px-4">
              <div className="font-normal">Password</div>
              <TmInput control={control} name="password" type="password" />
            </div>
            <div className="mt-2 text-right">
              <Link href="/quen-mat-khau" className="text-[#F37A20]">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="flex border-t mt-4 pt-4 justify-between items-center">
              <div className="mr-2">
                Chưa có tài khoản{" "}
                <Link href="/dang-ky" className="text-[#F37A20]">
                  Đăng ký
                </Link>
              </div>
              <div>
                <div className="flex">
                  <button
                    className="px-4 py-2 bg-[#F1F2F4] rounded mr-2"
                    onClick={closeModal}
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FF7D55] rounded text-white"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
