import React from "react";

export default function Blog({ index, blog }) {
    const maxLength = 100;
    let shorterDescription = blog.description;
    
    if (shorterDescription.length > maxLength) {
        shorterDescription = shorterDescription.substring(0, maxLength) + "...";
    }

    return (
        <div key={index}>
            <h1>{blog.title}</h1>
            <p>{shorterDescription}</p>
        </div>
    );
}
