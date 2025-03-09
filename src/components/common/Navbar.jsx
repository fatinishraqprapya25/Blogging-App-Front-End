import React, { useEffect, useState } from "react";
import { Bell, Pencil, User } from "lucide-react";
import Container from "./Container";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`w-full px-6 ${scrolled ? "py-2" : "py-5"
                } border-b border-gray-200 sticky top-0 z-50 transition-all duration-300`}
        >
            <Container extraClasses="flex items-center justify-between ">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="text-xl font-bold">Medium</div>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-4 pr-10 py-2 rounded-md border border-gray-600 bg-transparent placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Notification Icon */}
                    <button className="p-2 rounded-full hover:bg-white hover:text-black transition">
                        <Bell className="w-5 h-5" />
                    </button>

                    {/* Write Button */}
                    <button className="bg-white text-black px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 transition">
                        <Pencil className="w-4 h-4" />
                        Write
                    </button>

                    {/* User Icon */}
                    <button className="p-2 rounded-full hover:bg-white hover:text-black transition">
                        <User className="w-6 h-6" />
                    </button>
                </div>
            </Container>

        </nav>
    );
}
