// src/app/api/signup/route.ts
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { sendEmail } from '@/utils/email';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
    const { name, email, password, role } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // generate token for email verification
    const verificationToken = randomBytes(32).toString("hex");

    const [newUser] = await db
        .insert(users)
        .values({ name, email, password: hashedPassword, role, verificationToken })
        .returning();

    console.log(newUser);

    // Send verification email
    const verificationLink = `${process.env.APP_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(
        email,
        "Verify Your Email",
        `<p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>`
    );

    // const token = jwt.sign(
    //     { id: newUser.id, email: newUser.email, role: newUser.role },
    //     process.env.JWT_SECRET!,
    //     { expiresIn: "30d" }
    // );

    return new Response(JSON.stringify({ message: "Verification email sent. Please check your inbox." }),
        { status: 201 });
};