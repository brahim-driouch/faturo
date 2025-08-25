"use client";
import { useState } from "react";
import { CheckCircle, Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/app/actions/product.actions";
import { toast } from "sonner";
import { useCategories } from "@/hooks/categories";
import useAuth from "@/hooks/auth";

export default function AddProductFormTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const {data:user} =useAuth()
  const {data}= useCategories(user?.businessId || "");

 const categoryOptions = data?.data || [];

  const tabs = [
    { id: 0, label: "Champs obligatoires", icon: CheckCircle },
    { id: 1, label: "Champs facultatifs", icon: Info },
  ];

  const goNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ⬅️ Prevent accidental submit
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ⬅️ Prevent accidental submit
    setActiveTab((prev) => Math.max(prev - 1, 0));
  };

  // add product mutation
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(data.message ?? "Produit ajouté avec succès !");
        setActiveTab(0);
      } else {
        toast.error(data.message ?? "Erreur lors de l'ajout du produit");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast.error("Erreur lors de l'ajout du produit");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    await mutation.mutateAsync(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        // ⬅️ Prevent Enter from submitting unless we're on the last step
        if (e.key === "Enter" && activeTab === 0) {
          e.preventDefault();
        }
      }}
      className="w-full p-6"
    >
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.preventDefault(); // ⬅️ Prevent accidental submit
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form with Slide Animation */}
      <div className="relative overflow-hidden py-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeTab * 100}%)`,
          }}
        >
          {/* Step 1: Required fields */}
          <div className="w-full flex-shrink-0 px-2 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom du produit"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="price"
              placeholder="Prix du produit"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="costPrice"
              placeholder="Prix de revient"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantité"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="isActive"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
          </div>

          {/* Step 2: Optional fields */}
          <div className="w-full flex-shrink-0 px-2 space-y-4">
            <input
              type="text"
              name="description"
              placeholder="Description du produit"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="categoryId"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option disabled value="">Sélectionner une catégorie</option>
              {categoryOptions?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="sku"
              placeholder="Code SKU"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="minQuantity"
              placeholder="Quantité minimale pour alerte"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="unit"
              placeholder="Unité (kg, pcs, etc.)"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {activeTab > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Précédent
          </button>
        )}

        {activeTab === 0 ? (
          <button
            type="button"
            onClick={goNext}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg outline-none hover:bg-blue-700 transition"
          >
            Ajouter le produit
          </button>
        )}
      </div>
    </form>
  );
}
