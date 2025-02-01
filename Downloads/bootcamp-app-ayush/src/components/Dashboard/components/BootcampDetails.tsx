// src/components/dashboard/components/BootcampDetails.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

interface ContentBlock {
    id: string;
    title: string;
    type: string;
    text?: string;
    items?: string;
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
    overview: string;
    sections: Section[];
}

interface Bootcamp {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
}

const BootcampDetails = () => {
    const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBootcamps = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/courses");
                setBootcamps(response.data);
            } catch (error) {
                console.error("Error fetching bootcamps:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBootcamps();
    }, []);

    const handleDelete = async (bootcampId: string) => {
        setLoading(true);
        try {
            await axios.delete(`/api/courses/${bootcampId}`);
            setBootcamps(bootcamps.filter((bootcamp) => bootcamp.id !== bootcampId));
            toast.success("Bootcamp deleted successfully!", { duration: 3000 });
        } catch (error) {
            console.error("Error deleting bootcamp:", error);
            toast.error("Error deleting bootcamp.", { duration: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const getLogoForTitle = (title: string) => {
        if (title.toLowerCase().includes("full stack development")) {
            return (
                <Image src="/bootcamp/web-development.png " alt="Full Stack Development" className="w-10 h-10 mr-2 rounded p-1 bg-gray-300" />
            );
        } else if (title.toLowerCase().includes("machine learning")) {
            return (
                <Image src="/bootcamp/machine-learning.png" alt="machine learning" className="w-10 h-10 mr-2 rounded p-1 bg-gray-300" />
            );
        } else if (title.toLowerCase().includes("python")) {
            return (
                <Image src="/logos/python-icon.png" alt="Python" className="w-10 h-10 mr-2" />
            );
        } else if (title.toLowerCase().includes("react native masterclass : build mobile application")) {
            return (
                <Image src="/bootcamp/react-native.png" alt="react native masterclass : build mobile application" className="w-10 h-10 mr-2 rounded p-1 bg-gray-300" />
            );
        }
        // Default logo
        return <div className="w-10 h-10 bg-gray-500 rounded-full mr-2"></div>;
    };

    return (
        <div className="w-full h-full bg-white border border-gray-300 rounded-lg shadow-md">
            {/* Header Section */}
            <div className="bg-gray-100 px-4 py-2 rounded-t-md border-b border-gray-300">
                <h2 className="text-xl text-gray-800 font-semibold">Bootcamp List</h2>
            </div>

            {loading ? (
                <div className="flex h-full justify-center items-center p-4">
                    <PulseLoader size={12} color="#000" />
                </div>
            ) : (
                /* Table Container */
                <div className="mt-2 mx-2 p-2">
                    <div className="overflow-x-auto bg-white rounded-t-md">
                        <table className="w-full border-collapse border-spacing-y-2">
                            <thead>
                                <tr className="bg-gray-100 text-gray-500 text-m leading-normal border border-gray-300">
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-center">Enrollments</th>
                                    <th className="py-2 px-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bootcamps.map((bootcamp, index) => (
                                    <tr
                                        key={bootcamp.id}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                    >
                                        <td className="py-2 px-4 text-gray-800 text-left text-m font-medium">
                                            <div className="flex items-center space-x-2">
                                                {getLogoForTitle(bootcamp.title)}
                                                <div>
                                                    <span>{bootcamp.title}</span>
                                                    <div className="text-sm text-gray-500">
                                                        {bootcamp.chapters.length} {bootcamp.chapters.length === 1 ? "Module" : "Modules"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <Badge variant="default" className="bg-gray-400 text-white hover:bg-gray-400 p-1 text-sm">
                                                {Math.floor(Math.random() * 100)} {/* Dummy data */}
                                            </Badge>
                                        </td>
                                        <td className="py-2 px-6 text-center">
                                            <Button
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-700 hover:bg-inherit"
                                                onClick={() => handleDelete(bootcamp.id)}
                                            >
                                                <AiOutlineDelete style={{ width: '20px', height: '20px' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>

    );
};

export default BootcampDetails;