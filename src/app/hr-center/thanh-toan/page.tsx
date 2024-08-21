"use client";
import { useState } from "react";
import { Bank } from "./setting/bank";
import { Momo } from "./setting/momo";
import { massLabel } from "@/mockup-data/data";
import { MassHiring } from "@/component/mass-hiring";

export default function Payment() {
  const [active, setActive] = useState<number>(1);

  return (
    <div className="px-6 py-3">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg sm:col-span-2 col-span-1">
          <div className=" text-center grid justify-center py-4">
            <img src="/imgs/payment.png" alt="" className="w-auto " />
          </div>
          <div className="mt-2 text-default font-medium text-center">
            Tạo mới đơn hàng thành công
          </div>
          <div className="mt-2 text-center">
            Cảm ơn bạn đã lựa chọn dịch vụ của Topmass. <br />
            Vui lòng thanh toán theo thông tin dưới đây để hoàn tất đơn hàng
          </div>
          <div className="mt-3 flex space-x-6 justify-center">
            <button className="text-white px-4 py-1 rounded-xl bg-[#F37A20] text-xs min-w-[150px]">
              Mã đơn hàng <br /> #102378
            </button>
            <button className="text-white px-4 py-1 rounded-xl bg-[#F37A20] text-xs min-w-[150px]">
              Giá trị đơn hàng <br />
              2.000.000 VNĐ
            </button>
          </div>
          <div className="mt-3 text-default font-medium text-center">
            Vui lòng chọn phương thức thanh toán
          </div>
          <div className="mt-4 sm:flex grid gap-4 sm:space-x-6 justify-center">
            <button
              className={`border border-[#F37A20] rounded-lg py-1 w-[200px] w-[200px]  flex items-center justify-center h-[50px] ${
                active === 1 && "border-b-[6px]"
              } `}
              onClick={() => setActive(1)}
            >
              <img src="/imgs/vietbank.png" alt="" className="w-10 " />
            </button>
            <button
              className={`border border-[#F37A20] rounded-lg py-1 w-[200px] w-[200px]  flex items-center justify-center h-[50px] ${
                active === 2 && "border-b-[6px]"
              } `}
              onClick={() => setActive(2)}
            >
              <img src="/imgs/momo.png" alt="" className="w-10" />
            </button>
          </div>
          <div className="mt-4 text-center">
            {active === 1 ? <Bank /> : <Momo />}
          </div>
        </div>
        <div className=" rounded-lg col-span-1">
          {massLabel.map((item) => {
            return (
              <div key={item.title} className="mt-2">
                <MassHiring item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
