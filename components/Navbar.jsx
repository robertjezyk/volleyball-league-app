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
            <li key={link.id} className="mr-2">
              <Link
                href={`/leagues/${link.id}`}
                className={`capitalize ${
                  pathname === `/leagues/${link.id}` ? "active" : ""
                }`}
              >
                {link.type}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
