

import { IResponse } from "@/types";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import { da } from "zod/locales";


interface IEmailProps {
    subject: string;
    htmlContent: string;
    sender: {
        name: string;
        email: string;
    };
    to: {
        email: string;
        name: string;
    }[];

}

let emailAPI = new TransactionalEmailsApi();
//@ts-ignore
emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY as string;

export async function sendEmail(data:IEmailProps ):Promise<IResponse<string>> {
    try {
        const message = new SendSmtpEmail();
                message.subject = data.subject;
                message.htmlContent = data.htmlContent;
                message.sender = { name:data.sender.name, email:data.sender.email};
                message.to = [...data.to];

                await emailAPI.sendTransacEmail(message);
                                console.log("Email envoyé")

                return {
                    status:"success",
                    message:"Email envoyé",
                    data:""
                }
    } catch (error) {
        console.error(error);
        return {
            status:"error",
            message:"Une erreur s'est produite lors de l'envoi de l'email",
            data:""
        }
    }
}