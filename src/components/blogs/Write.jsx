import React, { useState } from "react";
import Container from "../common/Container";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Button from "../common/Button";

export default function Write() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Navbar />
            <Container>

                <div className="md:w-3/4 mx-auto p-6 bg-white shadow-md rounded-lg my-[50px]">
                    <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>

                    {/* Title Input */}
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter your title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Description Input */}
                    <textarea
                        className="w-full p-2 border rounded-md mb-4 h-40 outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Write your description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Image Upload */}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
                    {image && <img src={image} alt="Preview" className="w-full h-40 object-cover rounded-md mb-4" />}

                    {/* Submit Button */}
                    <Button styles="block w-full py-3 text-md">Publish</Button>
                </div>
            </Container>

            <Footer />

        </>
    );
}
