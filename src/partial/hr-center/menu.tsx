import { DocumentTextIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const MenuHrCenter = () => {
  const navItems = [
    {
      title: "HR Center",
      subMenu: [],
      link: "/hr-center/chien-dich-tuyen-dung",
      border: true,
      active: false,
      image: false,
    },
    {
      title: "Đăng tin",
      subMenu: [],
      border: false,
      active: false,
      image: false,
    },
    {
      title: "Đổi (CV)",
      subMenu: [],
      border: false,
      active: false,
      image: true,
      bg: true,
      link: "/doi-cv",
    },
    {
      title: "Tìm CV",
      subMenu: [],
      link: "/hr-center/tim-cv",
      border: false,
      active: false,
      image: false,
    },
  ];

  return (
    <>
      <div className="w-full text-white">
        <ul className="xl:flex hidden p-0">
          {navItems.map((item) => (
            <li
              key={item.title}
              className="group/title mx-4 normal-case whitespace-nowrap after:transition-all after:transition-height after:ease-in-out after:duration-300 justify-center h-[76px] relative after:absolute after:content-[''] after:top-[calc(100%-3px)] hover:after:top-[calc(100%-3px)] after:left-0 after:w-full after:h-0 hover:after:h-[3px] after:bg-default flex items-center"
            >
              <Link
                href={item.link ? item.link : "#"}
                className={`"text-[#3B4358] no-underline text-lg font-medium p-[3px] 
                   ${item.bg && "bg-[#595757] rounded-2xl"}
                  ${
                    item.border &&
                    "rounded-2xl bg-gradient-to-r from-[#F89E1B] to-[#F37A20]"
                  } "`}
              >
                <div className={` rounded-2xl px-1 inline-flex items-center`}>
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
              {item.subMenu.length > 0 && <SubMenu subMenu={item.subMenu} />}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

type prop = {
  subMenu: string[];
};

export const SubMenu = ({ subMenu }: prop) => {
  return (
    <>
      <ul className="group/subMenu overflow-hidden border-[#d9dbe9] h-0 transition-all ease-in-out duration-300 text-sm leading-[19px] absolute top-[calc(100%+20px)] left-0 bg-white min-w-[250px] py-[5px] z-[-1] group-hover/title:z-[11] group-hover/title:h-auto shadow-md opacity-0 group-hover/title:opacity-100 group-hover/title:top-full">
        {subMenu.map((item) => (
          <li
            key={item}
            className="group/item normal-case whitespace-nowrap hover:bg-[#e4e4e4] p-0"
          >
            <Link
              href="#"
              className="group/submenu font-medium text-[#3B4358] no-underline group-hover/item:text-default px-[15px] py-3 flex "
            >
              <DocumentTextIcon className="text-default mr-2 text-[15px] leading-4 w-6" />
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
