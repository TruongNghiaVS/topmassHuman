import VerifiedLink from "@/hook/verify-link";
import { ProfileUser } from "@/module/helper/master-data";
import {
  BellIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  IdentificationIcon,
  NewspaperIcon,
  RocketLaunchIcon,
  ShieldExclamationIcon,
  SparklesIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IItem {
  title: string;
  link: string;
  icon: any;
  verify_level: number;
}

interface IItemProps {
  item: IItem;
}

export const MenuItem = () => {
  const data = [
    {
      title: "Bảng tin",
      link: "bang-tin",
      icon: <RocketLaunchIcon className="w-4" />,
      verify_level: 1,
    },
    // {
    //   title: "Dịch vụ",
    //   link: "dich-vu",
    //   icon: <SparklesIcon className="w-4" />,
    // verify_level: 1,
    // },
    {
      title: "Chiến dịch tuyển dụng",
      link: "chien-dich-tuyen-dung",
      icon: <NewspaperIcon className="w-4" />,
      verify_level: 2,
    },
    {
      title: "Quản lý CV",
      link: "quan-ly-cv",
      icon: <DocumentTextIcon className="w-4" />,
      verify_level: 2,
    },
    {
      title: "Tìm CV",
      link: "tim-cv",
      icon: <IdentificationIcon className="w-4" />,
      verify_level: 2,
    },
    {
      title: "Lịch sử hoạt động",
      link: "lich-su-hoat-dong",
      icon: <ClockIcon className="w-4" />,
      verify_level: 1,
    },
    {
      title: "Thông báo",
      link: "thong-bao",
      icon: <BellIcon className="w-4" />,
      verify_level: 1,
    },
    {
      title: "Cài đặt tài khoản",
      link: "cai-dat-tai-khoan",
      icon: <Cog6ToothIcon className="w-4" />,
      verify_level: 1,
    },
    {
      title: "Liên hệ hỗ trợ",
      link: "lien-he-ho-tro",
      icon: <EnvelopeIcon className="w-4" />,
      verify_level: 1,
    },
    {
      title: "Chính sách bảo mật ",
      link: "/chinh-sach-bao-mat",
      icon: <ShieldExclamationIcon className="w-4" />,
      verify_level: 1,
    },
    {
      title: "Quy định sử dụng",
      link: "/quy-dinh-nha-tuyen-dung",
      icon: <ShieldExclamationIcon className="w-4" />,
      verify_level: 1,
    },
  ];
  return (
    <div className="mt-4">
      {data.map((item, idx) => {
        return <Item key={idx} item={item} />;
      })}
    </div>
  );
};

const Item = ({ item }: IItemProps) => {
  const { currentUser } = ProfileUser();

  const path = usePathname();
  const link = !["/chinh-sach-bao-mat", "/quy-dinh-nha-tuyen-dung"].includes(
    item.link
  )
    ? `/hr-center/${item.link}`
    : item.link;
  return (
    <div className="mt-4">
      <VerifiedLink
        href={link}
        currentUser={currentUser}
        verify_level={item.verify_level}
      >
        <div
          className={`inline-flex items-center ${
            path.includes(item.link) && "text-default"
          } hover:text-default `}
        >
          <div className="mr-4">{item.icon}</div>
          <div className="font-medium">{item.title}</div>
        </div>
      </VerifiedLink>
    </div>
  );
};
