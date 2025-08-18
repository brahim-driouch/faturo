import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className=" text-black py-20 px-6 border-t border-gray-200">
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          La solution simple pour les petites entreprises au Maroc
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-500 mb-10">
          Générez et envoyez vos factures en quelques clics, suivez vos paiements et gérez 
          votre stock sans complications. Une plateforme moderne, pensée pour les entrepreneurs marocains.
        </p>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0" />
            <span>Facturation rapide et conforme aux normes marocaines.</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0" />
            <span>Gestion d’inventaire intuitive pour suivre vos produits.</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0" />
            <span>Tableau de bord clair avec statistiques et paiements.</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0" />
            <span>Envoi des factures par e-mail directement depuis l’application.</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition">
            Essayez gratuitement pendant 6 mois
          </button>
        </div>
      </div>
    </section>
  );
}
