import React, { useEffect, useState } from "react";
import { Bell, Pencil, User, Search } from "lucide-react";
import Container from "./Container";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn] = useAuth();
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`w-full px-6 ${scrolled ? "py-2" : "py-5"} border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 bg-white`}
        >
            <Container extraClasses="flex items-center justify-between flex-wrap gap-4">
                {/* Logo */}
                <div className="text-2xl font-bold">Medium</div>

                {/* Search Bar (Desktop only) */}
                <div className="hidden md:block flex-1 max-w-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-4 pr-4 py-2 rounded-md border border-gray-600 bg-transparent placeholder-gray-400"
                    />
                </div>

                {/* Right Side Icons + Buttons */}
                <div className="flex items-center gap-3">
                    {/* Notification Icon */}
                    <button className="p-2 rounded-full hover:bg-gray-200 transition">
                        <Bell className="w-5 h-5" />
                    </button>

                    {/* Search Icon (Mobile only) */}
                    <button
                        className="p-2 rounded-full hover:bg-gray-200 transition md:hidden"
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Write Button */}
                    <button className="bg-white text-black px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 transition">
                        <Pencil className="w-4 h-4" />
                        Write
                    </button>

                    {/* Auth */}
                    {isLoggedIn ? (
                        <button className="p-2 rounded-full hover:bg-gray-200 transition">
                            <User className="w-6 h-6" />
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm hover:underline">
                                Login
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Search Input Field */}
                {showMobileSearch && (
                    <div className="w-full md:hidden mt-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-4 pr-4 py-2 rounded-md border border-gray-600 bg-transparent placeholder-gray-400"
                        />
                    </div>
                )}
            </Container>
        </nav>
    );
}
