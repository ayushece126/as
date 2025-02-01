// src/app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteCourse } from "../helper";
import { db } from "@/db";
import { courses, chapters, sections, contentBlocks, enrollments } from "@/db/schema";
import jwt, { JwtPayload } from "jsonwebtoken";
import { eq, and } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const bootcampId = url.pathname.split("/").pop();

    if (!bootcampId) {
        return NextResponse.json({ error: "Bootcamp ID is required" }, { status: 400 });
    }

    try {
        await deleteCourse(bootcampId);
        return NextResponse.json({ message: "Bootcamp deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting bootcamp:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const courseId = url.pathname.split("/").pop();

    if (!courseId) {
        return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    let userId: number | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            userId = decoded.id;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    const bootcamp = await db.select().from(courses).where(eq(courses.id, Number(courseId))).execute();
    if (!bootcamp.length) {
        return NextResponse.json({ error: "Bootcamp not found" }, { status: 404 });
    }

    if (!userId) {
        return NextResponse.json(bootcamp[0], { status: 200 });
    }

    const enrollment = await db.select().from(enrollments)
        .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, Number(courseId))))
        .execute();

    if (enrollment.length === 0) {
        return NextResponse.json(bootcamp[0], { status: 200 });
    }

    const chaptersData = await db.select().from(chapters).where(eq(chapters.courseId, Number(courseId))).execute();
    const sectionsData = await db.select().from(sections).execute();
    const contentBlocksData = await db.select().from(contentBlocks).execute();

    const fullBootcamp = {
        ...bootcamp[0],
        chapters: chaptersData.map((chapter) => ({
            ...chapter,
            sections: sectionsData
                .filter((s) => s.chapterId === chapter.id)
                .map((section) => ({
                    ...section,
                    contentBlocks: contentBlocksData.filter((c) => c.sectionId === section.id),
                })),
        })),
    };

    return NextResponse.json(fullBootcamp, { status: 200 });
}