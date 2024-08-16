import { useState } from "react";
import EditInfomationCompany from "./edit-infomation-company";

export default function InfomationCompany() {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div>
      {!edit ? (
        <div>
          <div className="flex justify-between items-center">
            <div className="font-medium">Thông tin công ty</div>
            <button
              className="px-2 py-0.5 rounded-lg rounded-2xl text-default bg-[#FCC575]"
              onClick={() => setEdit(true)}
            >
              Chỉnh sửa
            </button>
          </div>
          <div className="mt-4 flex space-x-3 items-center">
            <img src="/imgs/logo-work.png" alt="" className="w-auto " />
            <div className="font-medium">
              <div>Công ty cổ phần tập đoàn VietStar</div>
              <div>54/31 đường Phổ Quang,P.2, Tân Bình</div>
            </div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1">Mã số thuế: 12345678</div>
            <div className="flex-1">Website: Vietstargroup.vn</div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1">Lĩnh vực hoạt động: Tài chính, nhân sự</div>
            <div className="flex-1">Qui mô: 100-200 nhân viên</div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1">Email: Support@vietstargroup.vn</div>
            <div className="flex-1">Số điện thoại: 0123456789</div>
          </div>
          <div className="mt-2">
            Địa chỉ: 54/31 Phổ Quang, Phường 02, Tân Bình. TP HCM
          </div>
          <div className="mt-2">Mô tả công ty: Về Vietstargroup</div>
          <div className="mt-2 px-4">
            Công ty Cổ phần Tập đoàn Vietstar ( VIETSTAR GROUP JOINT STOCK
            COMPANY) tên viết tắt là Vietstar Group được thành lập ngày 01 tháng
            08 năm 2018. Đây là doanh nghiệp chuyên cung cấp dịch vụ tài chính
            và cung ứng nhân sự cho thị trường Việt Nam. Với đội ngũ nhân viên
            được trang bị đầy đủ kiến thức và kinh nghiệm, Vietstar luôn đáp ứng
            tốt dịch vụ nhân sự và tài chính cho các doanh nghiệp ở thời điểm
            hiện tại. Với đội ngũ nhân viên trẻ trung, năng động, sáng tạo cùng
            chuyên môn cao, tác phong làm việc vô cùng chuyên nghiệp cùng môi
            trường làm việc thoải mái, công ty Vietstar luôn mang đến những dịch
            vụ tuyệt vời đến cho doanh nghiệp và khách hàng. Đến với chúng tôi,
            bạn sẽ tiết kiệm được thời gian, chí phí cùng chất lượng dịch vụ
            được đảm bảo theo một hệ thống. Hiện tại Vietstar cung cấp các 2
            dịch vụ chính là: Hỗ trợ vay tiêu dùng, dịch vụ tuyển dụng. Các đối
            tác tiêu biểu của Vietstar là Concentrix, Fe Credit, Nature Origin,
            Transcomos, Viet Credit, OCB, TPBank, SHB, ACS Việt Nam, Lotte...
            Vietstar là công ty dịch vụ thuê ngoài chuyên cung cấp dịch vụ cho
            hầu hết các Công ty Tài chính, Ngân hàng lớn. Hoạt động kinh doanh
            của chúng tôi tập trung vào khách hàng, nguồn nhân lực và đối tác
            kinh doanh, tạo ra giá trị gia tăng lâu dài và bền vững cho các đối
            tác kinh doanh của mình thông qua việc thực hiện kiểm soát rủi ro
            nội bộ, tối ưu hóa hệ thống vận hành và tính minh bạch của doanh
            nghiệp. Vietstar ngay từ khi mới thành lập đã có những mục tiêu phát
            triển rõ ràng nhằm khẳng định bước chân trên thị trường. Với nhiệm
            vụ là cầu nối giữa công ty với khách hàng, chúng tôi đã xây dựng cho
            mình tầm nhìn và sứ mệnh:
          </div>
        </div>
      ) : (
        <div>
          <EditInfomationCompany setEdit={setEdit} />
        </div>
      )}
    </div>
  );
}
