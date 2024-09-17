import { useLoading } from "@/app/context/loading";
import { Chart } from "@/component/chart";
import TmSelect from "@/component/hook-form/select";
import {
  IChartOverview,
  IDetailCvProps,
  IOverviewJob,
} from "@/interface/interface";
import { GET_CHART_OVERVIEW, GET_OVERVIEW_JOB } from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import { PencilIcon } from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export const RecruimentNews = ({ idJob }: IDetailCvProps) => {
  const { setLoading } = useLoading();
  const [infomationJob, setInfomationJob] = useState<IOverviewJob[]>([]);
  const [dateSearch, setDateSearch] = useState<number>(7);
  const [dataChart, setDataChart] = useState<IChartOverview>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "",
        tension: 0.1,
      },
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "",
        tension: 0.1,
      },
    ],
  });

  const getData = async () => {
    setLoading(true);
    try {
      const resInfo: any = await axiosInstance.get(GET_OVERVIEW_JOB, {
        params: {
          JobId: idJob,
        },
      });
      if (resInfo) {
        setInfomationJob([resInfo]);
      }

      const dateTo = dayjs();
      const dateFrom = dayjs().subtract(dateSearch, "days");
      const resChart: any = await axiosInstance.get(GET_CHART_OVERVIEW, {
        params: {
          Jobid: idJob,
          From: dateFrom,
          To: dateTo,
        },
      });
      if (resChart) {
        const labels = resChart.dataDraw.map((item: any) => item.dayReport);
        const dataViews = resChart.dataDraw.map(
          (item: any) => item.totalViewer
        );
        const dataApplys = resChart.dataDraw.map(
          (item: any) => item.totalApply
        );

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Lượt xem",
              data: dataViews,
              fill: false,
              borderColor: "#DAFFD7",
              tension: 0.1,
            },
            {
              label: "Lượt ứng tuyển",
              data: dataApplys,
              fill: false,
              borderColor: "#F37A20",
              tension: 0.1,
            },
          ],
        };

        setDataChart(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [dateSearch]);

  const changeDateSearch = (value: number) => {
    setDateSearch(value);
  };

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
      search: 7,
    },
  });

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
            {infomationJob.map((row, idx) => (
              <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                <td className="p-4 text-left">
                  <div className="flex justify-between items-center">
                    {row.jobName}
                    {/* <PencilIcon className="w-6 p-1 rounded-full bg-[#E3E3E3]" /> */}
                  </div>
                </td>
                <td className="font-normal p-4">
                  <div className="inline-block px-2 py-1 rounded-xl bg-[#F37A20] text-white">
                    {row.serviceName}
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
                <td className={`p-4`}>{row.totalViewer}</td>
                <td className="p-4 ">{row.totalApply}</td>
                <td className="p-4 ">{row.rate}% </td>
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
            value={dateSearch}
            onChange={(e) => changeDateSearch(+e.target.value)}
            className="!w-auto"
            placeholder="Chọn"
            options={[
              { label: "7 ngày", value: 7 },
              { label: "14 ngày", value: 14 },
            ]}
          />
        </div>
      </div>
      <div className=" lg:px-20 mt-4">
        <div className="">
          <Chart data={dataChart} />
        </div>
      </div>
    </div>
  );
};
