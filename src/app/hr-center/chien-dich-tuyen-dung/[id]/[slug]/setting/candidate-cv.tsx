import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { ICandidateViewJob, ISearchManagerCv } from "@/interface/interface";
import { GET_CANDIDATE_VIEW_JOB, GET_STATUS_APPLY_CV } from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";
import { Option } from "@/component/hook-form/interface/interface";
import { toast } from "react-toastify";

export const CandidateCv = () => {
  const [candidateCv, setCandidateCv] = useState<ICandidateViewJob[]>([]);
  const [statusApply, setStatusApply] = useState<Option[]>([]);
  const { setLoading } = useLoading();
  const { data: listCandidateCv, error } = useSWR(
    GET_CANDIDATE_VIEW_JOB,
    fetcher
  );

  const getStatusApply = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_STATUS_APPLY_CV);
      const data = response.data.map((item: any) => ({
        label: item.text,
        value: item.id,
      }));
      setStatusApply(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listCandidateCv) {
      setCandidateCv(listCandidateCv.data);
    }
    getStatusApply();
  }, [listCandidateCv, setCandidateCv]);

  const schema = yup.object().shape({
    keyword: yup.string(),
    cv: yup.number(),
    status: yup.number(),
  });

  const { control, handleSubmit } = useForm<ISearchManagerCv>({
    resolver: yupResolver(schema),
    defaultValues: {
      keyword: "",
      cv: -1,
      status: -1,
    },
  });

  const header = [
    "Tên ứng viên",
    "Số điện thoại",
    "Email",
    "Thời gian xem tin",
  ];

  const onSubmit: SubmitHandler<ISearchManagerCv> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_CANDIDATE_VIEW_JOB, {
        params: data,
      });
      setCandidateCv(response.data.data);
      toast.success("Tìm kiếm thông tin thành công");
    } catch (error) {
      toast.error("Tìm kiếm thông tin thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex sm:space-x-2 space-y-2 sm:space-y-0 px-2 flex-col sm:flex-row items-end">
          <TmInput
            name="keyword"
            icon={<MagnifyingGlassIcon className="w-4" />}
            control={control}
            placeholder="Tìm kiếm ứng viên, tên, số điện thoại"
            classNameCustom="flex-1"
          />
          <div className="flex-1 flex space-x-2 ">
            <div className="flex-1">
              <div className="text-xs">Hiển thị</div>
              <TmSelect
                control={control}
                name="cv"
                classNameCustom="flex-1"
                placeholder="Tất cả"
                options={[
                  { label: "Đã xem", value: "Đã xem" },
                  { label: "Chưa xem", value: "Chưa xem" },
                ]}
              />
            </div>
            <div className="flex-1">
              <div className="text-xs">Trạng thái</div>
              <TmSelect
                control={control}
                name="status"
                classNameCustom="flex-1"
                placeholder="Tất cả"
                options={statusApply}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-2 py-1.5 text-white bg-[#FF7D55] rounded-lg font-bold"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
      <div className="mt-4">
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
              {candidateCv.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4 text-left">
                    <div className="mt-1">
                      <div className="flex lg:justify-between items-center lg:flex-row flex-col">
                        <div>
                          <div>{row.fullName}</div>
                          <div className="text-default">{row.extraText}</div>
                        </div>
                        <div className="bg-[#DAFFD7] text-[#137F04] px-3 py-1  mt-1 rounded-xl">
                          Mức độ phù hợp: 87%
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-normal p-4">
                    {row.phoneNumber && (
                      <div className="inline-block px-3 py-1 rounded-xl bg-[#F37A20] text-white">
                        {row.phoneNumber}
                      </div>
                    )}
                  </td>
                  <td className="p-4 ">
                    <div className="inline-block px-3 py-1 rounded-xl bg-[#E9F0FF] text-[#004ED8]">
                      {row.email}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div>{dayjs(row.createAt).format("HH:mm")}</div>
                    <div>{dayjs(row.createAt).format("DD-MM-YYYY")}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <img src="/imgs/img-register-cv.png" className="p-4 w-full" alt="" />
      </div>
    </div>
  );
};
