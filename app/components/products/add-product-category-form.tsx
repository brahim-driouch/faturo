"use client";

import { addProductCategory } from "@/app/actions/product.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



const AddProductCategoryForm = () => {




  const mutation = useMutation({
    mutationFn: addProductCategory,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast .success(data.message);
        console.log(data.message);
      } else {
        // Handle error, e.g., show an error message
        console.error(data.message);
      }
    },
    onError: (error:any) => {
      // Handle unexpected errors
      console.error("An unexpected error occurred:", error);
    }
  })


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if( !formData.get("categoryName") || formData.get("categoryName") === "") {
      toast.error("Merci de saisir un nom de catégorie valide.");
      return;
    }
    
    try {
      await mutation.mutateAsync(formData);
      event.currentTarget.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur s'est produite lors de l'ajout de la catégorie.");
    }
  }

  return (
        
          <div className="w-full flex justify-center items-center gap-3">
            
            {/** form to create a category with those fields  name */} 
             <form onSubmit={handleSubmit} className="w-full flex flex-col max-w-md bg-white p-6">
              <h1 className="text-2xl font-bold mb-4">Ajouter une catégorie</h1>
                <div className="w-full mb-4">
                   
                    <input
                    name="categoryName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le nom de la catégorie"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Ajouter
                </button>
             </form>
          
          </div>
  )
}

export default AddProductCategoryForm