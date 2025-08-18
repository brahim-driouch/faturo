import Image from "next/image";
import Hero from "./components/Hero";
import FeaturesSection from "./components/Functionalities";
import DashboardPreview from "./components/dashboard-preview";

const features = [
  {
    title: "Créer des factures",
    description: "Générez des factures rapidement et facilement avec vos informations et logo.",
    icon: "/icons/invoice.svg",
  },
  {
    title: "Gérer votre inventaire",
    description: "Suivez vos stocks, alertes de rupture et catégories de produits.",
    icon: "/icons/inventory.svg",
  },
  {
    title: "Envoyer par email",
    description: "Envoyez vos factures par email en PDF directement à vos clients.",
    icon: "/icons/email.svg",
  },
  {
    title: "Tableau de bord",
    description: "Analysez vos ventes, factures et revenus en temps réel.",
    icon: "/icons/dashboard.svg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-800 ">

     

      {/* Hero Section */}
     <Hero/>

      {/* Features Section */}
     <FeaturesSection/>
  <DashboardPreview/>
      {/* Dashboard Preview */}
      <section id="dashboard" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-8">Tableau de bord en temps réel</h2>
          <p className="mb-6">Visualisez vos ventes, factures et inventaire d’un seul coup d'œil.</p>
          <Image
            src="/images/dashboard.png"
            alt="Dashboard preview"
            width={1000}
            height={600}
            className="mx-auto rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">Ce que nos utilisateurs disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-6 rounded-xl shadow-md">
              <p>"Facturo a simplifié la gestion de mes factures et de mon stock !"</p>
              <span className="block mt-4 font-bold">– Youssef</span>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl shadow-md">
              <p>"Enfin un outil simple et clair pour les petites entreprises au Maroc."</p>
              <span className="block mt-4 font-bold">– Sara</span>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl shadow-md">
              <p>"L’interface est très intuitive et j’adore le tableau de bord."</p>
              <span className="block mt-4 font-bold">– Amal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      

    </div>
  );
}
