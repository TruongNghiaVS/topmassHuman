"use client";

import numeral from "numeral";
import { CardBootstrapIcon } from "@/theme/icons/cardBootstrapIcon";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IMassPointProps {
  item: {
    title: string;
    price: number;
    description: string;
    date: string;
  };
}

export const MassPoint = ({ item }: IMassPointProps) => {
  const router = useRouter();
  const handleAddToCard = () => {
    toast.success("Thêm vào giỏ hàng thành công");
  };

  const buyItem = () => {
    router.push("/hr-center/gio-hang");
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <div>{item.title}</div>
          <div className="text-default">
            {numeral(item.price).format("0,0")} VND
          </div>
          <div className="text-[10px] ">{item.description}</div>
        </div>
        <img src="/imgs/arrow.svg" alt="" className="w-8" />
      </div>
      <div className="mt-6 text-[10px]">
        Combo áp dụng đến hết ngày {item.date}{" "}
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <button
          className="py-2 text-[10px] flex justify-center items-center flex-1 rounded border border-[#F37A20] text-default"
          onClick={handleAddToCard}
        >
          <CardBootstrapIcon className="w-4 text-default" /> Thêm vào giỏ hàng
        </button>
        <button
          className="py-2 text-[10px] flex justify-center items-center flex-1 rounded  bg-[#F37A20] text-white"
          onClick={buyItem}
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};
