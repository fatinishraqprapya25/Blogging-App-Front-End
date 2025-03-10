import React, { useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function SendResetPasswordCode() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const requestBody = { email }
        const sentCode = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/sendVc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const result = await sentCode.json();

        setMessage(result.message);
        if (result.success) {
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-center text-gray-800">
                Send Reset Password Code
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-600 text-sm">{message}</p>}

                <Button styles="w-full py-2">
                    Send Code
                </Button>
            </form>
        </div>
    );
}
