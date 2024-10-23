"use client";

import TmCheckbox from "@/component/hook-form/checkbox";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import CustomUploadMulti from "@/component/hook-form/upload-multiphe-file";
import Modal from "@/component/modal";
import { IChangeCv, IModalChangeCv } from "@/interface/interface";
import { positions, year_experiences } from "@/mockup-data/data";
import { Experiences, Rank } from "@/module/helper/master-data";
import { ADD_EXCHANGE_CV, UPLOAD_IMG } from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useLoading } from "../context/loading";
import { toast } from "react-toastify";

export const PopupChangeCv = ({ isOpen, onClose, mutate }: IModalChangeCv) => {
  const { experiences } = Experiences();
  const { ranks } = Rank();
  const { setLoading } = useLoading();
  const schema = yup.object().shape({
    files: yup
      .mixed<FileList>()
      .test("required", "Vui lòng chọn cv để thay đổi", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Chỉ upload PDF ", (value) => {
        if (value && value.length > 0) {
          const allowedFormats = ["application/pdf"];
          return Array.from(value).every((file: File) =>
            allowedFormats.includes(file.type)
          );
        }
        return true;
      })
      .test("fileSize", "Chỉ được upload tối đa 5MB/File", (value) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (value && value.length > 0) {
          return Array.from(value).every((file: File) => file.size <= maxSize);
        }
        return true;
      }),
    name: yup.string().required("Vui lòng nhập tên chiến dịch đổi cv"),
    candidate_position: yup.string().required("Vui lòng nhập vị trí ứng tuyển"),
    position: yup.string().required("Vui lòng chọn chức vụ"),
    year_experience: yup.string().required("Vui lòng chọn số năm kinh nghiệm"),
    is_approve: yup
      .boolean()
      .required("Bạn phải đồng ý với điều khoản sử dụng của chúng tôi")
      .oneOf([true], "Bạn phải đồng ý với điều khoản sử dụng của chúng tôi"),
  });

  const { control, handleSubmit } = useForm<IChangeCv>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      candidate_position: "",
      position: "",
      year_experience: "",
      is_approve: false,
    },
  });

  const onSubmit: SubmitHandler<IChangeCv> = async (data: any) => {
    setLoading(true);
    try {
      let linkFiles: string[] = [];
      if (data.files.length > 0) {
        const arrFile: File[] = Array.from(data.files);

        linkFiles = await Promise.all(
          arrFile.map(async (file: File) => {
            const res = await axiosInstanceImg.post(UPLOAD_IMG, { file: file });
            return res.data.fullLink;
          })
        );
      }

      const res = await axiosInstance.post(ADD_EXCHANGE_CV, {
        title: data.name,
        position: data.candidate_position,
        rank: data.position,
        experience: data.year_experience,
        linkCVs: ["string"],
      });
      toast.success("Thêm mới đổi CV thành công");
      mutate();
    } catch (error) {
      toast.success("Thêm mới đổi CV thất bại");
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
        <div className="text-xl font-bold my-2">Tải CV lên</div>
        <div className="">Tên chiến dịch đổi CV</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <TmInput control={control} name="name" />
          </div>
          <div className="mt-4">
            <CustomUploadMulti
              title="Tải tệp hoặc File từ máy tính"
              control={control}
              name="files"
              acceptFile=".pdf"
            />
          </div>
          <div className="mt-4 text-[#D60000] text-[13px]">
            * Lưu ý: Những CV cùng chiến dịch đổi CV phải tương tự vị trí và
            kinh nghiệm làm việc!
          </div>
          <div className="mt-4">
            <div>
              Điền thông tin bổ sung <span className="text-[#dc2f2f]">*</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <div className="flex-1">
              <div>
                Vị trí ứng tuyển <span className="text-[#dc2f2f]">*</span>
              </div>
              <div>
                <TmInput control={control} name="candidate_position" />
              </div>
            </div>
            <div className="flex-1 flex space-x-2">
              <div className="flex-1">
                <div>
                  Chức vụ <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="position"
                    control={control}
                    options={ranks}
                    placeholder="Chức vụ"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div>
                  Năm kinh nghiệm <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="year_experience"
                    control={control}
                    options={experiences}
                    placeholder="Kinh nghiệm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-2 items-center">
            <TmCheckbox
              name="is_approve"
              control={control}
              type="checkbox"
              label={
                <div>
                  Tôi đã đọc và đồng ý với{" "}
                  <Link href="#" className="text-default">
                    điều khoản sử dụng
                  </Link>
                </div>
              }
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
          >
            Xác nhận
          </button>
        </form>
      </Modal>
    </div>
  );
};
