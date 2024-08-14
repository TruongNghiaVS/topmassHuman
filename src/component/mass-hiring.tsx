import { CardBootstrapIcon } from "@/theme/icons/cardBootstrapIcon";
import numeral from "numeral";

export interface IMassItemProps {
  item: {
    title: string;
    price: number;
    description: string;
  };
}

export const MassHiring = ({ item }: IMassItemProps) => {
  return (
    <div className="rounded-lg bg-white p-4">
      <div>{item.title}</div>
      <div className="text-default">
        {numeral(item.price).format("0,0")} VND
      </div>
      <div className="text-[10px] mt-2">{item.description}</div>
      <div className="mt-6 flex items-center space-x-2">
        <button className="py-2 text-[10px] flex justify-center items-center flex-1 rounded border border-[#F37A20] text-default">
          <CardBootstrapIcon className="w-4 text-default" /> Thêm vào giỏ hàng
        </button>
        <button className="py-2 text-[10px] flex justify-center items-center flex-1 rounded  bg-[#F37A20] text-white">
          Mua ngay
        </button>
      </div>
    </div>
  );
};
