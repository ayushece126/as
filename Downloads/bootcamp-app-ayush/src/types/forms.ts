// src/types/forms.ts
export interface ContentBlock {
    type: "text" | "list" | "code";
    title: string;
    text?: string;
    items?: string[];
    language?: string;
    code?: string;
}

export interface Section {
    title: string;
    content: ContentBlock[];
}

export interface Chapter {
    title: string;
    overview: string;
    sections: Section[];
}

export interface Bootcamp {
    title: string;
    description: string;
    chapters: Chapter[];
}
