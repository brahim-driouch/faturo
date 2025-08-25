"use client";
import useAuth from "@/hooks/auth";
import { useCategories } from "@/hooks/categories";
import { Trash2 } from "lucide-react";

   








export const ProductCategoriesList = () => {
const {data:user,isLoading} = useAuth();
const {data} = useCategories(user?.businessId || "");

const productCategories = data?.data || [];


if(isLoading) return null;
   
   return (
    <ul className="w-full space-y-3 bg-white   p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Liste des catégories</h1>
      {productCategories && productCategories.length > 0 ? (
        productCategories.map((category) => (
          <li key={category.id}>
            <div className="group flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:shadow-sm transition-all duration-200">
              {/* Category Name */}
              <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                {category.name}
              </span>

              {/* Delete Button */}
              <button
                className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition-all duration-200"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </button>
            </div>
          </li>
        ))
      ) : (
        <li className="text-center text-gray-400 text-sm py-4">
          Aucune catégorie trouvée
        </li>
      )}
    </ul>
  );
}

