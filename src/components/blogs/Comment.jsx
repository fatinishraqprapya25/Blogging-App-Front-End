import React, { useState } from "react";
import { Ellipsis } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

export default function Comment({ comment }) {
    const [showCommentBtns, setShowCommentBtns] = useState(false);

    const decodedUser = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded;
    };

    return <div
        className="p-4 flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg"
    >
        <div>

            <p className="font-semibold text-gray-800">{comment.userName}</p>
            <p className="text-gray-700 mt-1">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-2">
                {comment.date}
            </p>
        </div>

        {decodedUser && <div>
            <button onClick={() => setShowCommentBtns(!showCommentBtns)} className="cursor-pointer">
                <Ellipsis />
            </button>

            {showCommentBtns && <div>
                <button className="text-blue-500 hover:underline block text-sm font-bold mt-[-5px]">Edit</button>
                <button className="text-red-500 hover:underline block text-sm font-bold my-0 mt-[-6px]">Delete</button>
            </div>}
        </div>}

    </div>
}