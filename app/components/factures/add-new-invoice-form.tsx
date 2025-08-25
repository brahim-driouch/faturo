"use client";

import { X } from "lucide-react";



type NewInvoiceFormProps =  {
     addInvoiceModal:boolean,
     setAddInvoiceModal:(state:boolean)=>void
}

const AddNewInvoiceForm= ({addInvoiceModal,setAddInvoiceModal}:NewInvoiceFormProps) => {
  return (
    <div>

        {addInvoiceModal && (
          <div className="min-h-screen w-full fixed top-0 left-0 bg-black/50 flex justify-center items-center">
            <form className="w-full md:w-3/5  bg-white relative z-10 p-10 rounded">
            
               <span onClick={()=>setAddInvoiceModal(!addInvoiceModal)} className="p-2 rounded-xl border border-red-500 absolute top-0 right-0">
              <X size={16} className="text-red-500"/>
             </span>
             
            </form>
          </div>
        )}
    </div>
  )
}

export default AddNewInvoiceForm