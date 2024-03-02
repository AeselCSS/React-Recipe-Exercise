import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";


type Props = {
    children: React.ReactNode;
    roles?: string[];
};
const RequireAuth = ({ children, roles }: Props) => {
    const auth = useAuth();


    const location = useLocation();
    if (roles) {
        if (!auth.isLoggedInAs(roles)) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }
    if (!auth.username) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default RequireAuth;