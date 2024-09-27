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
    },
    // {
    //   title: "Dịch vụ",
    //   link: "dich-vu",
    //   icon: <SparklesIcon className="w-4" />,
    // },
    {
      title: "Chiến dịch tuyển dụng",
      link: "chien-dich-tuyen-dung",
      icon: <NewspaperIcon className="w-4" />,
    },
    {
      title: "Quản lý CV",
      link: "quan-ly-cv",
      icon: <DocumentTextIcon className="w-4" />,
    },
    {
      title: "Tìm CV",
      link: "tim-cv",
      icon: <IdentificationIcon className="w-4" />,
    },
    {
      title: "Lịch sử hoạt động",
      link: "lich-su-hoat-dong",
      icon: <ClockIcon className="w-4" />,
    },
    {
      title: "Thông báo",
      link: "thong-bao",
      icon: <BellIcon className="w-4" />,
    },
    {
      title: "Cài đặt tài khoản",
      link: "cai-dat-tai-khoan",
      icon: <Cog6ToothIcon className="w-4" />,
    },
    {
      title: "Liên hệ hỗ trợ",
      link: "lien-he-ho-tro",
      icon: <EnvelopeIcon className="w-4" />,
    },
    {
      title: "Chính sách bảo mật và quy định sử dụng",
      link: "chinh-sach-va-quy-dinh",
      icon: <ShieldExclamationIcon className="w-4" />,
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
  const path = usePathname();
  return (
    <div className=" mt-4">
      <Link href={`${`/hr-center/${item.link}`}`}>
        <div
          className={`inline-flex items-center ${
            path.includes(item.link) && "text-default"
          } hover:text-default `}
        >
          <div className="mr-4">{item.icon}</div>
          <div className="font-medium">{item.title}</div>
        </div>
      </Link>
    </div>
  );
};
