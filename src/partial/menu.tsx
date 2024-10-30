import { DocumentTextIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const path = usePathname();

  const navItems = [
    {
      title: "Giới Thiệu",
      subMenu: [],
      border: false,
      patch_check: "/gioi-thieu",
      link: "/ve-chung-toi",
    },
    // {
    //   title: "Dịch Vụ",
    //   subMenu: [
    //     {
    //       title: "Bí Quyết Tìm Việc",
    //       slug: "/dich-vu/bi-quyet-tim-viec",
    //       icon: (
    //         <DocumentTextIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
    //       ),
    //     },
    //     {
    //       title: "Thị Trường - Xu Hướng",
    //       slug: "/dich-vu/thi-truong-xu-huong",
    //       icon: (
    //         <DocumentTextIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
    //       ),
    //     },
    //     {
    //       title: "Góc Thư Giản",
    //       slug: "/dich-vu/goc-thu-gian",
    //       icon: (
    //         <DocumentTextIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
    //       ),
    //     },
    //     {
    //       title: "Tiện Ích",
    //       slug: "/dich-vu/tien-ich",
    //       icon: (
    //         <DocumentTextIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
    //       ),
    //     },
    //     {
    //       title: "Góc Báo Chí",
    //       slug: "/dich-vu/goc-bao-chi",
    //       icon: (
    //         <DocumentTextIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
    //       ),
    //     },
    //   ],
    //   border: false,
    //   patch_check: "/dich-vu",
    // },
    {
      title: "HR Center",
      subMenu: [],
      link: "/hr-center/bang-tin",
      border: true,
      patch_check: "/hr-center",
    },
    {
      title: "Đổi (CV)",
      subMenu: [],
      border: true,
      image: true,
      patch_check: "/doi-cv",
      link: "/doi-cv",
    },
    {
      title: "Liên Hệ",
      link: "/lien-he",
      subMenu: [],
      border: false,
      patch_check: "/lien-he",
    },
  ];

  return (
    <>
      <div className="w-full">
        <ul className="xl:flex hidden p-0">
          {navItems.map((item) => (
            <li
              key={item.title}
              className="group/title mx-4 normal-case whitespace-nowrap after:transition-all after:transition-height after:ease-in-out after:duration-300 justify-center h-[76px] relative after:absolute after:content-[''] after:top-[calc(100%-3px)] hover:after:top-[calc(100%-3px)] after:left-0 after:w-full after:h-0 hover:after:h-[3px] after:bg-default flex items-center"
            >
              <Link
                href={item.link ? item.link : "#"}
                className={`"text-[#3B4358] no-underline font-medium p-[3px] 
                  ${path.includes(item.patch_check) ? "text-default" : ""}
                  ${
                    item.border &&
                    "rounded-2xl bg-gradient-to-r from-[#F89E1B] to-[#F37A20]"
                  } "`}
              >
                <div className="bg-white text-base rounded-2xl px-1 inline-flex items-center">
                  {item.title}{" "}
                  {item.image && (
                    <img
                      src="/imgs/arrow.svg"
                      alt=""
                      className="ml-1 w-4 h-4"
                    />
                  )}
                </div>
              </Link>
              {item.subMenu.length > 0 && (
                <SubMenu pathCheck={path} subMenu={item.subMenu} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export type ISubmenuProps = {
  subMenu: {
    title: string;
    slug: string;
    icon: any;
    border?: boolean;
    after?: any;
  }[];
  pathCheck: string;
};

export const SubMenu = ({ subMenu, pathCheck }: ISubmenuProps) => {
  return (
    <>
      <ul className="p-2 rounded-lg group/subMenu overflow-hidden border-[#d9dbe9] h-0 transition-all ease-in-out duration-300 text-sm leading-[19px] absolute top-[calc(100%+20px)] left-0 bg-white min-w-[250px] py-[5px] z-[-1] group-hover/title:z-[11] group-hover/title:h-auto shadow-md opacity-0 group-hover/title:opacity-100 group-hover/title:top-full">
        {subMenu.map((item) => (
          <li
            key={item.title}
            className={`group/item normal-case whitespace-nowrap my-2 bg-[#e4e4e4] p-0 rounded `}
          >
            <Link
              href={item.slug}
              className={`group/submenu font-medium text-[#3B4358] no-underline group-hover/item:text-default px-[15px] py-3 flex items-center relative  ${
                pathCheck.includes(item.slug) && "text-default"
              }  ${
                item.border &&
                "mb-4 after:absolute after:content-[''] after:left-0 after:bottom-[-8px] after:right-0 after:w-full after:h-[1px] after:bg-[#e4e4e4]"
              }`}
            >
              {item.icon}
              {item.title}
              {item?.after}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
