"use client";
import { registerUser } from "@/app/actions/users.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const RegisterForm = () => {

    const inputClass = " w-full p-2 border border-gray-300 rounded-md";

    const mutation = useMutation({
        mutationFn:registerUser,
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
       
    }
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        {mutation.error && <p className="text-red-500">{mutation.error.message}</p>}
    
         <input className={inputClass} type="text" name="name" placeholder="Nom" />
        <input className={inputClass} type="email" name="email" placeholder="Email" />
        <input className={inputClass} type="password" name="password" placeholder="Mot de passe" />
        <input className={inputClass} type="password" name="confirmPassword" placeholder= "Confirmer Mot de passe" />

        <button disabled={mutation.isPending} className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition text-white py-2 px-4 rounded-md" type="submit"> { mutation.isPending ? "Inscription..." : "S'inscrire"    }</button>

    </form>
  )
}
