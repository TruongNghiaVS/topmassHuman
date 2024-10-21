import Link from "next/link";

export const Access = () => {
  return (
    <div className="relative px-0 max-1280:px-2">
      <img src="/imgs/bg-access.png" alt="" className="w-full" />
      <Link href="/hr-center/doi-cv">
        <div className="absolute left-0 right-0 sm:bottom-14 bottom-2 text-center">
          <span className="sm:px-4 sm:py-2 px-2 py-1 bg-white rounded-2xl sm:text-base text-xs">
            Tham gia ngay
          </span>
        </div>
      </Link>
    </div>
  );
};
