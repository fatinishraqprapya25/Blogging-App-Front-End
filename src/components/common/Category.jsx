import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

export default function Category() {
    const categories = [
        "Programming",
        "Development",
        "JavaScript",
        "Python",
        "Skills",
        "Communication",
        "Spoken English",
        "Grammer",
        "Mobile",
        "Desktop",
        "Laptop",
        "Gaming",
        "Ethical Hacking",
        "Cyber Security"
    ];

    return (
        <Container>
            <div className="flex flex-wrap gap-3 mt-6 ms-1">
                {categories.map((category, index) => {
                    return (
                        <Link
                            key={index}
                            to={`/category/${category.toLowerCase().split(" ").join("-")}`}
                            className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm hover:bg-black transition m-[-3px]"
                        >
                            {category}
                        </Link>
                    );
                })}
            </div>
        </Container>
    );
}
