import React, { useState } from "react";
import { Ellipsis } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import Button from "../common/Button";

export default function Comment({ comment, setComments }) {
    const [showCommentBtns, setShowCommentBtns] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const decodedUser = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;
        const decoded = jwtDecode(token);
        if (decoded.id === comment.userId) return decoded;
        return null;
    };

    const deleteComment = async () => {
        const confirmation = confirm("Are you sure to delete?");
        if (confirmation) {
            const commentId = comment._id;
            const token = localStorage.getItem("authToken");
            const authorization = `Bearer ${token}`;
            const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorization
                }
            });
            const result = await response.json();
            if (result.success) {
                alert(result.message);
                setComments(prevComments => prevComments.filter(comment => comment._id !== result.data._id));
                setShowCommentBtns(false);
            }

        }
    }

    const editComment = async (oldText) => {
        if (oldText !== newComment) {
            const token = localStorage.getItem("authToken");
            const authorization = `Bearer ${token}`;
            const commentId = comment._id;
            const data = JSON.stringify({ text: newComment });
            const response = await fetch(`https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorization
                },
                body: data
            });
            const updatedComment = await response.json();
            setIsEditing(false);
            alert("Comment updated successfully, reload comments section to see changes!");
        }
    }

    return <div
        className="p-4 flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg"
    >
        <div>

            <p className="font-semibold text-gray-800">{comment.userName}</p>
            <p className="text-gray-700 mt-1">
                {!isEditing ? comment.text : <>
                    <input className="border-2 py-0 px-2 rounded-md mr-2" onChange={(e) => setNewComment(e.target.value)} value={newComment} />
                    <Button onClick={() => editComment(comment.text)}>Update</Button>
                </>}
            </p>
            <p className="text-xs text-gray-500 mt-2">
                {comment.date}
            </p>
        </div>

        {decodedUser() && <div>
            <button onClick={() => setShowCommentBtns(!showCommentBtns)} className="cursor-pointer">
                <Ellipsis />
            </button>

            {showCommentBtns && <div>
                <button onClick={() => {
                    setIsEditing(true);
                    setNewComment(comment.text);
                }} className="text-blue-500 hover:underline block text-sm font-bold mt-[-5px] cursor-pointer">Edit</button>
                <button onClick={deleteComment} className="text-red-500 hover:underline block text-sm font-bold my-0 mt-[-6px] cursor-pointer">Delete</button>
            </div>}
        </div>}

    </div>
}