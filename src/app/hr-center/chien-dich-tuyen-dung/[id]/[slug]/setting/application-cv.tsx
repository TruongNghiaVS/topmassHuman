import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import { Option } from "@/component/hook-form/interface/interface";
import TmSelect from "@/component/hook-form/select";
import {
  ICvJob,
  IDetailCvProps,
  ISearchCvCandidate,
} from "@/interface/interface";
import {
  GET_ALL_CV_JOB,
  GET_STATUS_APPLY_CV,
  UPDATE_VIEW_MODE,
} from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { MouseEvent } from "react";
import { toast } from "react-toastify";
import { ModalChangeStatus } from "./modal-change-status";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const ApplicationCV = ({ idJob }: IDetailCvProps) => {
  const [cvJob, setCvJob] = useState<ICvJob[]>([]);
  const [statusApply, setStatusApply] = useState<Option[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idUpdate, setIdUpdate] = useState(-1);
  const [statusUpdate, setStatusUpdate] = useState(-1);
  const { setLoading } = useLoading();
  const { data: listCv, error, mutate } = useSWR(
    `${GET_ALL_CV_JOB}?jobId=${idJob}&TypeData=-1`,
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
    if (listCv) {
      setCvJob(listCv.data);
    }
    getStatusApply();
  }, [listCv, setCvJob]);

  const schema = yup.object().shape({
    name: yup.string(),
    viewMode: yup.number(),
    statusCode: yup.number(),
  });

  const { control, handleSubmit } = useForm<ISearchCvCandidate>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      viewMode: -1,
      statusCode: -1,
    },
  });

  const header = ["Tên ứng viên", "Số điện thoại", "Email", "Trạng thái"];

  const getCvName = (link: string) => {
    const names = link.split("/");
    return names[names.length - 1];
  };

  const handleUpdateViewMode = async (
    e: MouseEvent<HTMLAnchorElement>,
    link: string,
    id: number
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(UPDATE_VIEW_MODE, {
        identi: id,
        viewMode: 1,
      });
      toast.success("Cập nhật trạng thái thành công");
      mutate();
      window.open(link, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  const getStatutsName = (status: number) => {
    const res = statusApply.find((item) => item.value === status);
    return res ? res.label : "";
  };

  const onSubmit: SubmitHandler<ISearchCvCandidate> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_ALL_CV_JOB, {
        params: {
          jobId: idJob,
          TypeData: -1,
          ...data,
        },
      });
      setCvJob(response.data.data);
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
            name="name"
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
                name="viewMode"
                classNameCustom="flex-1"
                placeholder="Tất cả"
                options={[
                  { label: "Đã xem", value: 1 },
                  { label: "Chưa xem", value: 0 },
                ]}
              />
            </div>
            <div className="flex-1">
              <div className="text-xs">Trạng thái</div>
              <TmSelect
                control={control}
                name="statusCode"
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
              {cvJob.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4">
                    <div className="mt-1">{row.fullName}</div>
                    <div className="text-[#FFB600] mt-1 flex space-x-1 justify-center">
                      <Link href={row.linkFile} legacyBehavior>
                        <a
                          onClick={(e) =>
                            handleUpdateViewMode(e, row.linkFile, row.cvId)
                          }
                        >
                          {getCvName(row.linkFile)}
                        </a>
                      </Link>
                      <span
                        className={`ml-2 px-1 rounded-xl text-black ${
                          row.viewMode === 1 && "bg-[#DAFFD7] text-[#137F04]"
                        } `}
                      >
                        {row.viewMode === 0 ? "Chưa xem" : "Đã xem"}
                      </span>
                    </div>
                    <div className="bg-[#DAFFD7] text-[#137F04] inline-flex px-3 py-1  mt-1 rounded-xl">
                      Mức độ phù hợp: 87%
                    </div>
                  </td>
                  <td className="font-normal p-4">
                    <div className="inline-block px-3 py-1 rounded-xl bg-[#F37A20] text-white">
                      {row.phone}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="inline-block px-3 py-1 rounded-xl bg-[#E9F0FF] text-[#004ED8]">
                      {row.email}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex space-x-2">
                      <div>{row.statusText}</div>
                      <button
                        onClick={() => (
                          setIsOpenModal(true),
                          setIdUpdate(row.id),
                          setStatusUpdate(row.statusCode)
                        )}
                      >
                        <PencilSquareIcon className="w-4 hover:text-[#F37A20]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalChangeStatus
        id={idUpdate}
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        listStatus={statusApply}
        status={statusUpdate}
        mutate={mutate}
      />
    </div>
  );
};
