import React from "react";

export default function Button(props) {
    const { children, styles, onClick } = props;
    return <button onClick={onClick} className={`p-1 rounded-md transition duration-200 font-bold text-sm bg-gray-800 text-center text-white cursor-pointer ${styles}`}>
        {children}
    </button>
}