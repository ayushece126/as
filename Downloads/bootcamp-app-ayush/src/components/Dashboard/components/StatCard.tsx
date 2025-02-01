// components/StatCard.js

import { useState, useEffect } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface StatCardProps {
    totalStudents?: number;
}

const StatCard = ({ totalStudents, }: StatCardProps) => {
    const [bootcampCount, setBootcampCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    // const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        // Fetch bootcamp data and count
        axios.get('/api/courses')
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setBootcampCount(data.length);
                } else {
                    console.error("Invalid data format received:", data);
                    // Handle the case where the API doesn't return an array
                    setBootcampCount(0); // Or some other default value
                }
            })
            .catch(err => {
                console.error("Error fetching bootcamp data:", err);
                setBootcampCount(0); // Handle error, set count to 0 or a default
            });

        // Fetch quiz count
        setQuizCount(2); // Replace with actual API call when available

        // Fetch student count 
        // setStudentCount(1);
    }, []);

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="bg-cyan-700 rounded-md p-1 mr-4 flex items-center justify-center"> {/* Centered icon */}
                        <Image src="/bootcamp/bag4.png" alt="Bootcamps Created" width={35} height={35} /> {/* Adjusted size */}
                    </div>
                    <div className="flex flex-col"> {/* Number and text container */}
                        <span className="text-xl font-bold text-gray-800">{bootcampCount}</span>
                        <span className="text-gray-700 text-m">Bootcamps Created</span> {/* Smaller text, margin top */}
                    </div>
                </div>
                <Separator className="my-2 bg-gray-300" />
                <span className="text-blue-500 hover:underline cursor-pointer text-m mt-2">View Created Bootcamps</span> {/* Smaller text */}
            </div>

            {/* Repeat for Quizzes and Students (similar structure) */}
            <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="bg-teal-700 rounded-md p-1 mr-4 flex items-center justify-center">
                        <Image src="/bootcamp/bag4.png" alt="Quizzes Created" width={35} height={35} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-800">{quizCount}</span>
                        <span className="text-gray-700 text-m">Quizzes Created</span>
                    </div>
                </div>
                <Separator className="my-2 bg-gray-300" />
                <span className="text-blue-500 hover:underline cursor-pointer text-m mt-2">View Quizzes</span>
            </div>

            <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="bg-indigo-700 rounded-md p-1 mr-4 flex items-center justify-center">
                        <Image src="/bootcamp/bag4.png" alt="Total Enrolled Students" width={35} height={35} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-800">{totalStudents || 0}</span>
                        <span className="text-gray-700 text-m">Total Enrolled Students</span>
                    </div>
                </div>
                <Separator className="my-2 bg-gray-300" />
                <span className="text-blue-500 hover:underline cursor-pointer text-m mt-2">View Students</span>
            </div>

        </div>
    );
}

export default StatCard;