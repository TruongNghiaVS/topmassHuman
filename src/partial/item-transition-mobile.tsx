import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ITransitionMobile {
  title: string;
  children: ReactNode;
}

export const TransitionMobile = ({ title, children }: ITransitionMobile) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
      }
    }, 200);
  }, [isOpen, children]);

  return (
    <div className="mt-2">
      <div className="flex justify-between py-1 items-center">
        <div className="text-white text-base font-medium">{title}</div>
        {isOpen ? (
          <button
            className="flex items-center text-default"
            onClick={() => setIsOpen(false)}
          >
            <ChevronUpIcon className="w-6 text-white mr-2" />
          </button>
        ) : (
          <button
            className="flex items-center text-default"
            onClick={() => setIsOpen(true)}
          >
            <ChevronDownIcon className="w-6 text-white mr-2" />
          </button>
        )}
      </div>
      <div
        className="transition-all duration-400 overflow-hidden "
        style={{ maxHeight: height }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};
