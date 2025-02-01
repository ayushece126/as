// src/app/profile/page.tsx
"use client";

import ProfileLayout from "@/components/layout/ProfileLayout";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSection from "@/components/Profile/RightSection";

const ProfilePage = () => {
    return (
        <ProfileLayout
            leftSidebar={<LeftSidebar />}
            rightSection={<RightSection />}
        />
    );
};

export default ProfilePage;
