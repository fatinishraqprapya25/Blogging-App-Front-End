import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Container from "../common/Container";
import { Timer, Pen, ThumbsUp, MessageCircle } from 'lucide-react';
import Button from "../common/Button";
import Footer from "../common/Footer";
import useAuth from "../../hooks/useAuth";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [blogCreatedDate, setCreatedDate] = useState(null);
    const [timeNeedToRead, setTimeNeedToRead] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loadedComments, setLoadedComments] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLoggedIn] = useAuth();

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/blogs/${id}`);
            const result = await response.json();

            if (result.success) {
                const dateStr = result.data.blog.createdAt;
                const date = new Date(dateStr);
                const formattedDate = date.toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "long",
                    day: "2-digit"
                });

                const seconds = result.data.timeNeedsToRead;
                let time = seconds > 60
                    ? `${Math.floor(seconds / 60)} min${seconds % 60 !== 0 ? ` ${seconds % 60}s` : ""}`
                    : `${seconds}s`;

                setTimeNeedToRead(time);
                setLikeCount(result.data.blog.likes.length);
                setCreatedDate(formattedDate);
                setBlog(result.data.blog);
            }
        };
        fetchBlog();
    }, [id]);

    const handleLike = async () => {
        if (isLoggedIn) {
            const token = localStorage.getItem("authToken");
            const authorization = `Bearer ${token}`;

            const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/blogs/like/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorization
                }
            });

            const result = await response.json();
            if (result.success) {
                setLikeCount(prev => prev + 1);
                alert(result.message);
            } else {
                alert(result.message);
            }
        } else {
            alert("User must be logged In!")
        }
    };

    const handleComment = async () => {
        if (!isLoggedIn) {
            alert("User Must be loggedIn");
        } else { 
            
        }
    }

    const loadComments = async () => {
        if (loadedComments) {
            setComments([]);
            setLoadedComments(false);
        } else {
            const commentReq = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/${id}`);
            const result = await commentReq.json();

            const data = result.data;

            if (data !== undefined) {
                const updatedComments = await Promise.all(data.map(async (comment) => {
                    const userId = comment.userId;

                    const userReq = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/user/${userId}`);
                    const user = await userReq.json();
                    const userName = user.data.firstName + " " + user.data.lastName;
                    comment.userName = userName;
                    comment.date = new Date(comment.createdAt).toLocaleDateString("en-GB", {
                        year: "2-digit",
                        month: "long",
                        day: "2-digit"
                    });
                    return comment;
                }));

                setComments(updatedComments);
                setLoadedComments(true);
            } else {
                setComments([]);
                setLoadedComments(true);
            }

        }
    };


    if (!blog) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <Container>
                <div className="mt-10 max-w-3xl mx-auto">
                    {/* Blog Title */}
                    <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                        <div className="flex items-center">
                            <Pen className="w-4 mr-1" />
                            <p className="text-sm">{blogCreatedDate}</p>
                        </div>
                        <div className="flex items-center">
                            <Timer className="w-4 mr-1" />
                            <p className="text-sm">{timeNeedToRead}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <img
                            className="w-full rounded-md"
                            src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?t=st=1741517417~exp=1741521017~hmac=2dedc9b5f7cb82ed33cd0f60d128e8e4ed6f48fdb94032a5bcdb04b0bd7b7e46&w=740"
                            alt="Blog Visual"
                        />
                    </div>

                    {/* Blog Description */}
                    <div className="mt-6 text-gray-800 leading-relaxed">
                        <p>{blog.description}</p>
                    </div>

                    {/* Like Button */}
                    <div className="mt-5 flex items-center">
                        <Button onClick={handleLike} styles="flex items-center px-3 py-1.5">
                            <ThumbsUp className="w-4" />
                            <span className="ml-1">Like</span>
                        </Button>
                        {likeCount > 0 && (
                            <p className="ml-2 text-md font-medium">{likeCount} likes</p>
                        )}
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>

                        {/* Comment Form */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="bg-white"
                        >
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment here..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                rows={4}
                            />
                            <div className="flex justify-end mt-2">
                                <Button styles="flex items-center px-3 py-1.5">
                                    <MessageCircle className="w-4" />
                                    <span className="ml-1">Post Comment</span>
                                </Button>
                            </div>
                        </form>

                        {/* Toggle Comments */}
                        <div className="mt-6">
                            <button
                                className="text-black hover:underline font-medium cursor-pointer"
                                onClick={loadComments}
                            >
                                {loadedComments ? "Hide Comments" : "Load All Comments"}
                            </button>
                        </div>

                        {/* Display Comments */}
                        <div className="mt-6 space-y-6">
                            {
                                loadedComments && comments.length === 0 ? <p>
                                    no comments found!
                                </p> : comments.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                                    >
                                        <p className="font-semibold text-gray-800">{comment.userName}</p>
                                        <p className="text-gray-700 mt-1">{comment.text}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {comment.date}
                                        </p>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <br />
            <Footer />
        </>
    );
}
