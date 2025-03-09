import { useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const changeLoggedInStatus = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await fetch("https://blogging-app-api-using-express-mongo-db-iwvr.vercel.app/api/v1/validate-token");
                    if (!response.ok) {
                        localStorage.removeItem("authToken");
                        setLoggedIn(false);
                    } else {
                        setLoggedIn(true);
                    }

                } catch (err) {

                }
            } else {
                setLoggedIn(false);
            }
        }
        changeLoggedInStatus();
        return { isLoggedIn };
    }, []);
}

export default useAuth;