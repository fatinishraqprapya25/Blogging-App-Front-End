import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To capture the blog ID from the URL
import Container from "../common/Container";

export default function BlogDetail() {
    const { id } = useParams(); // Get the blog ID from URL
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/blogs/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (result.success) {
                console.log(result);
                setBlog(result.data.blog);
            }
        }
        fetchBlog();
    }, [id]);

    if (!blog) return <div>Loading...</div>;

    return (
        <Container>
            <div className="mt-10 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <p className="text-gray-600 mt-2">{blog.writer}</p>
                <p className="text-gray-500 mt-1">{new Date(blog.date).toLocaleDateString()}</p>

                <div className="mt-6">
                    <p>{blog.content}</p>
                </div>

                <div className="mt-8 flex items-center space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Like ({likeCount})
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Comments</h2>
                    <form className="mt-4 space-y-4">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                            Submit Comment
                        </button>
                    </form>

                    <div className="mt-6 space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="border-b pb-4">
                                <p className="font-semibold">{comment.author || "Anonymous"}</p>
                                <p>{comment.text}</p>
                                <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
