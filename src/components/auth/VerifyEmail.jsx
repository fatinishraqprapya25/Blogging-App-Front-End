import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";

export default function VerifyEmail() {
    const [error, setError] = useState("");
    const [code, setCode] = useState();
    const [timeLeft, setTimeLeft] = useState(120);

    const location = useLocation();
    const prevState = location.state;
    const navigate = useNavigate();
    if (!prevState?.email) {
        navigate("/");
    }

    useEffect(() => {
        const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const length = code.toString().length;
        if (length < 6 || length > 6) {
            setError("Code must be 6 digits");
        }
        try {
            const requestBody = { email: prevState.email, code };
            const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            const result = await response.json();
            if (result.success) {
                alert(result.message);
                navigate("/");
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">Verify Code </h2>

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-md mb-3 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Verification Code */}
                    <div className="mb-3">
                        <label htmlFor="code" className="block text-gray-700 font-semibold mb-1">Enter Verification Code</label>
                        <Input type="number"
                            id="code"
                            value={code}
                            handler={setCode}
                            placeholder="Verification Code" />
                    </div>

                    <div className="text-center text-gray-600 mb-3">
                        <p>Time Left: {timeLeft}s</p>
                    </div>

                    <Button styles="w-full text-md py-3 hover:bg-black">Verify</Button>
                </form>
            </div>
        </div>
    </>
}