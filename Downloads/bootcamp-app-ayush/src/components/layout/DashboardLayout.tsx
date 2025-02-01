// src/components/layout/DashboardLayout.tsx
"use client";

interface DashboardLayoutProps {
    leftSidebar: React.ReactNode;
    dashboardSection: React.ReactNode;
}

const DashboardLayout = ({ leftSidebar, dashboardSection }: DashboardLayoutProps) => {
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
            <div className="flex flex-wrap md:flex-nowrap h-screen bg-slate-900 text-white">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/4 bg-[#1E293B] text-white m-0 md:mt-4 md:mr-4 md:md-4 md:ml-4 p-4 shadow-lg rounded-none md:rounded-lg">
                    {leftSidebar}
                </div>
                {/* Dashboard Section */}
                <div className="w-full md:w-3/4 bg-[#1E293B] m-0 md:mt-4 md:mr-4 md:md-4 md:ml-0 overflow-y-auto shadow-lg custom-scrollbar rounded-none md:rounded-lg">
                    {dashboardSection}
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;

