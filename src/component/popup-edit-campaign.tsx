"use client";

import { ICampaignUpdate, IModalEditCampaign } from "@/interface/interface";
import Modal from "./modal";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TmInput from "./hook-form/input";
import axiosInstance from "@/utils/axios";
import { useLoading } from "@/app/context/loading";
import { toast } from "react-toastify";
import { UPDATE_CAMPAIGN } from "@/utils/api-url";
import { useEffect } from "react";

export const PopupCampaign = ({
  isOpen,
  onClose,
  nameUpdate = "",
  id = 0,
  mutate,
}: IModalEditCampaign) => {
  const { setLoading } = useLoading();
  const schema = yup.object().shape({
    name: yup.string().required("Tên chiến dịch không được để trống"),
  });

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver<ICampaignUpdate>(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (nameUpdate) {
      setValue("name", nameUpdate);
    }
  }, [nameUpdate, setValue]);

  const onSubmit: SubmitHandler<ICampaignUpdate> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(UPDATE_CAMPAIGN, {
        name: data.name,
        idUpdate: id,
      });
      if (response) {
        toast.success("Thêm mới chiến dịch thành công!");
        onClose();
        mutate();
      }
    } catch (error) {
      toast.error("Thêm mới chiến dịch thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="md:min-w-[700px] max-h-[60vh] overflow-auto relative"
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TmInput
            name="name"
            control={control}
            placeholder="VD: Tuyển dụng tháng 8"
          />
          <button
            type="submit"
            className="w-full mt-4 py-3 text-white bg-[#0F7A00] rounded-lg text-base font-bold"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </Modal>
  );
};
