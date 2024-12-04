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
  link: string;
  icon: any;
}

interface IItemProps {
  item: IItem;
}

export const MenuItemSmall = () => {
  const data = [
    {
      link: "bang-tin",
      icon: <RocketLaunchIcon className="w-6" />,
    },
    // {
    //   link: "dich-vu",
    //   icon: <SparklesIcon className="w-6" />,
    // },
    {
      link: "chien-dich-tuyen-dung",
      icon: <NewspaperIcon className="w-6" />,
    },
    {
      link: "quan-ly-cv",
      icon: <DocumentTextIcon className="w-6" />,
    },
    {
      link: "tim-cv",
      icon: <IdentificationIcon className="w-6" />,
    },
    {
      link: "lich-su-hoat-dong",
      icon: <ClockIcon className="w-6" />,
    },
    {
      link: "thong-bao",
      icon: <BellIcon className="w-6" />,
    },
    {
      link: "cai-dat-tai-khoan",
      icon: <Cog6ToothIcon className="w-6" />,
    },
    {
      link: "lien-he-ho-tro",
      icon: <EnvelopeIcon className="w-6" />,
    },
    {
      title: "Chính sách bảo mật ",
      link: "/chinh-sach-bao-mat",
      icon: <ShieldExclamationIcon className="w-4" />,
    },
    {
      title: "Quy định sử dụng",
      link: "/quy-dinh-nha-tuyen-dung",
      icon: <ShieldExclamationIcon className="w-4" />,
    },
  ];
  return (
    <div className="">
      {data.map((item) => {
        return <Item key={item.link} item={item} />;
      })}
    </div>
  );
};

const Item = ({ item }: IItemProps) => {
  const path = usePathname();
  const link = !["/chinh-sach-bao-mat", "/quy-dinh-nha-tuyen-dung"].includes(
    item.link
  )
    ? `/hr-center/${item.link}`
    : item.link;
  return (
    <div className=" mt-4">
      <Link href={link}>
        <div
          className={`${
            path.includes(item.link) && "text-default"
          } hover:text-default `}
        >
          <div className="grid justify-center">{item.icon}</div>
        </div>
      </Link>
    </div>
  );
};
