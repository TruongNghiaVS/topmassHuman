import Link from "next/link";

export interface IService {
  img: string;
  title: string;
  slug: string;
}

export interface IServiceProps {
  item: IService;
  slug: string;
}

export const Services = ({ item, slug }: IServiceProps) => {
  return (
    <div className="rounded bg-white overflow-hidden">
      <Link href={`/dich-vu/${slug}/${item.slug}`}>
        <img src={`/imgs/${item.img}`} alt="" className="w-full" />
      </Link>
      <Link href={`/dich-vu/${slug}/${item.slug}`}>
        <div className="m-5 text-lg font-semibold line-clamp-3">
          {item.title}
        </div>
      </Link>
    </div>
  );
};
