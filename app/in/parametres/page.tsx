
"use client";
import ProductCategories from "@/app/components/products/categories";
import { useState } from "react";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("MAD");
  const [language, setLanguage] = useState("fr");

  return (
    <div className="min-h-screen w-full p-6">
      <div className="max-w-6xl mx-auto   p-6 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Paramètres</h1>

        {/* Section 1: Catégories */}
       <ProductCategories />
        <hr className="text-gray-300" />

        {/* Section 2: Devise */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Devise par défaut</h2>
          <p className="text-gray-500 text-sm mb-4">
            Sélectionnez la devise utilisée pour les produits.
          </p>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-60 p-2 border border-gray-300 rounded-lg"
          >
            <option value="MAD">Dirham Marocain (MAD)</option>
            <option value="USD">Dollar Américain (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>
        <hr className="text-gray-300" />

        {/* Section 3: Langue */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Langue</h2>
          <p className="text-gray-500 text-sm mb-4">
            Choisissez la langue par défaut de l'application.
          </p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-60 p-2 border border-gray-300 rounded-lg"
          >
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <hr className="text-gray-300" />

        {/* Section 4: Sécurité */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Sécurité</h2>
          <p className="text-gray-500 text-sm mb-4">
            Gérez les paramètres de sécurité du compte.
          </p>
          <div className="flex flex-col gap-3">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
              Modifier le mot de passe
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              Activer l’authentification 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
