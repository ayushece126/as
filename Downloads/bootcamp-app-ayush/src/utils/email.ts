// src/utils/email.ts
import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // email provider
        auth: {
            user: process.env.EMAIL_USER, // host email address
            pass: process.env.EMAIL_PASS, // host app pass
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};