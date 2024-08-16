import CKEditorInput from "@/component/hook-form/ck-editor";
import TmInput from "@/component/hook-form/input";
import AvatarUpload from "@/component/hook-form/upload-avatar";
import { IUpdateCompany } from "@/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

interface IEditCompanyProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function EditInfomationCompany({ setEdit }: IEditCompanyProps) {
  const schema = yup.object().shape({
    logo: yup
      .mixed<File>()
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 2MB
      ),
    banner: yup
      .mixed<File>()
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 2MB
      ),
    code: yup.string(),
    name: yup.string(),
    website: yup.string(),
    activity: yup.string(),
    scale: yup.string(),
    location: yup.string(),
    email: yup.string(),
    phone_number: yup.string(),
  });

  const { handleSubmit, control } = useForm<IUpdateCompany>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "0123456789",
      name: "Công ty Cổ phần Tập đoàn Vietstar ",
      website: "Vietstargroup.vn",
      activity: "Tài chính, nhân sự",
      scale: "100-200 nhân viên",
      location: "54/31 Phổ Quang, Phường 02, Tân Bình. TP HCM",
      email: "Support@vietstargroup.vn",
      phone_number: "0123456789",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<IUpdateCompany> = (data) => {
    toast.success("Cập nhật thông tin công ty thành công!");
    setEdit(false);
    console.log(data);
  };
  return (
    <div>
      <div className="font-medium">Cập nhật thông tin công ty</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-2 items-center">
          <div className="flex-1">
            <div className="">Logo công ty</div>
            <AvatarUpload control={control} name="logo" />
          </div>
          <div className="flex-1">
            <div className="">Ảnh bìa công ty</div>
            <AvatarUpload name="banner" control={control} />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Mã số thuế</div>
            <TmInput control={control} name="code" />
          </div>
          <div className="flex-1">
            <div className="">Tên công ty</div>
            <TmInput name="name" control={control} />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Website</div>
            <TmInput control={control} name="website" />
          </div>
          <div className="flex-1">
            <div className="">Lĩnh vực hoạt động</div>

            <TmInput name="activity" control={control} />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Quy mô</div>
            <TmInput control={control} name="scale" />
          </div>
          <div className="flex-1">
            <div className="">Địa chỉ</div>

            <TmInput name="location" control={control} />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Email</div>
            <TmInput control={control} name="email" />
          </div>
          <div className="flex-1">
            <div className="">Số điện thoại</div>

            <TmInput name="phone" control={control} />
          </div>
        </div>
        <div className="mt-2">
          <CKEditorInput name="content" control={control} />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
