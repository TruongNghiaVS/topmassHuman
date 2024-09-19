"use client";
import Link from "next/link";
import { MouseEvent } from "react";

const CustomLink = () => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Prevent the default behavior of Link navigation
    e.preventDefault();

    // Log your data here
    console.log("Link clicked! Logging some data...");

    // Open the link in a new tab
    window.open("https://example.com", "_blank", "noopener,noreferrer");
  };

  return (
    <Link href="https://example.com" legacyBehavior>
      <a onClick={handleClick} className="text-blue-500 hover:underline">
        Open Link and Log Data
      </a>
    </Link>
  );
};

export default CustomLink;
