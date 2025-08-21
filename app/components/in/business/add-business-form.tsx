"use client";
import { createBusiness } from "@/app/actions/business.actions";
import { BUSINESS_DOMAINS_ISIC } from "@/assets/business-domains"
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react"
import { toast } from "sonner";



const AddBusinessForm = () => {
    const inputClass = "w-full p-2 border border-gray-400 rounded"
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);


    const mutation = useMutation({
        mutationFn:createBusiness,
        onSuccess: (data) => {
            if(data.status === "success"){
                toast.success(data.message);
            }else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.message ?? "Une erreur s'est produite");
        }
    })
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      const formdata = new FormData(e.currentTarget)  
     formdata.set("businessDomainId", selectedDomain || "");

     if(!formdata.get("businessDomainId")){
       toast.error("Veuillez choisir le secteur d'activité de votre entreprise");
       return;
     }
     
      mutation.mutate(formdata);
    


    }
  return (
    <div className="w-full flex flex-col justify-start space-y-4 items-center ">
       <h1 className="text-2xl font-bold "> Ajouter les informations de votre entreprise </h1>
      <div className="w-full max-w-2xl mt-6">
         <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
           <input placeholder="Nom de l'entreprise" name="businessName" type="text" className={inputClass} />
           <input placeholder="Numéro de telephone" name="businessPhoneNums" type="text" className={inputClass} />
           <input placeholder="Email de l'entreprise" name="businessEmails" type="email" className={inputClass} />
           <input placeholder="Adresse de l'entreprise" name="businessAddress" type="text" className={inputClass} />
           <input placeholder="Numéro de la patente" name="businessLegalId" type="text" className={inputClass} />
           <input placeholder="Site web de l'entreprise" name="businessWebsite" type="text" className={inputClass} />
           <select onChange={(e) => setSelectedDomain(e.target.value)}   name="businessDomainId" className={inputClass}>
               <option disabled   >-- Secteur d'activité --</option>
               {
                   BUSINESS_DOMAINS_ISIC.map((domain) => <option key={domain.id} value={domain.id}>{domain.libelle}</option>)
               }
               <option>
                   Autre
               </option>
           </select>
           <input type="submit" value={"Enregistrer"} className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded cursor-pointer" />

       </form>
      </div>
    </div>
  )
}

export default AddBusinessForm