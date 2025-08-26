
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

export const loginSchema = userSchama.pick({email: true, password: true})




export const businessSchema = z.object({
    id:z.number().optional(),
    businessName:z.string().min(2,{message:" Veuillez entrer le nom de votre entreprise."}),
    businessPhoneNums:z.array(z.string()).optional(),
    businessAddress:z.string().min(2,{message:" Veuillez entrer l'adresse de votre entreprise."}),
    businessEmails:z.array(z.email({message:" Veuillez entrer un email valide."})),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional(),
    businessLegalId:z.string().optional(),
    user:z.string().optional(),
    businessDomainId:z.number().positive()
})


export const productcategorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(4, { message: "Merci de renseigner votre nom" }),
    businessId: z.number().positive().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export type ProductCategoryType = z.infer<typeof productcategorySchema>;


export const productSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(4, { message: "Merci de renseigner le nom du produit" }),
    description: z.string().optional(),
    price: z.number().positive({ message: "Le prix doit être un nombre positif" }),
    costPrice: z.number().positive({ message: "Le prix de revient doit être un nombre positif" }),
    categoryId: z.number().int().positive().nullable().optional(),
    businessId: z.number().positive(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    sku: z.string().optional(),
    quantity: z.number().positive({ message: "La quantité doit être un nombre positif" }),
    minQuantity: z.number().positive({ message: "La quantité minimale doit être un nombre positif" }).nullable().optional(),
    unit: z.string().optional(),
    isActive: z.boolean().default(true),
});
export type ProductType = z.infer<typeof productSchema>;
export type WithRelation<T, R extends Record<string, any>> = T & R;
export type ProductWithCategory = WithRelation<ProductType, { category: ProductCategoryType | null }>;

