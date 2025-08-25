"use client";

import useAuth from "@/hooks/auth";
import { Receipt, Package, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { data: user, isLoading } = useAuth();
  const pathname = usePathname();

 

  const navItems = [
    { name: "Factures", href: "/in/factures", icon: Receipt },
    { name: "Stocks", href: "/in/stock", icon: Package },
    { name: "Paramètres", href: "/in/parametres", icon: Settings },
  ];

  return (
    <aside className="h-screen w-1/4 bg-gray-900 text-gray-200 flex flex-col shadow-xl border-r border-gray-700 sticky top-0 ">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              Bonjour, {user?.name?.split(" ")[0] || "Utilisateur"}
            </h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        © {new Date().getFullYear()} Facturo
      </div>
    </aside>
  );
};

export default Sidebar;
