// src/components/dashboard/components/BootcampForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Bootcamp, Chapter, Section, ContentBlock } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PulseLoader from "react-spinners/PulseLoader";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "react-hot-toast";

const BootcampForm: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const getToken = () => {
        return localStorage.getItem("token");
    }
    const token = getToken();

    const [form, setForm] = useState<Bootcamp>({
        title: "",
        description: "",
        chapters: [],
    });

    const handleAddChapter = () => {
        setForm({
            ...form,
            chapters: [
                ...form.chapters,
                { title: "", overview: "", sections: [] } as Chapter,
            ],
        });
    };

    const handleAddSection = (chapterIndex: number) => {
        const updatedChapters = [...form.chapters];
        updatedChapters[chapterIndex].sections.push({
            title: "",
            content: [],
        } as Section);
        setForm({ ...form, chapters: updatedChapters });
    };

    const handleAddContentBlock = (chapterIndex: number, sectionIndex: number) => {
        const updatedChapters = [...form.chapters];
        updatedChapters[chapterIndex].sections[sectionIndex].content.push({
            type: "text",
            title: "",
        } as ContentBlock);
        setForm({ ...form, chapters: updatedChapters });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(`/api/courses`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log("course from", form);
            toast.success("Bootcamp created successfully!", { duration: 3000 });
            router.refresh();
        } catch (error) {
            console.error("Error creating bootcamp:", error);
            toast.error("Failed to create bootcamp.", { duration: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="p-6 bg-gray-900 text-white min-h-screen">
        //     <h1 className="text-3xl font-bold mb-6">Create Bootcamp</h1>
        //     <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
        //         <h2 className="text-2xl font-semibold mb-4">Bootcamp Details</h2>
        //         <input
        //             type="text"
        //             placeholder="Title"
        //             value={form.title}
        //             onChange={(e) => setForm({ ...form, title: e.target.value })}
        //             className="border border-gray-700 bg-gray-700 text-white w-full p-3 mb-4 rounded"
        //         />
        //         <textarea
        //             placeholder="Description"
        //             value={form.description}
        //             onChange={(e) => setForm({ ...form, description: e.target.value })}
        //             className="border border-gray-700 bg-gray-700 text-white w-full p-3 mb-4 rounded"
        //         />

        //         <h3 className="text-xl font-semibold mt-6 mb-4">Chapters</h3>
        //         {form.chapters.map((chapter, chapterIndex) => (
        //             <div key={chapterIndex} className="border border-gray-700 bg-gray-700 p-4 mb-4 rounded">
        //                 <h4 className="text-lg font-semibold mb-2">Chapter {chapterIndex + 1}</h4>
        //                 <input
        //                     type="text"
        //                     placeholder="Chapter Title"
        //                     value={chapter.title}
        //                     onChange={(e) => {
        //                         const updatedChapters = [...form.chapters];
        //                         updatedChapters[chapterIndex].title = e.target.value;
        //                         setForm({ ...form, chapters: updatedChapters });
        //                     }}
        //                     className="border border-gray-600 bg-gray-600 text-white w-full p-3 mb-4 rounded"
        //                 />
        //                 <textarea
        //                     placeholder="Overview"
        //                     value={chapter.overview}
        //                     onChange={(e) => {
        //                         const updatedChapters = [...form.chapters];
        //                         updatedChapters[chapterIndex].overview = e.target.value;
        //                         setForm({ ...form, chapters: updatedChapters });
        //                     }}
        //                     className="border border-gray-600 bg-gray-600 text-white w-full p-3 mb-4 rounded"
        //                 />

        //                 <h4 className="text-lg font-semibold mt-4 mb-2">Sections</h4>
        //                 {chapter.sections.map((section, sectionIndex) => (
        //                     <div key={sectionIndex} className="border border-gray-600 bg-gray-600 p-4 mb-4 rounded">
        //                         <h5 className="text-md font-semibold mb-2">Section {sectionIndex + 1}</h5>
        //                         <input
        //                             type="text"
        //                             placeholder="Section Title"
        //                             value={section.title}
        //                             onChange={(e) => {
        //                                 const updatedChapters = [...form.chapters];
        //                                 updatedChapters[chapterIndex].sections[sectionIndex].title =
        //                                     e.target.value;
        //                                 setForm({ ...form, chapters: updatedChapters });
        //                             }}
        //                             className="border border-gray-500 bg-gray-500 text-white w-full p-3 mb-4 rounded"
        //                         />

        //                         <h5 className="text-md font-semibold mt-4 mb-2">Content Blocks</h5>
        //                         {section.content.map((block, blockIndex) => (
        //                             <div key={blockIndex} className="border border-gray-500 bg-gray-500 p-4 mb-4 rounded">
        //                                 <h6 className="text-sm font-semibold mb-2">Content Block {blockIndex + 1}</h6>
        //                                 <select
        //                                     value={block.type}
        //                                     onChange={(e) => {
        //                                         const updatedChapters = [...form.chapters];
        //                                         updatedChapters[chapterIndex].sections[
        //                                             sectionIndex
        //                                         ].content[blockIndex].type = e.target.value as
        //                                             | "text"
        //                                             | "list"
        //                                             | "code";
        //                                         setForm({ ...form, chapters: updatedChapters });
        //                                     }}
        //                                     className="border border-gray-400 bg-gray-400 text-white w-full p-3 mb-4 rounded"
        //                                 >
        //                                     <option value="text">Text</option>
        //                                     <option value="list">List</option>
        //                                     <option value="code">Code</option>
        //                                 </select>

        //                                 <input
        //                                     type="text"
        //                                     placeholder="Title"
        //                                     value={block.title}
        //                                     onChange={(e) => {
        //                                         const updatedChapters = [...form.chapters];
        //                                         updatedChapters[chapterIndex].sections[
        //                                             sectionIndex
        //                                         ].content[blockIndex].title = e.target.value;
        //                                         setForm({ ...form, chapters: updatedChapters });
        //                                     }}
        //                                     className="border border-gray-400 bg-gray-400 text-white w-full p-3 mb-4 rounded"
        //                                 />

        //                                 {block.type === "text" && (
        //                                     <textarea
        //                                         placeholder="Text Content"
        //                                         value={block.text || ""}
        //                                         onChange={(e) => {
        //                                             const updatedChapters = [...form.chapters];
        //                                             updatedChapters[chapterIndex].sections[
        //                                                 sectionIndex
        //                                             ].content[blockIndex].text = e.target.value;
        //                                             setForm({ ...form, chapters: updatedChapters });
        //                                         }}
        //                                         className="border border-gray-400 bg-gray-400 text-white w-full p-3 mb-4 rounded"
        //                                     ></textarea>
        //                                 )}

        //                                 {block.type === "list" && (
        //                                     <textarea
        //                                         placeholder="List Items (comma-separated)"
        //                                         value={block.items?.join(", ") || ""}
        //                                         onChange={(e) => {
        //                                             const updatedChapters = [...form.chapters];
        //                                             updatedChapters[chapterIndex].sections[
        //                                                 sectionIndex
        //                                             ].content[blockIndex].items =
        //                                                 e.target.value.split(",").map((item) =>
        //                                                     item.trim()
        //                                                 );
        //                                             setForm({ ...form, chapters: updatedChapters });
        //                                         }}
        //                                         className="border border-gray-400 bg-gray-400 text-white w-full p-3 mb-4 rounded"
        //                                     ></textarea>
        //                                 )}

        //                                 {block.type === "code" && (
        //                                     <>
        //                                         <input
        //                                             type="text"
        //                                             placeholder="Language"
        //                                             value={block.language || ""}
        //                                             onChange={(e) => {
        //                                                 const updatedChapters = [...form.chapters];
        //                                                 updatedChapters[chapterIndex].sections[
        //                                                     sectionIndex
        //                                                 ].content[blockIndex].language = e.target.value;
        //                                                 setForm({ ...form, chapters: updatedChapters });
        //                                             }}
        //                                             className="border border-gray-400 bg-gray-400 text-white w-full p-3 mb-4 rounded"
        //                                         />
        //                                         <textarea
        //                                             placeholder="Code Snippet"
        //                                             value={block.code || ""}
        //                                             onChange={(e) => {
        //                                                 const updatedChapters = [...form.chapters];
        //                                                 updatedChapters[chapterIndex].sections[
        //                                                     sectionIndex
        //                                                 ].content[blockIndex].code = e.target.value;
        //                                                 setForm({ ...form, chapters: updatedChapters });
        //                                             }}
        //                                             className="border border-gray-400 bg-gray-400 text-white w-full p-3 mb-4 rounded"
        //                                         ></textarea>
        //                                     </>
        //                                 )}
        //                             </div>
        //                         ))}
        //                         <button
        //                             onClick={() =>
        //                                 handleAddContentBlock(chapterIndex, sectionIndex)
        //                             }
        //                             className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        //                         >
        //                             Add Content Block
        //                         </button>
        //                     </div>
        //                 ))}
        //                 <button
        //                     onClick={() => handleAddSection(chapterIndex)}
        //                     className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        //                 >
        //                     Add Section
        //                 </button>
        //             </div>
        //         ))}
        //         <button
        //             onClick={handleAddChapter}
        //             className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        //         >
        //             Add Chapter
        //         </button>
        //         <button
        //             onClick={handleSubmit}
        //             className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        //         >
        //             Create Bootcamp
        //         </button>
        //     </div>
        // </div>

        <>
            <div className="container mx-auto">
                <Card className="bg-white border-gray-300 h-full overflow-y-hidden">
                    <div className=" bg-gray-100 text-gray-800 font-semibold text-xl py-2 px-5 border-b border-gray-300">Create New Bootcamp</div>
                    <CardContent className="h-full text-gray-800 overflow-y-hidden">
                        <div className="space-y-4">
                            <div className="space-y-2 mt-4">
                                <Label className="text-md font-medium">Title</Label>
                                <Input
                                    placeholder="Bootcamp Title"
                                    className="text-gray-800 border-gray-300"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-md font-medium">Description</Label>
                                <Textarea
                                    placeholder="Bootcamp Description"
                                    className=" text-gray-800 border-gray-300"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-4 mt-4">
                            <h3 className="text-xl font-bold">Chapters</h3>
                            {form.chapters.map((chapter, chapterIndex) => (
                                <Card key={chapterIndex} className="border bg-white border-gray-300 text-gray-800">
                                    <CardHeader>
                                        <CardTitle>Chapter {chapterIndex + 1}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-md font-medium">Title</Label>
                                                <Input
                                                    placeholder="Chapter Title"
                                                    className="text-gray-800 border-gray-300"
                                                    value={chapter.title}
                                                    onChange={(e) => {
                                                        const updatedChapters = [...form.chapters];
                                                        updatedChapters[chapterIndex].title = e.target.value;
                                                        setForm({ ...form, chapters: updatedChapters });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-md font-medium">Overview</Label>
                                                <Textarea
                                                    placeholder="Chapter Overview"
                                                    className="text-gray-800 border-gray-300"
                                                    value={chapter.overview}
                                                    onChange={(e) => {
                                                        const updatedChapters = [...form.chapters];
                                                        updatedChapters[chapterIndex].overview = e.target.value;
                                                        setForm({ ...form, chapters: updatedChapters });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <h4 className="text-lg font-bold">Sections</h4>
                                            {chapter.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="p-4 border border-gray-300 rounded-xl mt-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-md font-medium">Section Title</Label>
                                                        <Input
                                                            placeholder="Section Title"
                                                            className="text-gray-800 border-gray-300"
                                                            value={section.title}
                                                            onChange={(e) => {
                                                                const updatedChapters = [...form.chapters];
                                                                updatedChapters[chapterIndex].sections[sectionIndex].title = e.target.value;
                                                                setForm({ ...form, chapters: updatedChapters });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-4 space-y-4">
                                                        <h5 className="text-lg font-bold">Content Blocks</h5>
                                                        {section.content.map((block, blockIndex) => (
                                                            <div key={blockIndex} className="p-4 border text-gray-800 border-gray-300 rounded-xl mt-4 space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label className="text-md font-medium">Type</Label>
                                                                    <Select
                                                                        value={block.type}
                                                                        onValueChange={(value) => {
                                                                            const updatedChapters = [...form.chapters];
                                                                            updatedChapters[chapterIndex].sections[sectionIndex].content[blockIndex].type = value as "text" | "list" | "code";
                                                                            setForm({ ...form, chapters: updatedChapters });
                                                                        }}
                                                                    >
                                                                        {/* <option value="text">Text</option>
                                                                        <option value="list">List</option>
                                                                        <option value="code">Code</option> */}
                                                                        <SelectTrigger className="bg-inherit border-gray-300">
                                                                            <SelectValue placeholder="Content Type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent className="bg-white border border-gray-300 rounded-md">
                                                                            <SelectItem className="bg-gray-100 text-gray-800 focus:bg-gray-200 focus:text-gray-800" value="text">Text</SelectItem>
                                                                            <SelectItem className="bg-gray-100 text-gray-800 focus:bg-gray-200 focus:text-gray-800" value="list">List</SelectItem>
                                                                            <SelectItem className="bg-gray-100 text-gray-800 focus:bg-gray-200 focus:text-gray-800" value="code">Code</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label>Title</Label>
                                                                    <Input
                                                                        placeholder="Block Title"
                                                                        className="border-gray-300 text-gray-800"
                                                                        value={block.title}
                                                                        onChange={(e) => {
                                                                            const updatedChapters = [...form.chapters];
                                                                            updatedChapters[chapterIndex].sections[sectionIndex].content[blockIndex].title = e.target.value;
                                                                            setForm({ ...form, chapters: updatedChapters });
                                                                        }}
                                                                    />
                                                                </div>
                                                                {block.type === "text" && (
                                                                    <div className="space-y-2">
                                                                        <Label>Text Content</Label>
                                                                        <Textarea
                                                                            placeholder="Text Content"
                                                                            className="border-gray-300 text-gray-800"
                                                                            value={block.text || ""}
                                                                            onChange={(e) => {
                                                                                const updatedChapters = [...form.chapters];
                                                                                updatedChapters[chapterIndex].sections[sectionIndex].content[blockIndex].text = e.target.value;
                                                                                setForm({ ...form, chapters: updatedChapters });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                                {block.type === "list" && (
                                                                    <div className="space-y-2">
                                                                        <Label>List Items</Label>
                                                                        <Textarea
                                                                            placeholder="List Items (comma-separated)"
                                                                            className="border-gray-300 text-gray-800"
                                                                            value={block.items?.join(", ") || ""}
                                                                            onChange={(e) => {
                                                                                const updatedChapters = [...form.chapters];
                                                                                updatedChapters[chapterIndex].sections[sectionIndex].content[blockIndex].items = e.target.value.split(",").map((item) => item.trim());
                                                                                setForm({ ...form, chapters: updatedChapters });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                                {block.type === "code" && (
                                                                    <>
                                                                        <div className="space-y-2">
                                                                            <Label>Language</Label>
                                                                            <Input
                                                                                placeholder="Code Language"
                                                                                className="border-gray-300 text-gray-800"
                                                                                value={block.language || ""}
                                                                                onChange={(e) => {
                                                                                    const updatedChapters = [...form.chapters];
                                                                                    updatedChapters[chapterIndex].sections[sectionIndex].content[blockIndex].language = e.target.value;
                                                                                    setForm({ ...form, chapters: updatedChapters });
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label>Code Snippet</Label>
                                                                            <Textarea
                                                                                placeholder="Code Snippet"
                                                                                className="border-gray-300 text-gray-800"
                                                                                value={block.code || ""}
                                                                                onChange={(e) => {
                                                                                    const updatedChapters = [...form.chapters];
                                                                                    updatedChapters[chapterIndex].sections[sectionIndex].content[blockIndex].code = e.target.value;
                                                                                    setForm({ ...form, chapters: updatedChapters });
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <Button
                                                            onClick={() => handleAddContentBlock(chapterIndex, sectionIndex)}
                                                            className="mt-4 bg-gray-800 hover:bg-gray-900 text-white"
                                                        >
                                                            Add Content Block
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <Button
                                                onClick={() => handleAddSection(chapterIndex)}
                                                className="mt-4 bg-gray-800 hover:bg-gray-900 text-white"
                                            >
                                                Add Section
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button onClick={handleAddChapter} className="mt-4 bg-gray-800 hover:bg-gray-900 text-white">
                                Add Chapter
                            </Button>

                            <Button onClick={handleSubmit} className="mx-2 bg-gray-800 hover:bg-gray-900 text-white" disabled={loading}>
                                Create Bootcamp {loading && <PulseLoader size={6} color="#fff" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default BootcampForm;
