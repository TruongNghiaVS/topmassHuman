import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/16/solid";

export const Recruitment = () => {
  return (
    <div>
      <div className="font-medium">Tư vấn tuyển dụng</div>
      <div className="font-medium mt-2">Liên hệ ngay</div>
      <div className="flex space-x-2 mt-2">
        <div className="flex-1 flex items-center">
          <PhoneIcon className="w-4 mr-2 text-default" /> 0903 972 940
        </div>
        <div className="flex-1 flex items-center">
          <EnvelopeIcon className="w-4 mr-2 text-default" /> Support@topmass.vn
        </div>
      </div>
    </div>
  );
};
