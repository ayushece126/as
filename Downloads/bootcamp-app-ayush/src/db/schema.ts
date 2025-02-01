// src/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    email: text("email").unique(),
    password: text("password"),
    role: text("role"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    isVerified: integer("is_verified").default(0),
    verificationToken: text("verification_token"),
    resetToken: text("reset_token"),
});

// Courses Table
export const courses = sqliteTable("courses", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    // price: real("price").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    createdBy: integer("created_by").notNull(), // Foreign key to users.id
});

// Chapters Table
export const chapters = sqliteTable("chapters", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    courseId: integer("course_id").notNull(), // Foreign key to courses.id
    title: text("title").notNull(),
    overview: text("overview"),
});

// Sections Table
export const sections = sqliteTable("sections", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    chapterId: integer("chapter_id").notNull(), // Foreign key to chapters.id
    title: text("title").notNull(),
});

// Content Blocks Table
export const contentBlocks = sqliteTable("content_blocks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sectionId: integer("section_id").notNull(), // Foreign key to sections.id
    type: text("type").notNull(), // e.g., 'text', 'list', 'code'
    title: text("title").notNull(),
    text: text("text"), // Main content for text blocks
    items: text("items"),
    language: text("language"),
    code: text("code"),
});

export const enrollments = sqliteTable("enrollments", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").notNull(), // Foreign key to users.id
    courseId: integer("course_id").notNull(), // Foreign key to courses.id
    enrolledAt: text("enrolled_at").default(sql`CURRENT_TIMESTAMP`),
});
