import { authLinks } from "@/navlinks/authLinks"

const Navbar = () => {
        const isConnected = false

  return (
   <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:text-blue-400 transition">Fonctionnalités</a></li>
              <li><a href="#dashboard" className="hover:text-blue-400 transition">Tableau de bord</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
              {!isConnected && (
               <>
                 {authLinks.map((link, i) => (
                   <li key={i}>
                     <a href={link.href} className={`${link.title === "Connexion" ? "bg-black text-white px-4 py-2 rounded hover:bg-gray-800" : link.title === "Inscription" ? "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" : "hover:text-blue-400 transition"} font-medium`}>
                       {link.title}
                     </a>
                   </li>
                 ))}
               </>
              )
              }
            </ul>
          </nav>
  )
}

export default Navbar