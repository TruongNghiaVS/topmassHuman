import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import CustomUploadMulti from "@/component/hook-form/upload-multiphe-file";
import { ISupportSetting } from "@/interface/interface";
import { CREATE_TOCKET, UPLOAD_IMG } from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function SupportForm() {
  const { setLoading } = useLoading();

  const fileValidationSchema = yup.object().shape({
    files: yup
      .mixed<FileList>()
      .test("fileType", "Chỉ upload file JPEG,JPG,PNG,PDF ", (value) => {
        if (value && value.length > 0) {
          const allowedFormats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
          ];
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
      })
      .test("fileCount", "Chỉ upload tối đa 2 file", (value) => {
        const maxFiles = 2;
        if (value) {
          return value.length <= maxFiles;
        }
        return true;
      }),
    title: yup.string().required("Vui lòng nhập tiêu đề"),
    description: yup.string().required("Vui lòng nhập mô tả"),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISupportSetting>({
    resolver: yupResolver(fileValidationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: ISupportSetting) => {
    setLoading(true);
    let link = "";
    try {
      if (data.files && data.files?.length > 0) {
        const response = await axiosInstanceImg.post(UPLOAD_IMG, {
          file: data.files[0],
        });
        if (response) {
          link = response.data.shortLink;
        }
      }

      const res = axiosInstance.post(CREATE_TOCKET, {
        title: data.title,
        content: data.description,
        linkFile: link,
      });
      reset();
      toast.success("Thêm thông tin hỗ trợ thành công");
    } catch (error) {
      toast.error("Thêm thông tin hỗ trợ thất bại");
    } finally {
      setLoading(false);
    }

    // Handle form submission
    toast.success("Gửi thông tin thành công");
    console.log(data.files);
  };

  return (
    <div>
      <div>Yêu cầu hỗ trợ</div>
      <div className="mt-2">
        Nhằm hỗ trợ kịp thời và nhanh chóng đến quý khách hàng, Topmass tiếp
        nhận thông qua kênh hộp thư hỗ trợ. Mong rằng sẽ nhận được thật nhiều sự
        quan tâm và phản hồi từ quý khách hàng trong quá trình sử dụng dịch vụ
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div>
              Tiêu đề <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput control={control} placeholder="Tiêu đề" name="title" />
          </div>
          <div className="mb-4">
            <div>
              Mô tả <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput control={control} placeholder="Mô tả" name="description" />
          </div>
          <div>
            <CustomUploadMulti
              name="files"
              title="Tải tệp hoặc File từ máy tính"
              control={control}
            />
          </div>
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
