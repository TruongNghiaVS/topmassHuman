import { HeaderRegiser } from "./header-register";

interface props {
  children: React.ReactNode;
}

export const AuthorizeLayout = ({ children }: props) => {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-white">
      <div className="xl:col-span-8 lg:col-span-7 col-span-12 lg:row-auto row-start-2 row-end-2">
        <div className="xl:px-36 md:px-20 px-2 py-8 min-h-screen flex items-center">
          <div>
            <HeaderRegiser />
            {children}
          </div>
        </div>
      </div>
      <div className="xl:col-span-4 lg:col-span-5 col-span-12 lg:row-auto row-start-1 row-end-1">
        <img src="/imgs/bg-authorize.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
};
