"use client";

import TmInput from "@/component/hook-form/input";
import { Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function Messenger() {
  const { control } = useForm();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [minHeight, setMinHeight] = useState("0px"); // Default minimum height

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setMinHeight(`${textareaRef.current.scrollHeight}px`);
      if (textareaRef.current.scrollHeight > 100) {
        textareaRef.current.style.overflowY = "scroll";
        textareaRef.current.style.height = "100px";
        setMinHeight(`100px`);
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  };

  useEffect(() => {
    // Initial adjustment to fit any default text
    handleInput();
  }, []);

  return (
    <div className=" bg-white overflow-hidden border-t">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-3 px-2 py-2">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {/* <Link href="/">
                <img src="/imgs/logo-new.svg" alt="" className="w-full" />
              </Link> */}
              <div className="uppercase text-xl !font-normal">Message</div>
            </div>
            <div className="p-1 rounded-full bg-[#EAEAEA]">
              <Cog6ToothIcon className="w-6" />
            </div>
          </div>
          <div className="rounded-3xl border mt-4 p-1">
            <TmInput
              name="search"
              control={control}
              icon={<MagnifyingGlassIcon className="w-4" />}
              className="border-0"
              placeholder="Tìm tên công ty, tên nhà tuyển dụng"
            />
          </div>
          <div className="flex items-center my-2">
            <img src="/imgs/logo-work.png" alt="" className="mr-2" />
            <div>
              <div className="font-normal">
                Công ty cổ phần tập đoàn VietStar
              </div>
              <div className="text-xs">Xin chào ạ!</div>
            </div>
          </div>
          <div className="flex items-center my-2">
            <img src="/imgs/logo-work.png" alt="" className="mr-2" />
            <div>
              <div className="font-normal">
                Công ty cổ phần tập đoàn VietStar
              </div>
              <div className="text-xs font-bold">Xin chào ạ!</div>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-x py-2">
          <div className="py-2 px-4 border-b">
            <div className="flex items-center">
              <img src="/imgs/logo-work.png" alt="" className="mr-2" />
              <div>
                <div className="font-normal">
                  Công ty cổ phần tập đoàn VietStar
                </div>
                <div className="text-xs">Hoạt động 10 phút trước</div>
              </div>
            </div>
          </div>
          <div
            className=" grid items-end px-2"
            style={{ minHeight: `calc(84vh - ${minHeight})` }}
          >
            <div>
              <div className="flex justify-start">
                <span className="text-white px-4 py-2 bg-[#F37A20] rounded-2xl">
                  Xin chào
                </span>
              </div>
              <div className="flex justify-end ">
                <span className="text-white px-4 py-2 bg-[#F37A20] rounded-2xl">
                  Xin chào
                </span>
              </div>
            </div>
          </div>
          <div className="px-2 relative mt-2">
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              className="w-full p-2 border rounded-xl resize-none overflow-hidden"
              placeholder="Type something..."
              rows={1} // Start with 1 row
            />
          </div>
        </div>
        <div className="col-span-3 py-2">
          <div className="text-center uppercase font-bold mb-4 ">
            Việc làm đã ứng tuyển
          </div>
          <div className="py-2 px-4 flex justify-between space-x-2 items-center">
            <div className="flex items-center">
              <img src="/imgs/logo-work.png" alt="" className="mr-2" />
              <div>
                <div className="font-normal">Nhân viên thiết kế</div>
                <div className=" line-clamp-1">
                  Công ty cổ phần tập đoàn VietStar
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap">
              <button className="px-2 by-1 rounded-2xl text-white bg-[#F37A20]">
                Nhắn tin
              </button>
            </div>
          </div>
          <div className="py-2 px-4 flex justify-between space-x-2 items-center">
            <div className="flex items-center">
              <img src="/imgs/logo-work.png" alt="" className="mr-2" />
              <div>
                <div className="font-normal">Nhân viên thiết kế</div>
                <div className=" line-clamp-1">
                  Công ty cổ phần tập đoàn VietStar
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap">
              <button className="px-2 by-1 rounded-2xl text-white bg-[#F37A20]">
                Nhắn tin
              </button>
            </div>
          </div>
          <div className="py-2 px-4 flex justify-between space-x-2 items-center">
            <div className="flex items-center">
              <img src="/imgs/logo-work.png" alt="" className="mr-2" />
              <div>
                <div className="font-normal">Nhân viên thiết kế</div>
                <div className=" line-clamp-1">
                  Công ty cổ phần tập đoàn VietStar
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap">
              <button className="px-2 by-1 rounded-2xl text-white bg-[#F37A20]">
                Nhắn tin
              </button>
            </div>
          </div>
          <div className="py-2 px-4 flex justify-between space-x-2 items-center">
            <div className="flex items-center">
              <img src="/imgs/logo-work.png" alt="" className="mr-2" />
              <div>
                <div className="font-normal">Nhân viên thiết kế</div>
                <div className=" line-clamp-1">
                  Công ty cổ phần tập đoàn VietStar
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap">
              <button className="px-2 by-1 rounded-2xl text-white bg-[#F37A20]">
                Nhắn tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
