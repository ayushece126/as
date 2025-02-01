export interface ContentBlock {
    id: number;
    sectionId: number;
    type: string;
    title: string;
    text?: string;
    items?: string;
    language?: string;
    code?: string;
}

export interface Section {
    id: number;
    chapterId: number;
    title: string;
    contentBlocks: ContentBlock[];
}

export interface Chapter {
    id: number;
    courseId: number;
    title: string;
    overview?: string;
    sections: Section[];
}

export interface Course {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    createdBy: number;
    chapters: Chapter[];
}