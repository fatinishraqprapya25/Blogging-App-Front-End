import React, { useState, useEffect } from "react";
import Container from "../common/Container";
import Blog from "./Blog";
import Rocket from "../../assets/Rocket.gif"

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

    if (blogs.length === 0) {
    return <div>
        <img className="block mx-auto mt-30" src={Rocket} alt="" />
    </div>
    }
    return <>
        <Container>
            <div className="mt-8 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {blogs.map((blog, index) => {
                    return <Blog id={blog._id} key={index} index={index} blog={blog} />
                })}
            </div>

        </Container>
    </>
}