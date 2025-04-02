import React, { useState } from "react";
import Button from "../common/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [code, setCode] = useState();
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const prevState = location.state;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 1 || cpassword.length < 1 || String(code).length < 6) {
            setError("Fill out for form properly!");
        } else {
            if (password !== cpassword) {
                setError("Password doesn't match!")
                return;
            }
            const requestBody = { password, code, email: prevState.email };
            const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/resetPass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            const result = await response.json();
            if (result.success) {
                setError(null);
                setMessage(result.message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError(result.message);
            }
        }
    }

    return <>
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-center text-gray-800">
                Enter Code & Reset Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Your Code
                    </label>
                    <input
                        id="code"
                        type="number"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter 6 digits code"
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Create Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create Password"
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        id="cpassword"
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-600 text-sm">{message}</p>}

                <Button styles="w-full py-2">
                    Change Password
                </Button>
            </form>
        </div>
    </>
}