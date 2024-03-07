import { useAuth } from "./AuthProvider";
import {Link, NavLink} from "react-router-dom";

const AuthStatus = () => {
    const auth = useAuth();

    if (!auth.isLoggedIn()) {
        return (
            <>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink to="/user-with-role">Sign Up</NavLink>
            </li>
            </>
        );
    } else {
        return (
            <li>
                <Link to="/logout">Logout (Logged in as {auth.username}) </Link>
            </li>
        );
    }
}

export default AuthStatus;
