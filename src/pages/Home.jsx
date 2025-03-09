import React from "react";
import Navbar from "../components/common/Navbar";
import Category from "../components/common/Category";
import BlogsSection from "../components/blogs/BlogsSection";
import Footer from "../components/common/Footer";

export default function Home() {
    return <>
        <Navbar />
        <Category />
        <BlogsSection />
        <br />
        <br />
        <Footer />
    </>
}