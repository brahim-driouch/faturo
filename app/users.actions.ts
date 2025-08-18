"use server";
import { prisma } from "@/config/db";
import { IResponse, newUserSchema, userSchama } from "@/types";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs"
import generateVerificationCode from "@/lib/generateVerificationCode";
import { sendEmail } from "@/lib/sendEmail";


export async function registerUser(formData: FormData){ 
    

    try {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        const validationResult = await newUserSchema.safeParseAsync({name, email, password, confirmPassword})

        if(!validationResult.success){
            return {
                message: validationResult.error.issues[0].message,
                status:"error",
                data: null
            }
        }

        // check if user exists

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(existingUser){
            return {
                message:"Cet utilisateur existe deja, veuillez vous connecter",
                status:"error",
                data: null
            }
        }

   const hashedPassword = await bcryptjs.hash(password, 10)
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        })

        const  verifcationCode = generateVerificationCode();
    const emailData = {
        subject:"Confirmation de compteFATURIO",
        htmlContent:`<h1>Confirmation de compte</h1>
                     <p>Merci de vous connecter sur FATURIO et de confirmer votre compte en saisissant le code suivant : ${verifcationCode}</p>
        `,
        to:[{email,name}],
        sender:{email:"fXc8o@example.com",name:"FATURIO"}
    }
     await sendEmail(emailData)
        return {
            message:"Utilisateur enregistré,email envoyé",
            status:"success",
            data: null
        }


        
    } catch (error) {
        console.log(error);
        return {
            message:"Une erreur s'est produite",
            status:"error",
            data: null
        }
    }
}