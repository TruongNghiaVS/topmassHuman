import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/16/solid";

export const SupportContact = () => {
  return (
    <div>
      <div className="font-medium">Hotline CSKH & hỗ trợ dịch vụ</div>
      <div className="font-medium mt-2">
        Luôn sẵn sàng hỗ trợ bạn Vui lòng liên hệ theo phương thức dưới đây
      </div>
      <div className="flex space-x-2 mt-2">
        <div className="flex-1 flex items-center">
          <PhoneIcon className="w-4 mr-2 text-default" /> 0123456789
        </div>
        <div className="flex-1 flex items-center">
          <EnvelopeIcon className="w-4 mr-2 text-default" /> test@gmail.com
        </div>
      </div>
    </div>
  );
};
