import { SunglassesBootstrapIcon } from "@/theme/icons/sunglassesBootstrapIcon";
import {
  DocumentCheckIcon,
  DocumentPlusIcon,
  FireIcon,
  FlagIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function DashBoard() {
  return (
    <div className="px-6 py-3">
      <div className="font-normal text-xl">Bảng tin</div>
      <div className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <img
            src="/imgs/banner-hr-center.png"
            alt=""
            className="w-full rounded-lg "
          />
        </div>
        <div>
          <img
            src="/imgs/banner-hr-center.png"
            alt=""
            className="w-full rounded-lg "
          />
        </div>
      </div>

      <div className="mt-4 grid xl:grid-cols-2 grid-cols-1 gap-4">
        <div className="rounded-lg bg-white p-4">
          <div className="">Hiệu quả tuyển dụng</div>
          <div className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="p-4 rounded-lg bg-[#FFF5D9]">
              <div className="flex items-center justify-between">
                <div className="text-[#FFB600] font-normal">0</div>
                <div>
                  <FlagIcon className="w-6 text-[#FCB400]" />
                </div>
              </div>
              <div className="my-6 text-[#FFB600]">Chiến dịch đang mở</div>
            </div>
            <div className="p-4 rounded-lg bg-[#DAFFD7]">
              <div className="flex items-center justify-between">
                <div className="text-[#137F04] font-normal">0</div>
                <div>
                  <DocumentCheckIcon className="w-6 text-[#137F04]" />
                </div>
              </div>
              <div className="my-6 text-[#137F04]">CV tiếp nhận</div>
            </div>
            <div className="p-4 rounded-lg bg-[#E9F0FF]">
              <div className="flex items-center justify-between">
                <div className="text-[#004ED8] font-normal">0</div>
                <div>
                  <SunglassesBootstrapIcon className="w-6 text-[#004ED8]" />
                </div>
              </div>
              <div className="my-6 text-[#004ED8]">Tin tuyển dụng hiển thị</div>
            </div>
            <div className="p-4 rounded-lg bg-[#FFE9E9]">
              <div className="flex items-center justify-between">
                <div className="text-[#AF0000] font-normal">0</div>
                <div>
                  <FireIcon className="w-6 text-[#AF0000]" />
                </div>
              </div>
              <div className="my-6 text-[#AF0000]">CV ứng tuyển mới</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4">
          <div className="rounded-lg p-4 flex bg-[#BFBFBF] items-center ">
            <div className="inline-block p-0.5 rounded-full bg-[#F37A20] mr-3 ">
              <UserIcon className="w-10 text-white" />
            </div>
            <div className="flex-1	">
              <div className="font-normal">MKT Vietstar Minh</div>
              <div className="text-xs font-normal inline-block px-2 py-1 rounded bg-[#E2E1E0]">
                Mã NTD: TM9881
              </div>
              <div className="flex-1 text-xs font-normal sm:flex mt-4  ">
                <div className="flex items-center sm:mr-10 ">
                  <EnvelopeIcon className="w-4 mr-2" /> test@vietstargroup.vn
                </div>
                <div className="flex items-center sm:mt-0 mt-2">
                  <PhoneIcon className="w-4 mr-2" />
                  0345678912
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid sm:grid-cols-3 grid-cols-1 items-center gap-4">
              <div className="rounded-lg h-full p-4 bg-[#DAFFD7] flex items-center text-[#0F7A00]">
                Tin đăng <DocumentPlusIcon className="w-6 ml-2" />
              </div>
              <div className="rounded-lg h-full p-4 bg-[#DAFFD7] ">
                <div className="text-xs">Bạn còn: </div>
                <div className="text-[#0F7A00] ">5 lượt đăng tin</div>
              </div>
              <div className="rounded-lg h-full p-4 bg-[#DAFFD7] ">
                <div className="text-xs">Hạn dùng: </div>
                <div className="text-[#0F7A00] ">13/08/2024</div>
              </div>
              <div className="rounded-lg bg-[#FFE39C] h-full p-4 flex items-center text-[#C65000]">
                Bạn có <img src="/imgs/arrow.svg" alt="" className="w-4 ml-4" />
              </div>
              <div className="rounded-lg bg-[#FFE39C] h-full p-4">
                <div className="text-xs">Bạn có: </div>
                <div className="text-[#C65000] text-base">500 tia set</div>
              </div>
              <div className="rounded-lg bg-[#FFE39C] h-full p-4">
                <div className="text-[8px]">
                  Nạp tiền hoặc làm nhiệm vụ để có thật nhiều tia sét
                </div>
                <div className="flex justify-center">
                  <div className="inline-flex p-1 rounded-lg text-white bg-gradient-to-r from-[#F89E1B] to-[#F37A20] text-white items-center">
                    <div className="relative border-b border-white mr-1 text-xs">
                      Thêm tích luỹ
                    </div>
                    <img src="/imgs/pig.png" alt="" className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6 text-lg font-medium">Dịch vụ đã mua</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 border border-[#F37A20] rounded-xl flex items-center">
              <div className="font-regular text-base mr-2 whitespace-nowrap">
                BANNER TOP
              </div>
              <div className="text-[8px]">
                Trải nghiệm gói đăng tin tuyển dụng, hiện thị tại vị trí nổi bật
                trong việc làm danh cho bạn , giá dùng thử hấp dẫn
              </div>
            </div>
            <div className="flex items-center justify-between px-4">
              <div className="text-center">
                <div className="text-[8px]">Số lượng</div>
                <div className="text-base">4</div>
              </div>
              <button className="px-4 py-2 text-white bg-[#F37A20] rounded-lg">
                Kích hoạt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
