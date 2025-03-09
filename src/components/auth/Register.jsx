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

        const requestData = { firstName, lastName, email, password, phone };

        try {
            const response = await fetch(
                "https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            const result = await response.json();

            if (result.success) {
                localStorage.setItem("authToken", result.token);
                navigate("/");
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert("Something went wrong. Please try again.");
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
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-1">
                            First Name
                        </label>
                        <Input type="fisrtName" name="firstName" id="firstName" value={firstName} handler={setFirstName} placeholder="First Name" />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-1">
                            Last Name
                        </label>
                        <Input type="lastName" name="lastName" id="lastName" value={lastName} handler={setLastName} placeholder="Last Name" />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                            Email
                        </label>
                        <Input type="email" name="email" id="firstName" value={email} handler={setEmail} placeholder="First Name" />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                            Phone Number
                        </label>
                        <Input type="phone" name="phone" id="phone" placeholder="Contact Number" value={phone} handler={setPhone} />
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
