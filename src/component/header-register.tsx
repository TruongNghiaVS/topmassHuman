import Link from "next/link";

export const HeaderRegiser = () => {
  return (
    <div className="mb-8">
      <Link href="/" className="inline-block">
        <img src="/imgs/logo-new.svg" alt="" className="w-[180px] " />
      </Link>
    </div>
  );
};
