import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    // 1:38:48
    const {data, error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chat!",
        html: createWelcomeEmailTemplate(name, clientURL),
    });
    if (error) {
        console.error("Error sending welcome email:", error);
        throw error;    
    }
}