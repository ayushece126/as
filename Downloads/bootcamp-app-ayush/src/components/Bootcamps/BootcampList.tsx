"use client";

import { useState, useEffect } from "react";
import BootcampCard from "./BootcampCard";
import { PulseLoader } from "react-spinners";
import axios from "axios";

interface Bootcamp {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

const BootcampList = ({ searchTerm }: { searchTerm: string }) => {
    const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBootcamps = async () => {
            try {
                const response = await axios.get("/api/courses");
                setBootcamps(response.data);
            } catch (error) {
                console.error("Failed to fetch bootcamps:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBootcamps();
    }, []);

    const filteredBootcamps = bootcamps.filter((bootcamp) =>
        bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PulseLoader color="black" />
            </div>
        );
    }

    return (
        <div className="container mx-auto border bg-white border-gray-200 rounded-xl">
            <div className="bg-gray-100 border-b border-gray-200 px-5 py-2 rounded-t-xl">
                <h2 className="text-xl font-semibold">Explore Bootcamps</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                {filteredBootcamps.map((bootcamp) => (
                    <BootcampCard key={bootcamp.id} {...bootcamp} />
                ))}
            </div>
        </div>
    );
};

export default BootcampList;