import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Input from "./Input";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [isLoggedIn] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !phone) {
            setError("All fields are required.");
            return;
        }

        setError("");

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        if (avatar) {
            formData.append("profile", avatar);
        }

        try {
            const response = await fetch(
                "https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (result.success) {
                navigate("/verify", { state: { email } });
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">Register</h2>

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-md mb-3 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Avatar Upload */}
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-1">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                                       file:rounded-md file:border-0 
                                       file:text-sm file:font-semibold 
                                       file:bg-blue-50 file:text-blue-700 
                                       hover:file:bg-blue-100"
                        />
                    </div>

                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-1">
                            First Name
                        </label>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            handler={setFirstName}
                            placeholder="First Name"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-1">
                            Last Name
                        </label>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            handler={setLastName}
                            placeholder="Last Name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                            Email
                        </label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            handler={setEmail}
                            placeholder="Email Address"
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                            Phone Number
                        </label>
                        <Input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={phone}
                            handler={setPhone}
                            placeholder="Contact Number"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                        />
                    </div>

                    <Button styles="w-full text-md py-3 hover:bg-black">Register</Button>
                </form>

                <div className="mt-4 text-center text-gray-600">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-gray-800 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
