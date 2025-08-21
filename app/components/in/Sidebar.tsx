"use client";

import useAuth from "@/hooks/auth";
import { Receipt } from "lucide-react";
import Link from "next/link";


const Sidebar = () => {
    const {data:user, isLoading} =useAuth()
    if(isLoading) return null

  return (
    <aside className="w-1/4 h-screen bg-gray-800 text-white p-4 rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-400">Bonjour, {user?.name}</h1>
      <ul className="w-full flex flex-col space-y-4">
        <li className="w-full">
           <Link className="flex space-x-4 items-center text-xl text-gray-400" href={'/factures'}><Receipt/><span>Factures</span> </Link>
        </li>
        <li>Stocks</li>
        <li>Item 3</li>
      </ul>
    </aside>
  )
}

export default Sidebar