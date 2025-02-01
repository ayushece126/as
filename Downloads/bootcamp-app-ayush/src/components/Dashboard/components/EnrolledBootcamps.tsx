// src/components/Dashboard/components/EnrolledBootcamps.tsx

"use client";

import React from "react";
import { PulseLoader } from "react-spinners";
import { Badge } from "@/components/ui/badge";

interface Enrollment {
    courseId: number;
    courseTitle: string;
    enrolledAt: string;
}

interface EnrolledBootcampsTableProps {
    enrolledBootcamps: Enrollment[];
    loading: boolean;
}

const EnrolledBootcamps = ({ enrolledBootcamps, loading }: EnrolledBootcampsTableProps) => {

    return (
        <div className="w-full h-full bg-white border border-gray-300 rounded-lg shadow-md">
            <div className="bg-gray-100 px-4 py-2 rounded-t-md border-b border-gray-300">
                <h2 className="text-xl text-gray-800 font-semibold">My Enrolled Bootcamps</h2>
            </div>

            {loading ? (
                <div className="flex h-full justify-center items-center p-4">
                    <PulseLoader size={12} color="#000" />
                </div>
            ) : (
                <div className="mt-2 mx-2 p-2">
                    <div className="overflow-x-auto bg-white rounded-t-md">
                        <table className="w-full border-collapse border-spacing-y-2">
                            <thead>
                                <tr className="bg-gray-100 text-gray-500 text-m leading-normal border border-gray-300">
                                    <th className="py-2 px-4 text-left">Bootcamp</th>
                                    <th className="py-2 px-4 text-left">Enrollment Date</th>
                                    <th className="py-2 px-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(enrolledBootcamps) && enrolledBootcamps.length > 0 ? (
                                    enrolledBootcamps.map((bootcamp, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                        >
                                            <td className="py-2 px-4 text-gray-800 text-left text-m font-medium">
                                                {bootcamp.courseTitle}
                                            </td>
                                            <td className="py-2 px-4 text-gray-800 text-left">
                                                {new Date(bootcamp.enrolledAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <Badge variant="default" className="bg-green-500 text-white hover:bg-green-600 p-1 text-sm">
                                                    Enrolled
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4 text-gray-500">
                                            You&apos;re not enrolled in any bootcamps yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EnrolledBootcamps;