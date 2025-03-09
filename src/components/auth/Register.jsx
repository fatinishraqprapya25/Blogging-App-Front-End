import React, { useReducer } from "react";
import Button from "../common/Button";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// Initial form state
const initialState = {
    name: "",
    email: "",
    password: "",
    error: "",
};

// Reducer function to manage form state
function reducer(state, action) {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

export default function Register() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, email, password, error } = state;
    const [isLoggedIn] = useAuth();
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            dispatch({ type: "SET_ERROR", payload: "All fields are required." });
            return;
        }

        dispatch({ type: "SET_ERROR", payload: "" });

        const requestData = { name, email, password };

        try {
            const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (result.success) {
                const token = result.token;
                localStorage.setItem("authToken", token);
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
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) =>
                                dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) =>
                                dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) =>
                                dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
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
