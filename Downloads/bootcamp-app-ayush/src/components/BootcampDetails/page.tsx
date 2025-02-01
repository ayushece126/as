"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

interface ContentBlock {
    id: string;
    type: string;
    title: string;
    text?: string;
    items?: string;
    language?: string;
    code?: string;
}

interface Section {
    id: string;
    title: string;
    contentBlocks: ContentBlock[];
}

interface Chapter {
    id: string;
    title: string;
    sections: Section[];
}

interface Bootcamp {
    id: string;
    title: string;
    description: string;
    chapters?: Chapter[];
}

const BootcampDetails = () => {
    const { id } = useParams();
    const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [enrolled, setEnrolled] = useState<boolean>(false);

    useEffect(() => {
        const fetchBootcamp = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`/api/courses/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                setBootcamp(response.data);
                setEnrolled(!!response.data.chapters);
            } catch (error) {
                console.error("Failed to fetch bootcamp:", error);
                toast.error("Failed to fetch bootcamp");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBootcamp();
    }, [id]);

    const handleEnroll = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return toast.error("Please login to enroll");

            await axios.post("/api/enroll", { courseId: id }, { headers: { Authorization: `Bearer ${token}` } });
            alert("Enrolled successfully!");
            setEnrolled(true);
        } catch (error) {
            console.error("Enrollment failed:", error);
            toast.error("Enrollment failed");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PulseLoader color="white" />
            </div>
        );
    }

    return (
        <div>
            <h1>{bootcamp?.title}</h1>
            <p>{bootcamp?.description}</p>

            {!enrolled ? (
                <button onClick={handleEnroll} className="btn-primary">Enroll Now</button>
            ) : (
                <div>
                    {bootcamp?.chapters?.map((chapter) => (
                        <div key={chapter.id}>
                            <h2>{chapter.title}</h2>
                            {chapter.sections.map((section) => (
                                <div key={section.id}>
                                    <h3>{section.title}</h3>
                                    {section.contentBlocks.map((block) => (
                                        <div key={block.id}>
                                            <h4>{block.title}</h4>
                                            {block.type === "text" && <p>{block.text}</p>}
                                            {block.type === "list" && (
                                                <ul>
                                                    {block.items?.split(",").map((item, index) => (
                                                        <li key={index}>{item}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {block.type === "code" && (
                                                <pre>
                                                    <code>{block.code}</code>
                                                </pre>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BootcampDetails;
