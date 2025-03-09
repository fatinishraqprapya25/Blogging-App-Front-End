import React from "react";
import { Link } from "react-router-dom";
import { Book, FileText, Code, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Example icons

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-gray-800 py-8">
            <div className="container mx-auto px-6 md:px-12">
                {/* Footer content with grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* About Content */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold mb-4">About MyBlog</h1>
                        <p className="text-sm">
                            MyBlog is a place where we share the latest insights, tutorials, and tips on technology, programming, and lifestyle. Stay updated with our articles and join our community of passionate readers and creators!
                        </p>
                    </div>

                    {/* Important Articles */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-semibold mb-4">Important Articles</h2>
                        <ul className="space-y-2 text-sm leading-tight">
                            <li className="flex items-center gap-2">
                                <Book size={18} className="text-blue-500" />
                                <Link to="/article/1" className="hover:text-gray-600 transition">How to Get Started with React</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <FileText size={18} className="text-green-500" />
                                <Link to="/article/2" className="hover:text-gray-600 transition">10 Best Practices for Clean Code</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <Code size={18} className="text-yellow-500" />
                                <Link to="/article/3" className="hover:text-gray-600 transition">Why You Should Learn Python in 2025</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-purple-500" />
                                <Link to="/article/4" className="hover:text-gray-600 transition">Top JavaScript Libraries to Know</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                        <div className="flex justify-center md:justify-start space-x-6">
                            <Link
                                to="https://facebook.com"
                                className="hover:text-blue-600 transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook size={20} />
                            </Link>
                            <Link
                                to="https://twitter.com"
                                className="hover:text-blue-400 transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter size={20} />
                            </Link>
                            <Link
                                to="https://instagram.com"
                                className="hover:text-pink-600 transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link
                                to="https://linkedin.com"
                                className="hover:text-blue-700 transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
