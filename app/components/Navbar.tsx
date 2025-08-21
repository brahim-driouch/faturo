// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-2">
      <ul className="flex items-center space-x-4">
        <li> 
          <Link href={'#'}  className="hover:text-blue-400 transition">
            Fonctionnalités
          </Link>
        </li>
        <li>
          <Link href={'#'}  className="hover:text-blue-400 transition">
            Tableau de bord
          </Link>
        </li>
        <li>
          <Link href={'#'} className="hover:text-blue-400 transition">
            Témoignages
          </Link>
        </li>
        <li>
          <Link href={'#'} className="hover:text-blue-400 transition">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
