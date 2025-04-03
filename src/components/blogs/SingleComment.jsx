import React, { useState } from "react";
import { Ellipsis } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Button from "../common/Button";
import Reply from "./Reply";

export default function Comment({ comment, setComments }) {
    const [showCommentBtns, setShowCommentBtns] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [replyValue, setReplyValue] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState(comment.replies); // Manage replies here

    const decodedUser = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded.id === comment.userId ? decoded : null;
    };

    const deleteComment = async () => {
        const confirmation = confirm("Are you sure to delete?");
        if (confirmation) {
            const token = localStorage.getItem("authToken");
            const authorization = `Bearer ${token}`;
            const response = await fetch(
                `https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/${comment._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorization,
                    },
                }
            );
            const result = await response.json();
            if (result.success) {
                alert(result.message);
                setComments((prev) =>
                    prev.filter((c) => c._id !== result.data._id)
                );
            }
        }
    };

    const editComment = async (oldText) => {
        if (oldText !== newComment) {
            const token = localStorage.getItem("authToken");
            const authorization = `Bearer ${token}`;
            const data = JSON.stringify({ text: newComment });
            const response = await fetch(
                `https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/${comment._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorization,
                    },
                    body: data,
                }
            );
            const updatedComment = await response.json();
            setIsEditing(false);
            setComments((prev) =>
                prev.map((c) =>
                    c._id === updatedComment.data._id
                        ? { ...c, text: updatedComment.data.text }
                        : c
                )
            );
            alert("Comment updated successfully!");
        } else {
            setIsEditing(false);
        }
    };

    const handleReply = async () => {
        if (!replyValue.trim()) return;
        const token = localStorage.getItem("authToken");
        const authorization = `Bearer ${token}`;
        const response = await fetch(
            `https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/reply/${comment._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization,
                },
                body: JSON.stringify({ text: replyValue }),
            }
        );
        const replyData = await response.json();

        if (replyData.success) {
            setReplies((prev) => replyData.data.replies);
            setReplyValue("");
            setShowReplyBox(false);
        }
    };

    return (
        <>
            <div className="p-3 flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                    <p className="font-semibold text-gray-800">{comment.userName}</p>
                    <p className="text-gray-700 mt-1">
                        {!isEditing ? (
                            comment.text
                        ) : (
                            <>
                                <input
                                    className="border-2 py-0 px-2 rounded-md mr-2"
                                    onChange={(e) => setNewComment(e.target.value)}
                                    value={newComment}
                                />
                                <Button onClick={() => editComment(comment.text)}>Update</Button>
                            </>
                        )}
                    </p>
                    <div className="flex">
                        <button
                            className="font-medium underline cursor-pointer text-sm text-gray-600"
                            onClick={() => setShowReplyBox(!showReplyBox)}
                        >
                            reply
                        </button>
                        <button
                            className="text-sm font-medium text-gray-600 ms-3 underline"
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {replies.length} {replies.length === 1 ? "reply" : "replies"}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-0">{comment.date}</p>
                </div>

                {decodedUser() && (
                    <div>
                        <button
                            onClick={() => setShowCommentBtns(!showCommentBtns)}
                            className="cursor-pointer"
                        >
                            <Ellipsis />
                        </button>

                        {showCommentBtns && (
                            <div>
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setNewComment(comment.text);
                                    }}
                                    className="text-blue-500 hover:underline block text-sm font-bold mt-[-5px] cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={deleteComment}
                                    className="text-red-500 hover:underline block text-sm font-bold my-0 mt-[-6px] cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Create Reply Interface */}
            {showReplyBox && (
                <div className="ml-5 mt-2">
                    <input
                        className="border-0 rounded-md bg-gray-100 px-3 py-1 outline-0 mr-2"
                        type="text"
                        value={replyValue}
                        onChange={(e) => setReplyValue(e.target.value)}
                        placeholder="Enter reply here"
                    />
                    <Button onClick={handleReply}>Post</Button>
                </div>
            )}

            {/* Display Replies */}
            {showReplies && (
                <div className="ml-8 mt-2 border-l-2 border-gray-200 pl-4">
                    {replies.length > 0 ? (
                        replies.map((reply) => (
                            <Reply
                                key={reply._id}
                                commentId={comment._id}
                                reply={reply}
                                setReplies={setReplies} // Pass setReplies
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No replies yet.</p>
                    )}
                </div>
            )}
        </>
    );
}
