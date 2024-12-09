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
  link: string;
  icon: any;
  verify_level: number;
}

interface IItemProps {
  item: IItem;
}

export const MenuItemSmall = () => {
  const data = [
    {
      title: "Bảng tin",
      link: "bang-tin",
      icon: <RocketLaunchIcon className="w-5" />,
      verify_level: 1,
    },
    // {
    //   title: "Dịch vụ",
    //   link: "dich-vu",
    //   icon: <SparklesIcon className="w-5" />,
    // verify_level: 1,
    // },
    {
      link: "chien-dich-tuyen-dung",
      icon: <NewspaperIcon className="w-5" />,
      verify_level: 2,
    },
    {
      link: "quan-ly-cv",
      icon: <DocumentTextIcon className="w-5" />,
      verify_level: 2,
    },
    {
      link: "tim-cv",
      icon: <IdentificationIcon className="w-5" />,
      verify_level: 2,
    },
    {
      link: "lich-su-hoat-dong",
      icon: <ClockIcon className="w-5" />,
      verify_level: 1,
    },
    {
      link: "thong-bao",
      icon: <BellIcon className="w-5" />,
      verify_level: 1,
    },
    {
      link: "cai-dat-tai-khoan",
      icon: <Cog6ToothIcon className="w-5" />,
      verify_level: 1,
    },
    {
      link: "lien-he-ho-tro",
      icon: <EnvelopeIcon className="w-5" />,
      verify_level: 1,
    },
    {
      link: "/chinh-sach-bao-mat",
      icon: <ShieldExclamationIcon className="w-5" />,
      verify_level: 1,
    },
    {
      link: "/quy-dinh-nha-tuyen-dung",
      icon: <ShieldExclamationIcon className="w-5" />,
      verify_level: 1,
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
  const { currentUser } = ProfileUser();

  const path = usePathname();
  const link = !["/chinh-sach-bao-mat", "/quy-dinh-nha-tuyen-dung"].includes(
    item.link
  )
    ? `/hr-center/${item.link}`
    : item.link;
  return (
    <div className=" mt-4">
      <VerifiedLink
        href={link}
        currentUser={currentUser}
        verify_level={item.verify_level}
      >
        <div
          className={`${
            path.includes(item.link) && "text-default"
          } hover:text-default `}
        >
          <div className="grid justify-center ">{item.icon}</div>
        </div>
      </VerifiedLink>
    </div>
  );
};
