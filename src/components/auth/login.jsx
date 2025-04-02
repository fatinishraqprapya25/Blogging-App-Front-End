import React, { useState } from "react";
import Button from "../common/Button";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Input from "./Input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn] = useAuth();

    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }
        setError("");
        const requestData = { email, password };
        const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        const result = await response.json();
        if (result.success) {
            const token = result.token;
            localStorage.setItem("authToken", token);
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

                {error && <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <Input type="email" name="email" id="email" value={email} handler={setEmail} placeholder="Email Address" />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <Input type="password" name="password" id="password" value={password} handler={setPassword} placeholder="Password" />
                    </div>

                    {/* Submit Button */}
                    <Button styles="w-full text-md py-3 hover:bg-black">Login</Button>
                </form>

                <div className="mt-4 text-center text-gray-600">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-gray-800 hover:underline font-medium">Register</Link>
                    </p>
                    <p className="mt-2">
                        <Link to="/forgot-password" className="text-gray-800 font-medium hover:underline">Forgot Password?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

