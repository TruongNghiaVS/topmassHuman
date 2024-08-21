"use client";

import { MassHiring } from "@/component/mass-hiring";
import { massLabel } from "@/mockup-data/data";
import { TrashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import numeral from "numeral";
import { ChangeEvent, useState } from "react";

const data = [
  {
    id: 1,
    name: "Baner Top",
    description:
      "Trải nghiệm gói đăng tin tuyển dụng, hiện thị tại vị trí nổi bật trong việc làm dành cho bạn , giá dùng thử hấp dẫn..",
    price: 2000000,
    count: 1,
  },
  {
    id: 2,
    name: "Baner Top",
    description:
      "Trải nghiệm gói đăng tin tuyển dụng, hiện thị tại vị trí nổi bật trong việc làm dành cho bạn , giá dùng thử hấp dẫn..",
    price: 2000000,
    count: 1,
  },
  {
    id: 3,
    name: "Baner Top",
    description:
      "Trải nghiệm gói đăng tin tuyển dụng, hiện thị tại vị trí nổi bật trong việc làm dành cho bạn , giá dùng thử hấp dẫn..",
    price: 2000000,
    count: 1,
  },
];

const header = [
  "Tên Dịch vụ",
  "Đơn giá",
  "Số lượng",
  "Số tiền (VNĐ)",
  "Thao tác",
];

export default function Card() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
    if (selectedRows.length + 1 == data.length) setSelectAll(true);
    if (selectedRows.length - 1 == 0) setSelectAll(false);
  };

  const decrement = (id: number) => {
    const idx = data.findIndex((row) => row.id === id);
    if (data[idx]) data[idx].count = data[idx].count - 1;
    if (data[idx] && data[idx].count < 0) data[idx].count = 0;
  };

  const increment = (id: number) => {
    const idx = data.findIndex((row) => row.id === id);
    if (data[idx]) data[idx].count = data[idx].count + 1;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newValue = parseInt(e.target.value, 10);
    const idx = data.findIndex((row) => row.id === id);
    if (data[idx]) data[idx].count = newValue;
    console.log(data[idx]);
  };

  const router = useRouter();

  const handleBuy = () => {
    router.push("/hr-center/thanh-toan");
  };

  return (
    <div className="px-6 py-3">
      <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-4 gap-y-4">
        <div className="overflow-x-auto col-span-2">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
                {header.map((item) => {
                  return (
                    <th key={item} className="p-4  font-medium uppercase">
                      {item}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-100 ${
                    selectedRows.includes(row.id) ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-bold">{row.name}</div>
                    <div className="text-xs font-normal line-clamp-3">
                      {row.description}
                    </div>
                  </td>
                  <td className="p-4">{numeral(row.price).format("0,0")}</td>

                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        disabled={row.count === 0}
                        onClick={() => decrement(row.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={row.count}
                        onChange={(e) => handleChange(e, row.id)}
                        className="w-16 text-center border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => increment(row.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-default">
                    {numeral(row.price * row.count).format("0,0")}
                  </td>
                  <td className="text-center">
                    <TrashIcon className="w-6 text-default" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-1 bg-white rounded-lg overflow-hidden">
          <div className="text-default p-4 bg-[#FFF3E3] uppercase">
            Thông tin đơn hàng
          </div>
          <div className="p-4">
            <div className="flex justify-between mt-4">
              <div>Tổng giá trị đơn hàng</div>
              <div>2.000.000 VNĐ</div>
            </div>
            <div className="flex justify-between mt-4">
              <div>Tổng tiền chưa bao gồm VAT</div>
              <div>2.000.000 VNĐ</div>
            </div>
            <div className="flex justify-between mt-4">
              <div>VAT (8%)</div>
              <div>200.000 VND</div>
            </div>
            <div className="flex space-x-2 items-center mt-4">
              <div>Mã ưu đãi</div>
              <button className="text-default border border-[#F37A20] rounded-lg px-4 py-1 text-xs">
                Chọn mã ưu đãi
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <div>Tổng số tiền thanh toán</div>
                <div className="text-xs">Đã bao gồm (VAT)</div>
              </div>
              <div className="text-lg">2.200.000 VND</div>
            </div>
            <div className="flex  py-2 px-4 rounded bg-[#FFF3E3] justify-between mt-4">
              <div>Số tia sét nhận được</div>
              <div className="flex">
                <div className="mr-2">+50</div>
                <img src="/imgs/arrow.svg" alt="" className="w-3" />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <input type="checkbox" className="text-emerald-500" />
              <div>
                Tôi đồng ý với{" "}
                <Link href="#" className="text-default">
                  Điều khoản dịch vụ
                </Link>{" "}
                của Topmass
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                className="bg-[#F37A20] text-white px-3 py-1 rounded-2xl"
                onClick={handleBuy}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
        {massLabel.map((item) => {
          return <MassHiring key={item.title} item={item} />;
        })}
      </div>
    </div>
  );
}
