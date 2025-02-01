// src/app/api/login/route.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await db.select().from(users).where(eq(users.email, email)).get();
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    };

    if (!user.isVerified) {
        return new Response(
            JSON.stringify({ error: "Email not verified. Please verify your email." }),
            { status: 401 }
        );
    };

    if (!(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    };

    const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "30d" }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
};