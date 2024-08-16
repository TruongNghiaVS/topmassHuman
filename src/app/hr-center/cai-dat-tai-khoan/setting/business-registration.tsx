import CustomUpload from "@/component/hook-form/custom-upload";
import { ICompanyBusiness, IUpdateInfomation } from "@/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function BusinessRegistration() {
  const SUPPORTED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const schema = yup.object().shape({
    company_business: yup
      .mixed<File>()
      .test(
        "fileFormat",
        "Định dạng file không hợp lệ. Chỉ chấp nhận các định dạng: JPEG, JPG, PNG, PDF.",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      )
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 5 * 1024 * 1024;
      }),
  });

  const { handleSubmit, control } = useForm<ICompanyBusiness>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICompanyBusiness> = (data) => {
    toast.success("Upload file thành công!");
    console.log(data);
  };

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <div className="font-semibold">Thông tin giấy đăng ký doanh nghiệp</div>
        <div className="bg-[#64D885] rounded-2xl px-2 py-1">Đã duyệt</div>
        <div className="bg-[#FCC575] rounded-2xl px-2 py-1 text-default">
          Chờ duyệt
        </div>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomUpload name="company_business" control={control} />
          <button
            type="submit"
            className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}
