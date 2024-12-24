"use client";

import Modal from "@/component/modal";
import { IModalVerifyLevel } from "@/interface/interface";
import { useRouter } from "next/navigation";

export const PopupVerifyLevel = ({ isOpen, onClose }: IModalVerifyLevel) => {
  const router = useRouter();
  const handleCancle = () => {
    router.push("/hr-center/cai-dat-tai-khoan");
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        activeCloseButton={false}
        className="md:min-w-[700px] max-h-[60vh] overflow-auto relative"
      >
        <div className="text-center font-medium my-2 mb-4">
          Vui lòng xác thực Thông tin công ty & Chứng từ doanh nghiệp để sử dụng
          tính năng này!
        </div>

        <div className="flex justify-center space-x-3">
          <button
            className="px-4 py-2 rounded-lg border-colorBase border hover:bg-colorBase hover:text-white"
            onClick={() => handleCancle()}
          >
            Xác nhận
          </button>
        </div>
      </Modal>
    </div>
  );
};
