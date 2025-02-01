// src/app/api/courses/helper.ts
import { db } from "@/db";
import { courses, chapters, sections, contentBlocks } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function insertCourse(data: { title: string; description: string; createdBy: number }) {
    const [course] = await db.insert(courses).values(data).returning({id:courses.id});
    if (!course?.id) throw new Error("Failed to insert course");
    return course.id;
}

export async function insertChapter(data: { title: string; overview: string; courseId: number }) {
    const [chapter] = await db.insert(chapters).values(data).returning({id:chapters.id});
    if (!chapter?.id) throw new Error("Failed to insert chapter");
    return chapter.id;
}

export async function insertSection(data: { title: string; chapterId: number }) {
    const [section] = await db.insert(sections).values(data).returning({id:sections.id});
    if (!section?.id) throw new Error("Failed to insert section");
    return section.id;
}

export async function insertContentBlock(data: {
    sectionId: number;
    type: string;
    title: string;
    text?: string;
    items?: string;
    language?: string;
    code?: string;
}) {
    await db.insert(contentBlocks).values(data);
}

export async function getAllBootcamps() {
    const coursesData = await db.select().from(courses).execute();
    const chaptersData = await db.select().from(chapters).execute();
    const sectionsData = await db.select().from(sections).execute();
    const contentBlocksData = await db.select().from(contentBlocks).execute();

    const bootcamps = coursesData.map((course) => {
        const courseChapters = chaptersData
            .filter((chapter) => chapter.courseId === course.id)
            .map((chapter) => {
                const chapterSections = sectionsData
                    .filter((section) => section.chapterId === chapter.id)
                    .map((section) => {
                        const sectionContentBlocks = contentBlocksData.filter(
                            (contentBlock) => contentBlock.sectionId === section.id
                        );
                        return { ...section, contentBlocks: sectionContentBlocks };
                    });
                return { ...chapter, sections: chapterSections };
            });
        return { ...course, chapters: courseChapters };
    });

    return bootcamps;
}

export async function deleteCourse(courseId: string) {
    const courseIdNumber = Number(courseId);
    const sectionIds = (await db.select({ id: sections.id }).from(sections).where(inArray(sections.chapterId, (await db.select({ id: chapters.id }).from(chapters).where(eq(chapters.courseId, courseIdNumber)).execute()).map(chapter => chapter.id))).execute()).map(section => section.id);
    await db.delete(contentBlocks).where(inArray(contentBlocks.sectionId, sectionIds)).execute();
    const chapterIds = (await db.select({ id: chapters.id }).from(chapters).where(eq(chapters.courseId, courseIdNumber)).execute()).map(chapter => chapter.id);
    await db.delete(sections).where(inArray(sections.chapterId, chapterIds)).execute();
    await db.delete(chapters).where(eq(chapters.courseId, courseIdNumber)).execute();
    await db.delete(courses).where(eq(courses.id, courseIdNumber)).execute();
}