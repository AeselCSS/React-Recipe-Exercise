import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Logout = () => {
    const auth = useAuth();
    const [isLogoutActive, setIsLogoutActive] = useState(true);

    useEffect(() => {
        if (isLogoutActive) {
            auth.signOut();
        }

        return () => {
            setIsLogoutActive(false);
        };
    }, [isLogoutActive]);

    return <Navigate to="/" replace= {true} />;
}

export default Logout;