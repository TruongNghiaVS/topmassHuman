"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { IPartnerProps } from "@/interface/interface";

export const Partner = ({ partners }: IPartnerProps) => {
  return (
    <>
      <div className=" mt-[60px] px-0 max-1280:px-2">
        <div className="container mx-auto">
          <div className="text-2xl font-bold text-center text-[#D14B00] py-5">
            Đối tác tiềm năng của Topmass
          </div>
          <div>
            <Swiper
              cssMode={true}
              spaceBetween={20}
              slidesPerView={6}
              autoplay={{
                delay: 5000,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              navigation={{
                prevEl: "#prev-hot-job",
                nextEl: "#next-hot-job",
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper !pt-5 !pb-16"
            >
              {partners?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="">
                      <div className="flex justify-center items-center">
                        <div className="w-[220px] h-[220px] flex justify-center items-center">
                          <img
                            src={
                              item.logoFullLink
                                ? item.logoFullLink
                                : "/imgs/logo-work.png"
                            }
                            alt=""
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className=" uppercase text-center my-5">
                        {item.fullName}
                      </div>
                      {/* <div className="flex items-center justify-center">
                        <img src="/imgs/bag.png" alt="" className="w-4 mr-2" />5
                        vị trí đang tuyển
                      </div> */}
                    </div>
                  </SwiperSlide>
                );
              })}

              <button
                id="prev-hot-job"
                className="border border-[#F37A20] rounded-full border-[2px] p-1 border-solid min-w-[auto] absolute bottom-2 lg:left-[47%] md:left-[45%] left-[40%]"
              >
                <ChevronLeftIcon className="text-[#F37A20] w-4" />
              </button>
              <button
                id="next-hot-job"
                className="border border-[#F37A20] rounded-full border-[2px] p-1 border-solid min-w-[auto] absolute bottom-2 lg:right-[47%] md:right-[45%] right-[40%]"
              >
                <ChevronRightIcon className="text-[#F37A20] w-4" />
              </button>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};
