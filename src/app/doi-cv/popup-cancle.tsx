"use client";

import Modal from "@/component/modal";
import { IModalCancleChangeCv } from "@/interface/interface";
import { CANCLE_EXCHANGE_CV } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { useLoading } from "@/app/context/loading";
import dynamic from "next/dynamic";

const CustomCKEditor = dynamic(
  () => {
    return import("../../component/hook-form/ck-editor");
  },
  { ssr: false }
);

export const PopupCancleChangeCV = ({
  isOpen,
  onClose,
  mutate,
  id,
}: IModalCancleChangeCv) => {
  const { setLoading } = useLoading();
  const handleCancle = async (id: number) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(CANCLE_EXCHANGE_CV, {
        id,
      });
      toast.success("Huỷ đổi CV thành công");
      mutate();
      onClose();
    } catch (error) {
      toast.success("Huỷ đổi CV thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="md:min-w-[700px] max-h-[60vh] overflow-auto relative"
      >
        <div className="text-center font-medium my-2 mb-4">
          Bạn có muốn huỷ thông tin đổi CV
        </div>

        <div className="flex justify-center space-x-3">
          <button
            className="px-4 py-1 rounded-lg bg-gray-400"
            onClick={() => onClose()}
          >
            Huỷ
          </button>
          <button
            className="px-4 py-1 rounded-lg bg-rose-500 text-white"
            onClick={() => handleCancle(id)}
          >
            Xác nhận
          </button>
        </div>
      </Modal>
    </div>
  );
};
