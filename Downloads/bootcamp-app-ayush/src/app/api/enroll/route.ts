// scr/api/enroll/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        // Check if user is already enrolled
        const existingEnrollment = await db.select().from(enrollments)
            .where(and(eq(enrollments.userId, decoded.id), eq(enrollments.courseId, courseId)))
            .execute();

        if (existingEnrollment.length > 0) {
            return NextResponse.json({ message: "Already enrolled" }, { status: 200 });
        }

        // Enroll the user
        await db.insert(enrollments).values({ userId: decoded.id, courseId });

        return NextResponse.json({ message: "Enrolled successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error enrolling:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
