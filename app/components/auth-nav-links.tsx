"use client";

import useAuth from "@/hooks/auth";
import Link from "next/link";
import { authLinks } from "@/navlinks/authLinks";

const AuthNavLinks = () => {
  const { data: user, isLoading } = useAuth();

  return (
    <>
      {authLinks.map((link) => (
        <li key={link.title}>
          {isLoading ? (
            // Skeleton placeholder while loading
            <div className="px-4  rounded font-medium shadow-md bg-gray-300 opacity-0 select-none">
              {link.title}
            </div>
          ) : !user ? (
            <Link
              href={link.href}
              className={`px-4 py-2 rounded font-medium shadow-md transition-all duration-200
                ${link.title === "Connexion"
                  ? " bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  : " border border-black text-black hover:bg-gray-800 focus:ring-2 focus:ring-gray-600"
                }`}
            >
              {link.title}
            </Link>
          ) : (
            // Invisible placeholder if logged in to preserve layout
            <div className="px-4 py-2 rounded font-medium shadow-md opacity-0 select-none">
              {link.title}
            </div>
          )}
        </li>
      ))}
    </>
  );
};

export default AuthNavLinks;
