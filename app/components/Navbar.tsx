// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <a href="#features" className="hover:text-blue-400 transition">
            Fonctionnalités
          </a>
        </li>
        <li>
          <a href="#dashboard" className="hover:text-blue-400 transition">
            Tableau de bord
          </a>
        </li>
        <li>
          <a href="#testimonials" className="hover:text-blue-400 transition">
            Témoignages
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
