import { FaUsers, FaRocket, FaRegSmile } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface MissionItem {
    icon: IconType;
    title: string;
    text: string;
}

export const missionData: MissionItem[] = [
    {
        icon: FaUsers,
        title: "Community",
        text: "Bringing people together to learn and grow as a community.",
    },
    {
        icon: FaRocket,
        title: "Innovation",
        text: "Pushing boundaries to deliver innovative solutions.",
    },
    {
        icon: FaRegSmile,
        title: "Satisfaction",
        text: "Ensuring our users have the best experience possible.",
    },
];
