import React from "react";
import Navbar from "../components/common/Navbar";
import Category from "../components/common/Category";
import BlogsSection from "../components/blogs/BlogsSection";

export default function Home() {
    return <>
        <Navbar />
        <Category />
        <BlogsSection />
    </>
}