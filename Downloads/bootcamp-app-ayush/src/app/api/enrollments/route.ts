// src/app/api/enrollments/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { enrollments, users, courses } from "@/db/schema";
import { eq} from "drizzle-orm";

export async function GET() {
    try {
        const allEnrollments = await db
            .select({
                userName: users.name,
                userEmail: users.email,
                courseTitle: courses.title,
                enrolledAt: enrollments.enrolledAt,
            })
            .from(enrollments)
            .innerJoin(users, eq(enrollments.userId, users.id))
            .innerJoin(courses, eq(enrollments.courseId, courses.id))
            .execute();

        return NextResponse.json(allEnrollments, { status: 200 });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}