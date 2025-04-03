import React, { useEffect, useState } from "react";
import generateUserNameFromUserModel from "../../utils/generateUserNameFromUserModel";
import formatDate from "../../utils/formatDate";
import { jwtDecode } from "jwt-decode";
import { Ellipsis } from "lucide-react";

export default function Reply({ commentId, reply, setReplies }) {
    const [userName, setUserName] = useState("");
    const [showReplyBtns, setShowReplyBtns] = useState(false);
    const userId = reply.userId;
    const date = formatDate(reply.createdAt);

    useEffect(() => {
        const fetchUserName = async () => {
            const uName = await generateUserNameFromUserModel(userId);
            setUserName(uName);
        };
        fetchUserName();
    }, [userId]);

    const decodedUser = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded.id === reply.userId ? decoded : null;
    };

    const deleteReply = async () => {
        const token = localStorage.getItem("authToken");
        const authorization = `Bearer ${token}`;
        const replyId = reply._id;

        const response = await fetch(
            `https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/comments/reply/${commentId}/${replyId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization,
                },
            }
        );

        const deletedReply = await response.json();
        if (deletedReply.success) {
            setReplies((prevReplies) =>
                prevReplies.filter((r) => r._id !== replyId)
            );
            setShowReplyBtns(false);
        }
    };

    return (
        <div className="mb-1 p-2 bg-gray-100 rounded-md flex justify-between items-center">
            <div>
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-sm text-gray-700">{reply.text}</p>
                <p className="text-xs text-gray-500">{date}</p>
            </div>

            {decodedUser() && (
                <div>
                    <button
                        onClick={() => setShowReplyBtns(!showReplyBtns)}
                        className="cursor-pointer"
                    >
                        <Ellipsis />
                    </button>

                    {showReplyBtns && (
                        <div>
                            <button className="text-blue-500 hover:underline block text-sm font-bold mt-[-5px] cursor-pointer">
                                Edit
                            </button>
                            <button
                                onClick={deleteReply}
                                className="text-red-500 hover:underline block text-sm font-bold my-0 mt-[-6px] cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
