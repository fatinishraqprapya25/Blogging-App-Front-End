import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Container from "../common/Container";
import { Timer, Pen, ThumbsUp, MessageCircle } from 'lucide-react';
import Button from "../common/Button";
import Footer from "../common/Footer";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [blogCreatedDate, setCreatedDate] = useState(null);
    const [timeNeedToRead, setTimeNeedToRead] = useState("");
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
                // format the date
                const dateStr = result.data.blog.createdAt;
                const date = new Date(dateStr);
                const formattedDate = date.toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "long",
                    day: "2-digit"
                });

                // calculate time to read
                let time = "";
                const timesInSecond = result.data.timeNeedsToRead;
                if (timesInSecond > 60) {
                    const minute = (timesInSecond - (timesInSecond % 60)) / 60;
                    const second = timesInSecond % 60;
                    time = minute + " minutes " + second !== 0 ? second + " second" : "";
                } else {
                    time = timesInSecond + " second";
                }
                setTimeNeedToRead(time);

                // calculate likes
                const likesLength = result.data.blog.likes.length;
                setLikeCount(likesLength);

                setCreatedDate(formattedDate);
                setBlog(result.data.blog);

                // load comments
                const commentReq = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const comments = await commentReq.json();
                setComments(comments.data);
            }
        };
        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        const token = localStorage.getItem("authToken");
        const authorization = `Bearer ${token}`;
        console.log(token);
        console.log(id);
        const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/blogs/like/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        });
        const result = await response.json();
        if (result.success) {
            setLikeCount(likeCount + 1);
            alert(result.message);
        } else {
            alert(result.message);
        }
    }

    if (!blog) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <Container>
                <div className="mt-10 max-w-3xl mx-auto">
                    {/* Blog Title */}
                    <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>

                    <div className="flex">
                        {/* Blog Date */}
                        <div className="flex items-center mt-2 text-gray-600">
                            <Pen style={{ width: "17px" }} className="mr-1 text-md" />
                            <p className="text-sm">{blogCreatedDate}</p>
                        </div>

                        {/* time need to read */}
                        <div className="flex items-center mt-2 text-gray-600 ms-3">
                            <Timer style={{ width: "17px" }} className="mr-1 text-md" />
                            <p className="text-sm">{timeNeedToRead}</p>
                        </div>

                    </div>

                    <div>
                        <img src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?t=st=1741517417~exp=1741521017~hmac=2dedc9b5f7cb82ed33cd0f60d128e8e4ed6f48fdb94032a5bcdb04b0bd7b7e46&w=740" alt="Blog Image" />
                    </div>

                    {/* Blog Description */}
                    <div className="mt-6 text-gray-800">
                        <p>{blog.description}</p>
                    </div>

                    {/* Like Button */}
                    <div className="mt-5 flex items-center">
                        <Button onClick={handleLike} styles="flex items-center px-2">
                            <ThumbsUp style={{ width: "16px" }} />
                            <span className="block ms-1">Like</span>
                        </Button>
                        <p className="text-md font-medium ms-2">{likeCount > 0 ? `${likeCount} likes` : ""}</p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-900">Comments</h2>

                        {/* Comment Form */}
                        <form className="mt-4 space-y-4">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                            <Button styles="flex items-center px-2">
                                <MessageCircle style={{ width: "16px" }} />
                                <span className="block ms-1">Comment</span>
                            </Button>
                        </form>

                        {/* Display Comments */}
                        <div className="mt-6 space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className=" pb-4">
                                    <p className="font-semibold">{comment.author || "Anonymous"}</p>
                                    <p>{comment.text}</p>
                                    <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <br />
            <Footer />
        </>
    );
}
