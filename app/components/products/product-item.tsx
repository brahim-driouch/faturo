"use client";
import { ProductWithCategory } from "@/types"
import { Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import ModalContainer from "../modal-container";
import EditProductForm from "./edit-product-form";





const ProductItem= ( {item}:{item:ProductWithCategory}) => {
const [showEditProductModal, setShowEditProductModal] = useState(false);
      const itemStatus = (quantity: number, minQuantity: number | null) => {
    if (quantity > (minQuantity || 0)) return "En Stock";
    return "En rupture de stock";
  };
  return (

    <tr
                  
                  className=" border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">{item.price}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.quantity > (item.minQuantity || 0)
                          ? "bg-green-100 text-green-600"
                          : item.quantity <= (item.minQuantity || 0)
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {itemStatus(item.quantity, item.minQuantity || 0)}
                    </span>
                  </td>
                  <td onClick={()=>setShowEditProductModal(true)} className="p-2 flex justify-center gap-3">
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg">
                      <Edit className="w-3 h-3 text-blue-600" />
                    </button>
                    <button className="p-2 bg-red-100 hover:bg-red-200 rounded-lg">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </button>
                  </td>
                  
                
                </tr>
             
                
  )
}

export default ProductItem