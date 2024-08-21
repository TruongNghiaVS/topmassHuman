import { Chart } from "@/component/chart";
import TmSelect from "@/component/hook-form/select";
import { recruimentNews } from "@/mockup-data/data";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";

export const RecruimentNews = () => {
  const header = [
    "Vị trí tuyển",
    "Dịch vụ sử dụng",
    "Trạng thái",
    "Tổng lượt xem",
    "Tổng CV",
    "Tỷ lệ CV phù hợp ",
  ];

  const { control } = useForm({
    defaultValues: {
      search: "7",
    },
  });

  const data = {
    labels: [
      "20/08/2024",
      "21/08/2024",
      "22/08/2024",
      "23/08/2024",
      "24/08/2024",
    ],
    datasets: [
      {
        label: "Lượt xem",
        data: [120, 100, 150, 80, 120, 160],
        fill: false,
        borderColor: "#DAFFD7",
        tension: 0.1,
      },
      {
        label: "Lượt ứng tuyển",
        data: [140, 120, 100, 130, 100, 150],
        fill: false,
        borderColor: "#F37A20",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="">
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
          <tbody className="divide-y divide-gray-200 text-xs">
            {recruimentNews.map((row, idx) => (
              <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                <td className="p-4 text-left">
                  <div className="flex justify-between items-center">
                    {row.position}
                    <PencilIcon className="w-6 p-1 rounded-full bg-[#E3E3E3]" />
                  </div>
                </td>
                <td className="font-normal p-4">
                  <div className="inline-block px-2 py-1 rounded-xl bg-[#F37A20] text-white">
                    {row.service}
                  </div>
                </td>
                <td className="p-4 ">
                  <div className="mt-2">
                    <span className="px-2 py-1 rounded-xl bg-[#DAFFD7] text-[#137F04]">
                      Đang chạy
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-1 rounded-xl bg-[#FFE9E9] text-[#AF0000]">
                      Hết hạn
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-1 rounded-xl bg-[#FFF5D9] text-[#FFB600]">
                      Chờ duyệt
                    </span>
                  </div>
                </td>
                <td className={`p-4`}>{row.total_view}</td>
                <td className="p-4 ">{row.total_view}</td>
                <td className="p-4 ">{row.ratio_cv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <div className="ml-4">
          <TmSelect
            name="search"
            control={control}
            className="!w-auto"
            placeholder="Chọn"
            options={[
              { label: "7 ngày", value: "7" },
              { label: "14 ngày", value: "14" },
            ]}
          />
        </div>
      </div>
      <div className=" lg:px-20 mt-4">
        <div className="">
          <Chart data={data} />
        </div>
      </div>
    </div>
  );
};
