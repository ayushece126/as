// src/app/api/enrollments/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/db";
import { enrollments, courses } from "@/db/schema";
import { eq} from "drizzle-orm";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const studentEnrollments = await db
            .select({
                courseId: courses.id,
                courseTitle: courses.title,
                enrolledAt: enrollments.enrolledAt,
            })
            .from(enrollments)
            .innerJoin(courses, eq(enrollments.courseId, courses.id))
            .where(eq(enrollments.userId, decoded.id))
            .execute();

        return NextResponse.json(studentEnrollments, { status: 200 });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}