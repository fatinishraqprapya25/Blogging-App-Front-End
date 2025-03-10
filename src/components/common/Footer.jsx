import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Footer Text */}
                <h2 className="text-xl font-semibold mb-2">Stay Connected</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Join us for the latest updates, articles, and tips. We’d love to stay in touch!
                </p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        <Facebook size={20} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-400 transition"
                    >
                        <Twitter size={20} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-pink-600 transition"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-700 transition"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
