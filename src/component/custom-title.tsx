interface props {
  title: string;
  className?: string;
}

export const TitleCustom = ({ title, className }: props) => {
  return (
    <div
      className={`text-[22px] px-0 overflow-visible mx-4 text-defaultText font-bold capitalize leading-[44px] relative mr-14 flex ${
        className && className
      }`}
    >
      <img src="/imgs/img-job-hot.png" alt="" className="auto mr-2" />
      <div className="relative pb-2 after:absolute after:left-0 after:bottom-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-[#D14B00] after:to-[#F89E1B]">
        {title}
      </div>
    </div>
  );
};
