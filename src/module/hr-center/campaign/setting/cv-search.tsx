import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import {
  ICandidateSearch,
  ISearchCvCandidate,
  ISearchCvView,
} from "@/interface/interface";
import {
  ClockIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalChangeStatus } from "./modal-change-status";
import { useEffect, useState } from "react";
import { useLoading } from "@/app/context/loading";
import {
  GET_ALL_CV_SAVE_SEARCH,
  GET_CURRENT_USER,
  OPEN_CV_NOT_FILE_UPLOAD,
  UPLOAD_IMG,
} from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg, fetcher } from "@/utils/axios";
import { toast } from "react-toastify";
import Modal from "@/component/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProfileUser } from "@/module/helper/master-data";
import { useModalStore } from "@/store-zustand/useModalStore";
import dayjs from "dayjs";

const getCvName = (link: string) => {
  const names = link.split("/");
  return names[names.length - 1];
};

export const CvSearch = ({
  candidateCv,
  mutate,
  idJob,
  statusApply,
}: ISearchCvView) => {
  const [idUpdate, setIdUpdate] = useState(-1);
  const [statusUpdate, setStatusUpdate] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCv, setIsOpenModalCv] = useState(false);
  const [candidates, setCandidates] = useState<ICandidateSearch[]>([]);
  const [infoOpenCv, setInfoOpenCv] = useState({
    searchId: -1,
    point: 2,
    id: -1,
    sourceType: -1,
  });

  const { mutateUser, currentUser } = ProfileUser();
  const { openModal } = useModalStore();
  const { setLoading } = useLoading();

  useEffect(() => {
    setCandidates(candidateCv);
  }, [candidateCv]);

  const schema = yup.object().shape({
    KeyWord: yup.string(),
    ViewMode: yup.number(),
    StatusCode: yup.number(),
  });

  const { control, handleSubmit } = useForm<ISearchCvCandidate>({
    resolver: yupResolver(schema),
    defaultValues: {
      KeyWord: "",
      ViewMode: -1,
      StatusCode: -1,
    },
  });

  const header = [
    "Tên ứng viên",
    "Thông tin liên hệ",
    "Thời gian",
    "Hiển thị",
    "Trạng thái cv",
  ];

  const readPDFBuffer = async () => {
    const response = await fetch(
      `/api/generate-pdf?searchId=${infoOpenCv.searchId}&typeOpen=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  };

  const convertToFile = async () => {
    const res = await readPDFBuffer();
    const pdfBuffer = await res.arrayBuffer();

    // Create a File object from the buffer
    const file = new File([pdfBuffer], `cv.pdf`, {
      type: "application/pdf",
    });

    // Create FormData and append the file
    return file;
  };

  const handleOpenCv = async () => {
    setLoading(true);
    try {
      if (currentUser.numberLightning <= 0) {
        openModal();
        setIsOpenModalCv(false);
        return;
      }
      let link = "";
      if (infoOpenCv.sourceType !== 2) {
        const file = await convertToFile();
        const response = await axiosInstanceImg.post(UPLOAD_IMG, {
          file: file,
        });
        link = response.data.fullLink;
      }

      const res = await axiosInstance.post(OPEN_CV_NOT_FILE_UPLOAD, {
        searchId: infoOpenCv.searchId,
        linkFile: link,
        identify: infoOpenCv.id,
      });
      setIsOpenModalCv(false);
      mutate();
      mutateUser();
      toast.success("Mở cv thành công");
    } catch (error) {
      toast.error("Mở cv thất bại");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<ISearchCvCandidate> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_ALL_CV_SAVE_SEARCH, {
        params: {
          jobId: idJob,
          ...data,
        },
      });

      setCandidates(response.data.data);
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
        <div className="mt-4 flex sm:space-x-2 space-y-2 sm:space-y-0 px-2 flex-col sm:flex-row sm:items-end">
          <TmInput
            name="KeyWord"
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
                name="ViewMode"
                classNameCustom="flex-1"
                options={[
                  { label: "Tất cả", value: -1 },
                  { label: "Chưa mở", value: 0 },
                  { label: "Đã mở", value: 1 },
                ]}
              />
            </div>
            <div className="flex-1">
              <div className="text-xs">Trạng thái</div>
              <TmSelect
                control={control}
                name="StatusCode"
                classNameCustom="flex-1"
                options={statusApply}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-2 py-2.5 text-white bg-[#FF7D55] rounded-lg font-bold"
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
              {candidates.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4 text-left">
                    <div className="mt-1">
                      <div className="">
                        <div>
                          <div>{row.fullName}</div>
                          <div className="text-default">
                            <Link href={row.linkFile} target="_blank">
                              {getCvName(row.linkFile)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-normal p-4">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-xl bg-[#F37A20] text-white">
                        {row.phone}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="inline-block px-3 py-1 rounded-xl bg-[#E9F0FF] text-[#004ED8]">
                        {row.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex mt-1 justify-center flex-col">
                      <div>{dayjs(row.createAt).format("HH:mm")}</div>
                      <div>{dayjs(row.createAt).format("DD-MM-YYYY")}</div>
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div>
                      {row.isOpenedCV ? (
                        "Đã mở"
                      ) : (
                        <div
                          className="cursor-pointer hover:text-colorBase"
                          onClick={() => {
                            setInfoOpenCv({
                              searchId: row.searchId,
                              point: row.point,
                              id: row.id,
                              sourceType: row.sourceType,
                            });
                            setIsOpenModalCv(true);
                          }}
                        >
                          Chưa mở
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex space-x-2 justify-center">
                      <div className="inline-block px-3 py-1 rounded-xl bg-[#DAFFD7] text-[#137F04]">
                        {row.statusText}
                      </div>
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

      <Modal isOpen={isOpenModalCv} onClose={() => setIsOpenModalCv(false)}>
        <div>
          <div className=" flex space-x-2 justify-center">
            Bạn có đồng ý sử dụng {infoOpenCv.point}{" "}
            <img src="/imgs/arrow.svg" alt="" className="w-2 mr-1" /> để mở CV
          </div>
          <div className="flex justify-center space-x-2 mt-4 ">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 rounded"
              onClick={() => setIsOpenModalCv(false)}
            >
              Huỷ bỏ
            </button>
            <button
              className="border border-[#F37A20] text-mainstream px-4 py-1 hover:text-white hover:bg-mainstream rounded"
              onClick={handleOpenCv}
            >
              Đồng ý
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
