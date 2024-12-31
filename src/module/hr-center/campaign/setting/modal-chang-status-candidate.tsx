import { useLoading } from "@/app/context/loading";
import TmSelect from "@/component/hook-form/select";
import Modal from "@/component/modal";
import {
  IModalChangeStatusProps,
  IUpdateStatusCandidate,
} from "@/interface/interface";
import { UPDATE_STATUS_CANDIATE_SEE_JOB } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const CustomCKEditor = dynamic(
  () => {
    return import("../../../../component/hook-form/ck-editor");
  },
  { ssr: false }
);

export const ModalChangeStatusCandidate = ({
  isOpenModal,
  onClose,
  listStatus,
  id,
  status,
  mutate,
}: IModalChangeStatusProps) => {
  const { setLoading } = useLoading();
  const schema = yup.object().shape({
    noteCode: yup.number().required("Trạng thái không được để trống"),
    noted: yup.string(),
  });

  useEffect(() => {
    reset({
      noted: "",
      noteCode: status,
    });
  }, [status]);

  const { control, handleSubmit, reset } = useForm<IUpdateStatusCandidate>({
    resolver: yupResolver(schema),
    defaultValues: {
      noted: "",
      noteCode: -1,
    },
  });

  const onSubmit: SubmitHandler<IUpdateStatusCandidate> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        UPDATE_STATUS_CANDIATE_SEE_JOB,
        {
          identi: id,
          noteCode: +data.noteCode,
          noted: data.noted,
        }
      );
      toast.success("Cập nhật trạng thái thành công");
      mutate();
      onClose();
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpenModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <div>
            Trạng thái CV <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmSelect
            control={control}
            name="noteCode"
            options={listStatus}
            placeholder="Trạng thái"
          />
        </div>
        <div className="mt-4">
          <div>Lý do</div>
          <CustomCKEditor name="noted" control={control} />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Xác nhận
        </button>
      </form>
    </Modal>
  );
};
