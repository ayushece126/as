// src/components/dashboard/components/StudentStatCard.tsx
"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface StudentStatCardProps {
    totalEnrolledBootcamps: number;
    activeBootcamps: number;
    finishedBootcamps: number;
}

const StudentStatCard = ({
    totalEnrolledBootcamps,
    activeBootcamps,
    finishedBootcamps,
}: StudentStatCardProps) => {
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="bg-cyan-700 rounded-md p-1 mr-4 flex items-center justify-center">
                        <Image src="/bootcamp/bag4.png" alt="Total Enrolled Bootcamps" width={35} height={35} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-800">{totalEnrolledBootcamps}</span>
                        <span className="text-gray-700 text-m">Total Enrolled Bootcamps</span>
                    </div>
                </div>
                <Separator className="my-2 bg-gray-300" />
                <span className="text-blue-500 hover:underline cursor-pointer text-m mt-2">View Details</span>
            </div>

            <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="bg-teal-700 rounded-md p-1 mr-4 flex items-center justify-center">
                        <Image src="/bootcamp/bag4.png" alt="Active Bootcamps" width={35} height={35} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-800">{activeBootcamps}</span>
                        <span className="text-gray-700 text-m">Active Bootcamps</span>
                    </div>
                </div>
                <Separator className="my-2 bg-gray-300" />
                <span className="text-blue-500 hover:underline cursor-pointer text-m mt-2">View Details</span>
            </div>

            <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="bg-indigo-700 rounded-md p-1 mr-4 flex items-center justify-center">
                        <Image src="/bootcamp/bag4.png" alt="Finished Bootcamps" width={35} height={35} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-800">{finishedBootcamps}</span>
                        <span className="text-gray-700 text-m">Finished Bootcamps</span>
                    </div>
                </div>
                <Separator className="my-2 bg-gray-300" />
                <span className="text-blue-500 hover:underline cursor-pointer text-m mt-2">View Details</span>
            </div>
        </div>
    );
};

export default StudentStatCard;