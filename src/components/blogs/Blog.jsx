import React from "react";
import { Link } from "react-router-dom";

export default function Blog({ index, blog }) {
    const maxLength = 70;
    let shorterDescription = blog.description;

    if (shorterDescription.length > maxLength) {
        shorterDescription = shorterDescription.substring(0, maxLength) + "...";
    }

    return (
        <div
            key={index}
            className="relative w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
        >
            {/* Blog Image */}
            <img
                src={"https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?t=st=1741517417~exp=1741521017~hmac=2dedc9b5f7cb82ed33cd0f60d128e8e4ed6f48fdb94032a5bcdb04b0bd7b7e46&w=740"}
                alt={blog.title}
                className="w-full h-64 object-cover"
            />

            {/* Title and Description Container */}
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for readability */}

            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
                <h1 className="text-2xl font-bold mb-4 leading-7">{blog.title}</h1>
                <p className="text-lg mb-4 leading-5">{shorterDescription}</p>
                <Link
                    href={`/blog/${blog._id}`}
                    className="text-white bg-gray-800 d-block w-[95px] py-1 text-center rounded-md hover:bg-black text-sm font-bold transition duration-150"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}
