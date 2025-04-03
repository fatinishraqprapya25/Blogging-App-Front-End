import React, { useEffect, useState } from "react";
import generateUserNameFromUserModel from "../../utils/generateUserNameFromUserModel";
import formatDate from "../../utils/formatDate";

export default function Reply({ reply }) {
    console.log(reply);
    const [userName, setUserName] = useState("");
    const userId = reply.userId;
    const date = formatDate(reply.createdAt);
    useEffect(() => {
        (async () => {
            const uName = await generateUserNameFromUserModel(userId);
            setUserName(uName);
        })()
    }, []);

    return <div key={reply._id} className="mb-2 p-2 bg-gray-100 rounded-md">
        <p className="text-sm font-semibold">{userName}</p>
        <p className="text-sm text-gray-700">{reply.text}</p>
        <p className="text-xs text-gray-500">{date}</p>
    </div>
}