import Link from "next/link";

export default function PolicyAndSupport() {
  return (
    <div className="px-6 py-3 bg-white min-h-screen">
      <div>
        <Link
          className="hover:text-[#F37A20] text-base font-medium underline"
          href="/chinh-sach-bao-mat"
        >
          Chính sách bảo mật
        </Link>
      </div>
      <div>
        <Link
          className="hover:text-[#F37A20] text-base font-medium underline"
          href="/quy-dinh-nha-tuyen-dung"
        >
          Quy định nhà tuyển dụng
        </Link>
      </div>
    </div>
  );
}
