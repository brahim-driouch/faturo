import { useState } from "react";
import AddProductCategoryForm from "./add-product-category-form"
import ModalContainer from "../modal-container";
import { X } from "lucide-react";
import { ProductCategoriesList } from "./product-categories-list";




const ProductCategories = () => {
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
  return (
    <div>
          <h2 className="text-lg font-semibold text-gray-700">Catégories</h2>
          <p className="text-gray-500 text-sm mb-4">
            Gérez les catégories de produits.
          </p>

          {addCategoryModal && (
            <ModalContainer>
                <div className="flex w-full md:w-2/5 justify-center items-center p-10 bg-white rounded-lg shadow-lg relative">
                    <span className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 absolute top-2 right-2 cursor-pointer">
                            <X size={16} onClick={() => setAddCategoryModal(false)} />
                        </span>
                    
                   <AddProductCategoryForm />

                </div>
            </ModalContainer>
          )}
           <button onClick={() => setAddCategoryModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4">
              Créer une catégorie
            </button>
          <button onClick={() => setShowCategories(!showCategories)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              Voir les catégories
            </button>
          {showCategories && (
             <ModalContainer>
                              <div className="flex w-full md:w-2/5 justify-center items-center p-10 bg-white rounded-lg shadow-lg relative">
  <span className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 absolute top-2 right-2 cursor-pointer">
                            <X size={16} onClick={() => setShowCategories(false)} />
                        </span>
                <ProductCategoriesList />
                            </div>

             </ModalContainer>
          )}
    </div>
  )
}

export default ProductCategories