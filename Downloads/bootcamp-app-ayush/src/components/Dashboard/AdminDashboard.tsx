// src/components/layout/AdminDashboard.tsx
"use client";

import { Divider } from "../ui/Divider";
import { useAuthStore } from "@/store/auth";
import UserDropdown from "../ui/UserDropdown";
import BootcampForm from "./components/BootcampForm";
import BootcampDetails from "./components/BootcampDetails";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { Badge } from "../ui/badge";

const AdminDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const [showBootcampForm, setShowBootcampForm] = useState(false);

    return (
        <>
            <style jsx>{`
                /* Custom Scrollbar Styles */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1e293b; /* Dark gray background */
                    border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #a5a6a8; /* Gray scrollbar thumb */
                    border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #e2e8f0; /* Lighter gray on hover */
                }
            `}</style>

            <div className="p-6 bg-slate-800 text-white rounded-lg">
                <div className="hidden sm:flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <UserDropdown
                        avatarSrc="https://github.com/shadcn.png"
                        fallback={user?.name[0]?.toUpperCase() || "U"}
                    />
                </div>
                <Divider />
                <div className="p-4 sm:p-0 rounded-lg text-white">
                    <div className="bg-slate-700 p-6 rounded-lg text-white my-8">
                        <p className="text-3xl font-semibold text-white mb-2">
                            Welcome Admin!
                        </p>
                        <p className="text-lg text-gray-300 mb-4">
                            Manage the bootcamps and users from here.
                        </p>
                    </div>

                    {/* Bootcamp Modal */}
                    <Dialog open={showBootcampForm} onOpenChange={setShowBootcampForm}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-500 text-lg text-gray-100 hover:bg-blue-600 font-semibold py-5 mb-2">
                                + Add New Bootcamp
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
                            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl h-5/6 overflow-y-auto relative custom-scrollbar">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Create Bootcamp</DialogTitle>
                                    <DialogClose asChild>
                                        <Badge
                                            onClick={() => setShowBootcampForm(false)}
                                            className="absolute top-6 right-4 bg-inherit hover:bg-inherit text-gray-500 hover:text-gray-700"
                                        >
                                            <FaTimes size={20} />
                                        </Badge>
                                    </DialogClose>
                                </DialogHeader>
                                <BootcampForm />
                            </div>
                        </DialogContent>
                    </Dialog>

                    <BootcampDetails />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
