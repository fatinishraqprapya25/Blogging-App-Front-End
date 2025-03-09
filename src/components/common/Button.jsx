import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
    const { children, path, styles } = props;
    return <Link to={path} className={`p-1 rounded-md hover:text-black transition duration-150 font-bold text-sm bg-gray-800 text-center ${styles}`}>
        {children}
    </Link>
}