import Link from "next/link";

export default function PolicyAndSupport() {
  return (
    <div className="px-6 py-3 bg-white">
      <div>
        <Link className="hover:text-[#F37A20]" href="/chinh-sach-bao-mat">
          Chính sách bảo mật
        </Link>
      </div>
      <div>
        <Link className="hover:text-[#F37A20]" href="/quy-dinh-nha-tuyen-dung">
          Quy định nhà tuyển dụng
        </Link>
      </div>
    </div>
  );
}
