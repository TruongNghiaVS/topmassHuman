import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { TitleCustom } from "@/component/custom-title";

const NewDetail = () => {
  const data = [1, 2, 3, 4];
  return (
    <div className="">
      <div className="mx-auto container">
        <div className=" max-1280:px-2">
          <div className="xl:col-span-8 md:col-span-7">
            <div className="text-xs font-normal">Cẩm nang nghề nghiệp</div>
            <div className="text-2xl font-bold">
              KOL là gì? Bật mí 7 bước trở thành KOL chuyên nghiệp thu hút triệu
              fans
            </div>
            <div className="flex text-xs">
              <div className="mr-4">By Minh Phạm</div>
              <div className="pl-2 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:my-auto before:w-1 before:h-1 before:rounded-full before:bg-black">
                25/05/2023
              </div>
            </div>
            <div>content</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDetail;

export const revalidate = 100;
