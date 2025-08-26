"use client";

import { useState } from "react";
import { Package, Plus, Edit, Trash2, X } from "lucide-react";
import ModalContainer from "@/app/components/modal-container";
import AddProductForm from "@/app/components/products/add-product-form";
import useAuth from "@/hooks/auth";
import { useProducts } from "@/hooks/products";
import ProductItem from "@/app/components/products/product-item";
import EditProductForm from "@/app/components/products/edit-product-form";

const StockPage = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const {data: user} = useAuth();
  const {data} = useProducts(user?.businessId || "");
  
  const stock = data?.data || [];


  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
          <Package className="w-7 h-7 text-blue-500" />
          Gestion de Stock
        </h1>
        <button onClick={()=>setShowAddProductModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" /> Ajouter Produit
        </button>
      </div>
     
       {showAddProductModal &&(
                            <ModalContainer>

        <div className="flex w-4/5 md:w-3/5 justify-center items-center p-10 bg-white rounded-lg shadow-lg relative">
                    <span className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 absolute top-2 right-2 cursor-pointer">
                            <X size={16} onClick={() => setShowAddProductModal(false)} />
                        </span>
                    
                   <AddProductForm />
                  

                </div>
                 </ModalContainer>
            
       )  }

        
  

      {/* Stock Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <h2 className="text-gray-500 text-lg">Total Produits</h2>
          <p className="text-3xl font-bold">{stock.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <h2 className="text-gray-500 text-lg">Produits en Stock</h2>
          <p className="text-3xl font-bold text-green-600">
            {stock?.filter((item) => item.quantity > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <h2 className="text-gray-500 text-lg">Ruptures de Stock</h2>
          <p className="text-3xl font-bold text-red-600">
            {stock.filter((item) => item.quantity === 0).length}
          </p>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Liste des Produits</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-gray-100 ">
                <th className="p-3 text-left rounded-l">Produit</th>
                <th className="p-3 text-center  ">Quantité</th>
                <th className="p-3 text-center ">Prix (MAD)</th>
                <th className="p-3 text-center">Statut</th>
                <th className="p-3 text-center rounded-r">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <ProductItem item={item} key={item.id}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
