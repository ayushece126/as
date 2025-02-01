// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { insertCourse, insertChapter, insertSection, insertContentBlock, getAllBootcamps } from "./helper";

export async function POST(req: NextRequest) {
    // Get the Authorization header
    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader);

    // Check if the token exists and is valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log("Decoded User:", decoded);

        // Check if the user is an admin
        if (decoded.role !== "admin") {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        const { title, description, chapters } = await req.json();

        // Insert the course and get its ID
        const courseId = await insertCourse({ title, description, createdBy: decoded.id });

        // Insert chapters, sections, and content blocks
        for (const chapter of chapters) {
            const chapterId = await insertChapter({
                title: chapter.title,
                overview: chapter.overview,
                courseId,
            });

            for (const section of chapter.sections) {
                const sectionId = await insertSection({
                    title: section.title,
                    chapterId,
                });

                for (const contentBlock of section.content) {
                    await insertContentBlock({
                        sectionId,
                        type: contentBlock.type,
                        title: contentBlock.title,
                        text: contentBlock.text || null,
                        items: contentBlock.items || null,
                        language: contentBlock.language || null,
                        code: contentBlock.code || null,
                    });
                }
            }
        }

        return NextResponse.json({ message: "Course created successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error creating course:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export async function GET() {
    try {
        const bootcamps = await getAllBootcamps();
        return NextResponse.json(bootcamps, { status: 200 });
    } catch (error) {
        console.error("Error fetching bootcamps:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


