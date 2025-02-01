"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth";
import UserDropdown from "../ui/UserDropdown";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, token } = useAuthStore((state) => state);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-slate-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-5 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-3xl font-bold hover:text-gray-300">
                    E-Learning
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex text-lg items-center space-x-8">
                    <Link
                        href="/"
                        className="group hover:text-gray-300 relative"
                    >
                        Home
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        href="/aboutUs"
                        className="group hover:text-gray-300 relative"
                    >
                        About
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        href="/bootcamps"
                        className="group hover:text-gray-300 relative"
                    >
                        Bootcamps
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        href="/careers"
                        className="group hover:text-gray-300 relative"
                    >
                        Careers
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

                {/* Right-end Buttons */}
                <div className="hidden md:flex text-lg items-center space-x-6">
                    {!token ? (
                        <>
                            <Link
                                href="/login"
                                className="group hover:text-gray-300 relative"
                            >
                                Login
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="/signup">
                                <Button className="text-lg" >Signup</Button>
                            </Link>
                        </>
                    ) : (
                        <div
                            className="flex items-center space-x-3 cursor-pointer"
                        >
                            <UserDropdown
                                avatarSrc="https://github.com/shadcn.png"
                                fallback={user?.name[0]?.toUpperCase() || "U"}
                            />
                        </div>
                    )}

                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? (
                            <AiOutlineClose className="text-2xl" />
                        ) : (
                            <AiOutlineMenu className="text-2xl" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 text-white">
                    <div className="flex flex-col text-lg space-y-4 items-start px-4 py-5">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="group hover:text-gray-300 relative"
                        >
                            Home
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/aboutUs"
                            onClick={() => setIsMenuOpen(false)}
                            className="group hover:text-gray-300 relative"
                        >
                            About
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/bootcamps"
                            onClick={() => setIsMenuOpen(false)}
                            className="group hover:text-gray-300 relative"
                        >
                            Bootcamps
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/careers"
                            onClick={() => setIsMenuOpen(false)}
                            className="group hover:text-gray-300 relative"
                        >
                            Careers
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        {!token ? (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group hover:text-gray-300 relative"
                                >
                                    Login
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button className="text-lg">Signup</Button>
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <Link href={"/profile"} className="group hover:text-gray-300 relative">
                                    Profile
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
