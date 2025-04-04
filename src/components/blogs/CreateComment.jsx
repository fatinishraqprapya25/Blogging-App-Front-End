import React, { useState } from "react";
import Button from "../common/Button";
import { MessageCircle } from "lucide-react";
import formatDate from "../../utils/formatDate";

export default function CreateComment({ isLoggedIn, blogId, isLoadedComments, setComments }) {
    const [comment, setComment] = useState("");

    const handleComment = async (e) => {
        if (comment.length > 0) {
            e.preventDefault();
            if (!isLoggedIn) {
                alert("User Must be loggedIn");
            } else {
                const data = JSON.stringify({
                    blogId: blogId,
                    text: comment
                });
                const token = localStorage.getItem("authToken");
                const authorization = `Bearer ${token}`
                const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": authorization
                    },
                    body: data
                });
                const result = await response.json();
                if (result.success) {
                    setComment("");
                    const userId = result.data.userId;
                    if (isLoadedComments) {
                        const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/user/${userId}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const authorDetails = await response.json();
                        const author = authorDetails.data.firstName + " " + authorDetails.data.lastName;

                        const comment = { ...result.data, userName: author };
                        comment.date = formatDate(comment.createdAt);

                        setComments(prevComments => [comment, ...prevComments])
                    }
                }
            }
        } else {
            alert("Comment box is empty!");
        }
    }
    return <>

        {/* Comment Form */}
        <form
            onSubmit={handleComment}
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
                    <span className="ml-1">Post</span>
                </Button>
            </div>
        </form>
    </>
}