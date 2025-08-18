import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Users, 
  FileText, 
  PieChart, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      title: "Facturation Professionnelle",
      description: "Créez des factures personnalisables avec TVA marocaine, envoyez-les par email/SMS et gérez les paiements (espèces, virement, mobile money).",
      highlights: [
        "Conforme à la réglementation marocaine",
        "Modèles bilingues (FR/AR)",
        "Suivi des impayés"
      ]
    },
    {
      icon: <Package className="w-6 h-6 text-green-600" />,
      title: "Gestion de Stock",
      description: "Contrôle complet de votre inventaire avec alertes intelligentes et gestion multi-dépôts.",
      highlights: [
        "Alertes de rupture de stock",
        "Gestion des fournisseurs",
        "Inventaire mobile"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      title: "Analytics & Reporting",
      description: "Tableau de bord complet avec indicateurs clés pour votre entreprise.",
      highlights: [
        "CA par période/produit",
        "Marges bénéficiaires",
        "Export Excel/PDF"
      ]
    },
    {
      icon: <Smartphone className="w-6 h-6 text-orange-600" />,
      title: "Mobile Friendly",
      description: "Accédez à votre application depuis n'importe quel appareil, même hors ligne.",
      highlights: [
        "PWA installable",
        "Sync. automatique",
        "Notifications push"
      ]
    }
  ];

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Tout ce dont votre entreprise a besoin
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
            Une solution complète adaptée aux PME marocaines
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-center text-gray-500">
                  {feature.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                      <span className="ml-2 text-sm text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Essai gratuit de 6 mois
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Aucune carte de crédit requise
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;