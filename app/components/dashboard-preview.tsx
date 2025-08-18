import { LineChart, BarChart, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import Image from 'next/image';

const DashboardPreview = () => {
  // Données fictives pour les graphiques
  const salesData = [
    { month: 'Jan', sales: 35000 },
    { month: 'Fév', sales: 42000 },
    { month: 'Mar', sales: 51000 },
    { month: 'Avr', sales: 38000 },
    { month: 'Mai', sales: 47000 },
    { month: 'Juin', sales: 59000 },
  ];

  const stockData = [
    { product: 'Produit A', stock: 45 },
    { product: 'Produit B', stock: 32 },
    { product: 'Produit C', stock: 18 },
    { product: 'Produit D', stock: 5 },
  ];

  return (
    <div className="p-6 bg-gray-50 h-[400px] max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>
        <div className="text-sm text-gray-500">Mis à jour à {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<DollarSign className="w-5 h-5" />}
          title="Chiffre d'Affaires"
          value="58,400 MAD"
          change="+12% vs mois dernier"
          positive
        />
        <StatCard 
          icon={<ShoppingCart className="w-5 h-5" />}
          title="Commandes"
          value="124"
          change="+8% vs mois dernier"
          positive
        />
        <StatCard 
          icon={<Users className="w-5 h-5" />}
          title="Nouveaux Clients"
          value="23"
          change="-5% vs mois dernier"
          positive={false}
        />
        <StatCard 
          icon={<Package className="w-5 h-5" />}
          title="Alertes Stock"
          value="3 produits"
          change="Niveau critique"
          positive={false}
        />
      </div>

      {/* Graphiques et image placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Ventes mensuelles</h2>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <Image 
              src="/placeholder-sales-chart.svg" 
              alt="Graphique des ventes" 
              width={500}
              height={250}
              className="object-contain"
            />
            {/* <LineChart data={salesData} /> */}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Niveaux de stock</h2>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <Image 
              src="/placeholder-stock-chart.svg" 
              alt="Graphique des stocks" 
              width={300}
              height={250}
              className="object-contain"
            />
            {/* <BarChart data={stockData} /> */}
          </div>
        </div>
      </div>

      {/* Liste des produits en rupture */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Produits à réapprovisionner</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seuil</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fournisseur</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">Produit D</td>
                <td className="px-4 py-3 whitespace-nowrap text-red-600 font-medium">5</td>
                <td className="px-4 py-3 whitespace-nowrap">15</td>
                <td className="px-4 py-3 whitespace-nowrap">Fournisseur Maroc</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">Produit F</td>
                <td className="px-4 py-3 whitespace-nowrap text-yellow-600 font-medium">8</td>
                <td className="px-4 py-3 whitespace-nowrap">20</td>
                <td className="px-4 py-3 whitespace-nowrap">Import Allemagne</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant de carte statistique réutilisable
const StatCard = ({ icon, title, value, change, positive }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  change: string, 
  positive: boolean 
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className={`mt-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  </div>
);

export default DashboardPreview;