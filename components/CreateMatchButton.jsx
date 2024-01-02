"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

export const CreateMatchButton = () => {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/create-match`}
      className="btn btn-square btn-accent"
    >
      <IoMdAdd />
    </Link>
  );
};
