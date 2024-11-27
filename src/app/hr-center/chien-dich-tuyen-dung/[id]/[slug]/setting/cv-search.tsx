import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { ISearchCvView } from "@/interface/interface";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ModalChangeStatus } from "./modal-change-status";
import { useEffect, useState } from "react";
import { Option } from "@/component/hook-form/interface/interface";
import { useLoading } from "@/app/context/loading";
import {
  GET_STATUS_APPLY_CV,
  OPEN_CV_NOT_FILE_UPLOAD,
  UPLOAD_IMG,
} from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg } from "@/utils/axios";
import { toast } from "react-toastify";
import Modal from "@/component/modal";

const getCvName = (link: string) => {
  const names = link.split("/");
  return names[names.length - 1];
};

export const CvSearch = ({ candidateCv, mutate }: ISearchCvView) => {
  const [idUpdate, setIdUpdate] = useState(-1);
  const [statusUpdate, setStatusUpdate] = useState(-1);
  const [statusApply, setStatusApply] = useState<Option[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCv, setIsOpenModalCv] = useState(false);
  const [infoOpenCv, setInfoOpenCv] = useState({
    searchId: -1,
    point: 2,
    id: -1,
    sourceType: -1,
  });
  const { setLoading } = useLoading();

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
    getStatusApply();
  }, []);

  const { control } = useForm({
    defaultValues: {
      name: "",
      cv: "",
      status: "",
    },
  });

  const header = [
    "Tên ứng viên",
    "Số điện thoại",
    "Email",
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
      toast.success("Mở cv thành công");
    } catch (error) {
      toast.error("Mở cv thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
              name="cv"
              classNameCustom="flex-1"
              placeholder="Tất cả"
              options={[
                { label: "Đã mở", value: "Đã mở" },
                { label: "Chưa mở", value: "Chưa mở" },
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
              options={[
                { label: "Phù hợp", value: "Phù hợp" },
                { label: "Chưa phù hợp", value: "Chưa phù hợp" },
                { label: "Cân nhắc", value: "Cân nhắc" },
                { label: "Mời phỏng vấn", value: "Mời phỏng vấn" },
                { label: "Nhận việc", value: "Nhận việc" },
              ]}
            />
          </div>
        </div>
      </div>
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
                      <div className="flex lg:justify-between items-center lg:flex-row flex-col ">
                        <div>
                          <div>{row.fullName}</div>
                          <div className="text-default">
                            <Link href={row.linkFile} target="_blank">
                              {getCvName(row.linkFile)}
                            </Link>
                          </div>
                        </div>
                        <div className="bg-[#DAFFD7] text-[#137F04] px-3 py-1  mt-1 rounded-xl">
                          Mức độ phù hợp: 87%
                        </div>
                      </div>
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
                    <div>
                      {row.isOpenedCV ? (
                        "Đã mở"
                      ) : (
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setInfoOpenCv({
                              searchId: row.searchId,
                              point: row.point,
                              id: row.id,
                              sourceType: row.SourceType,
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
              onClick={() => setIsOpenModal(false)}
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
