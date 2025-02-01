// src/app/api/verify-email/route.ts
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
        return new Response(JSON.stringify({ error: "Invalid or missing token" }), { status: 400 });
    }

    const user = await db
        .select()
        .from(users)
        .where(eq(users.verificationToken, token))
        .get();

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
    }

    // Mark the user as verified and clear the token
    await db
        .update(users)
        .set({ isVerified: 1, verificationToken: null })
        .where(eq(users.id, user.id));

    return new Response(
        JSON.stringify({ message: "Email verified successfully. You can now log in." }),
        { status: 200 }
    );
}
