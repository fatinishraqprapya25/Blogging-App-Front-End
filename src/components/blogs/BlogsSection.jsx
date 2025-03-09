import React, { useState, useEffect } from "react";
import Container from "../common/Container";

export default function BlogsSection() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/blogs");
            const result = await response.json();
            setBlogs(result.data);
        }
        fetchBlogs();
    }, []);

    return <>
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

            </div>

        </Container>
    </>
}