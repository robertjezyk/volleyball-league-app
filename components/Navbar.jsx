"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({ links }) => {
  const pathname = usePathname();

  return (
    <nav className="bg-base-300 py-4">
      <div className="navbar px-8 max-w-6xl mx-auto flex-col sm:flex-row">
        <Link href="/" className="btn btn-primary">
          League
        </Link>
        <ul className="menu menu-horizontal md:ml-8">
          {links.map((link) => (
            <li key={link.url} className="mr-2">
              <Link
                href={link.url}
                className={`capitalize ${
                  pathname.includes(link.url) ? "active" : ""
                }`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
