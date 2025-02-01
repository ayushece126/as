// src/app/api/forgot-password/route.ts
import { db } from "@/db";
import { users } from "@/db/schema";
import { sendEmail } from "@/utils/email";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const { email } = await req.json();

    // Check if user exists
    const user = await db.select().from(users).where(eq(users.email, email)).get();
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Generate password reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    // Save token to the user record
    await db.update(users).set({ resetToken }).where(eq(users.email, email));

    // Send email with reset link
    await sendEmail(
        email,
        "Password Reset Request",
        `<p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>`
    );

    return new Response(
        JSON.stringify({ message: "Password reset email sent. Please check your inbox." }),
        { status: 200 }
    );
}
