"use client";
import TmSelect from "@/component/hook-form/select";
import { dataBill } from "@/mockup-data/data";
import Link from "next/link";
import numeral from "numeral";
import { useForm } from "react-hook-form";

const list = [
  { value: "0", label: "Chờ duyệt" },
  { value: "1", label: "Hoàn thành thanh toán" },
  { value: "2", label: "Đã huỷ" },
];

export default function ManagerBill() {
  const { control } = useForm({
    defaultValues: {
      status: "",
    },
  });

  const header = [
    "Mã đơn",
    "Ngày tạo đơn",
    "Gía trị đơn",
    "Trạng thái đơn",
    "Hạn sử dụng đơn",
    "Thao tác",
  ];

  return (
    <div>
      <div className="p-4 bg-white">Quản lý đơn hàng</div>
      <div className="m-4 bg-white">
        <div className="px-6 py-3  ">
          <div className="sm:flex sm:justify-between grid justify-center gap-2 items-center">
            <div className="text-center">Danh sách đơn hàng</div>
            <TmSelect
              name="status"
              control={control}
              options={list}
              placeholder="Trạng thái"
            />
          </div>
        </div>
        <div className="overflow-x-auto col-span-2 mt-2">
          <table className="border-collapse	 min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                {header.map((item) => {
                  return (
                    <th
                      key={item}
                      className="p-4 text-center whitespace-nowrap font-medium uppercase sm:min-w-fit min-w-[200px]"
                    >
                      {item}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataBill.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4">{row.code}</td>
                  <td className="font-normal p-4">{row.date}</td>
                  <td className="p-4">
                    {numeral(row.price).format("0,0")} vnđ
                  </td>
                  <td className="p-4 ">
                    {row.status === 0 ? (
                      <div className="inline-block px-3 py-1 rounded-2xl text-[#FFB600] bg-[#FFF5D9]">
                        Chờ duyệt
                      </div>
                    ) : row.status === 1 ? (
                      <div className="inline-block px-3 py-1 rounded-2xl text-[#137F04] bg-[#DAFFD7]">
                        Hoàn thành thanh toán
                      </div>
                    ) : (
                      <div className="inline-block px-3 py-1 rounded-2xl text-[#AF0000] bg-[#FFE9E9]">
                        Đã huỷ
                      </div>
                    )}
                  </td>
                  <td className="p-4 ">{row.expiredDate}</td>
                  <td className="p-2 grid gap-2">
                    <Link
                      href="/hr-center/chi-tiet-don-hang/1"
                      className=" px-3 py-1 rounded-2xl text-[#004ED8] bg-[#E9F0FF]"
                    >
                      Xem chi tiết
                    </Link>
                    <button
                      disabled={[1, 2].includes(row.status) && true}
                      className={`px-3 py-1 rounded-2xl  ${
                        0 === row.status
                          ? "text-[#AF0000] bg-[#FFE9E9]"
                          : "bg-[#E2E1E0]"
                      } `}
                    >
                      Huỷ đơn hàng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
