import React, { useState, useEffect } from "react";
import Container from "../common/Container";
import Blog from "./Blog";

export default function BlogsSection() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/blogs");
            const result = await response.json();
            setBlogs(result.data.blogs);
        }
        fetchBlogs();
    }, []);

    return <>
        <Container>
            <div className="mt-8 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {blogs.map((blog, index) => {
                    return <Blog key={index} index={index} blog={blog} />
                })}
            </div>

        </Container>
    </>
}