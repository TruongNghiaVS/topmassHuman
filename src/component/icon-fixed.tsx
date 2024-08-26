import { FacebookBootstrapIcon } from "@/theme/icons/facebookBootstrapIcon";
import { PhoneIcon } from "@heroicons/react/16/solid";

export default function IconFixed() {
  return (
    <div>
      <div className="fixed right-6 bottom-10 z-[9999]">
        <div className="rounded-full p-3 bg-[#F37A20]">
          <PhoneIcon className="w-8 text-white" />
        </div>
        <div className="rounded-full p-3 bg-[#F37A20] mt-2">
          <FacebookBootstrapIcon className="w-8 text-white" />
        </div>
        <div className="rounded-full p-3 bg-[#F37A20] mt-2">
          <PhoneIcon className="w-8 text-white" />
        </div>
      </div>
    </div>
  );
}
