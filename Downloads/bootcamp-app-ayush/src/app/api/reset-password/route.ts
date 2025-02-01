// src/app/api/reset-password/route.ts
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const { token, newPassword } = await req.json();

    // Find user by reset token
    const user = await db.select().from(users).where(eq(users.resetToken, token)).get();
    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and remove reset token
    await db
        .update(users)
        .set({ password: hashedPassword, resetToken: null })
        .where(eq(users.id, user.id));

    return new Response(
        JSON.stringify({ message: "Password reset successful. You can now log in." }),
        { status: 200 }
    );
}
