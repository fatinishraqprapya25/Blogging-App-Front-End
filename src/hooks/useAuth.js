import { useState, useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const changeLoggedInStatus = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/auth/validate-token", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "token": token
                        },
                    });
                    const result = await response.json();
                    if (!result.success) {
                        localStorage.removeItem("authToken");
                        setLoggedIn(false);
                    } else {
                        setLoggedIn(true);
                    }

                } catch (err) {
                    console.log(err);
                }
            } else {
                setLoggedIn(false);
            }
        }
        changeLoggedInStatus();
    }, []);
    return [isLoggedIn, setLoggedIn];
}

export default useAuth;