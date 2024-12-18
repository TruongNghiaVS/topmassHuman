"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePopupLevelStore } from "@/store-zustand/useModalStore";

interface VerifiedLinkProps {
  href: string;
  currentUser: any;
  verify_level: number; // URL to navigate to if verification fails
  children: ReactNode;
}

const VerifiedLink: React.FC<VerifiedLinkProps> = ({
  href,
  currentUser,
  verify_level,
  children,
}) => {
  const router = useRouter();
  const { openModal } = usePopupLevelStore();

  const handleClick = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentUser?.level < verify_level) {
      openModal();
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default VerifiedLink;
