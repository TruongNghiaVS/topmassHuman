"use client";

import Modal from "@/component/modal";
import { useModalStore } from "@/store-zustand/useModalStore";

export const ModalStorm = () => {
  const { isOpen, closeModal } = useModalStore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="md:min-w-[700px] max-h-[60vh] overflow-auto relative"
    >
      <div>
        <div className="font-semibold text-center text">
          Bạn đã sử dụng hết tia sét. Vui lòng mua thêm gói để tiếp tục sử dụng
          dịch vụ
        </div>
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 border rounded "
            onClick={() => closeModal()}
          >
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
};
