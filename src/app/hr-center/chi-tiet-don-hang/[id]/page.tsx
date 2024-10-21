import { dataBill, detailOder } from "@/mockup-data/data";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import numeral from "numeral";

export default function DetailOrder() {
  const header = ["STT", "Tên dịch vụ", "Số lượng", "Đơn giá", "Số tiền"];

  return (
    <div>
      <div className="p-4 bg-white flex whitespace-nowrap space-x-4 items-center">
        <Link
          href="/hr-center/quan-ly-don-hang "
          className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
        >
          <ArrowUturnLeftIcon className="w-4 mr-1" />
          Trở về
        </Link>
        <div>Chi tiết đơn hàng</div>
      </div>
      <div className="m-4 bg-white py-4">
        <div className="lg:px-20 px-4 py-4 flex md:flex-row flex-col space-y-2 md:space-y-0 justify-between">
          <div className="border border-[#F37A20] rounded-lg px-4 py-2 text-xs text-center">
            Mã đơn <br />
            {dataBill[0].code}
          </div>
          <div className="border border-[#F37A20] rounded-lg px-4 py-2 text-xs text-center">
            Ngày tạo đơn <br />
            {dataBill[0].date}
          </div>
          <div className="border border-[#F37A20] rounded-lg px-4 py-2 text-xs text-center ">
            Trạng thái
            <br />
            {dataBill[0].status === 0 ? (
              <div className="px-3 py-1 mt-0.5 rounded-2xl text-[#FFB600] bg-[#FFF5D9]">
                Chờ duyệt
              </div>
            ) : dataBill[0].status === 1 ? (
              <span className="px-3 py-1 mt-0.5 rounded-2xl text-[#137F04] bg-[#DAFFD7]">
                Hoàn thành thanh toán
              </span>
            ) : (
              <span className="px-3 py-1 mt-0.5 rounded-2xl text-[#AF0000] bg-[#FFE9E9]">
                Đã huỷ
              </span>
            )}
          </div>
          <div className="border border-[#F37A20] rounded-lg px-4 py-2 text-xs text-center">
            Hạn sử dụng <br />
            {dataBill[0].expiredDate}
          </div>
        </div>
        <div className="mt-4 px-6 py-2 bg-[#F37A20] text-white">
          Chi tiết đơn hàng
        </div>
        <div className="overflow-x-auto col-span-2 mt-2">
          <table className="border-collapse	 min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                {header.map((item) => {
                  return (
                    <th
                      key={item}
                      className="p-4 text-center whitespace-nowrap font-medium uppercase"
                    >
                      {item}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F37A20]">
              {detailOder.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4">{row.name}</td>
                  <td className="font-normal p-4">{row.quantity}</td>
                  <td className="p-4">
                    {numeral(row.price).format("0,0")} vnđ
                  </td>
                  <td className="p-4">
                    {numeral(row.total).format("0,0")} vnđ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#F37A20] pt-2 px-2">
          <div className="flex space-x-2 sm:space-x-0 sm:justify-between">
            <div>Tổng giá trị đơn hàng</div>
            <div>6.000.000 VNĐ</div>
          </div>
          <div className="flex space-x-2 sm:space-x-0 sm:justify-between">
            <div>VAT (8%)</div>
            <div>480.000 VNĐ</div>
          </div>
          <div className="flex space-x-2 sm:space-x-0 sm:justify-between">
            <div>Số tiền phải thanh toán cho đơn hàng</div>
            <div className="font-medium text-default">6.480.000 VNĐ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
