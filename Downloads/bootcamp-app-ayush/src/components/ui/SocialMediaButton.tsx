import React from 'react';

interface SocialMediaButtonProps {
    bgColor: string;
    pathData: string;
}

const SocialMediaButton = ({ bgColor, pathData }: SocialMediaButtonProps) => (
    <button
        className={`w-8 h-8 flex items-center justify-center relative overflow-hidden rounded-full bg-white shadow-md group transition-all duration-300`}
    >
        <svg
            className="relative z-10 fill-gray-900 transition-all duration-300 group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 72 72"
            fill="none"
        >
            <path d={pathData} fill="" />
        </svg>
        <div
            className={`absolute top-full left-0 w-full h-full rounded-full ${bgColor} z-0 transition-all duration-500 group-hover:top-0`}
        ></div>
    </button>
);

export default SocialMediaButton;