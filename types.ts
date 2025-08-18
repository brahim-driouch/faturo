
import * as z from "zod"


export interface IResponse<T>  {
    message: string;
    status:"success" | "error";
    data: T | null
}

export const userSchama = z.object({
    id: z.string().optional(),
    name: z.string().min(4,{message:"Merci de renseigner votre nom"}),
    email: z.email({message:"Merci de renseigner votre email"}),
    password: z.string().min(8,{message:"Le mot de passe doit contenir au moins 8 caractères"}),
    businessId: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export const newUserSchema = userSchama.extend({confirmPassword: z.string()}).superRefine((data,ctx)=>{
    if(data.password !== data.confirmPassword){
        ctx.addIssue({code:"custom", message:"Les mots de passe ne correspondent pas"})
    }
})
export const businessSchema = z.object({
    id: z.number().optional(),
    businessName: z.string().min(1,{message:"Merci de renseigner le nom de votre entreprise"}),
    businessPhoneNums: z.array(z.string()).optional(),
    businessEmails: z.array(z.string()).optional(),
    busiessAdress: z.string().min(4,{message:"Merci de renseigner l'adresse de votre entreprise"}),
})