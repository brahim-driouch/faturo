// components/Header.tsx
import Image from "next/image";
import Navbar from "./Navbar";
import AuthNavLinks from "./auth-nav-links";
import Link from "next/link";

const Header = () => {
  return (
    <header className="text-black px-4 md:px-20 py-4">
      <div className="mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image src="/images/logo.svg" alt="Logo" width={150} height={100} />
          </Link>
         
        </div>
         <Navbar />
        <ul className="flex space-x-4">
          <AuthNavLinks />
        </ul>
      </div>
    </header>
  );
};

export default Header;
