"use client"

import AddNewInvoiceForm from "@/app/components/factures/add-new-invoice-form"
import { X } from "lucide-react"
import { useState } from "react"

function InvoicesPage() {
  const [addInvoiceModal,setAddInvoiceModal] =useState(false)
  return (
    <div className="w-full flex flex-col justify-start items-center p-4">
       {/*** ajouter une facture */}
      <div className="w-full flex justify-end items-center">
                <button onClick={()=>setAddInvoiceModal(!addInvoiceModal)} className="px-6 py-2 bg-black text-white hover:bg-gray-800 rounded cursor-pointer">Créer une nouvelle facture</button>

       {addInvoiceModal &&  <AddNewInvoiceForm addInvoiceModal={addInvoiceModal} setAddInvoiceModal={setAddInvoiceModal} />}
      </div>
      
    </div>
  )
}

export default InvoicesPage