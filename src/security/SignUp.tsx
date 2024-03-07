import {useAuth} from "./AuthProvider.tsx";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const SignUp = () => {
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const [err, setErr] = useState<Error | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.signUp(newUser).then(() => {
        navigate(from, { replace: true });
    })
    .catch((err: Error) => {
        setErr(err);
    });
}

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})}/>
                <input type="text" placeholder="Email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
                <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}/>
                <button type="submit">Sign Up</button>
            </form>
            {err && <p>{err.message}</p>}
        </>
    )
}

export default SignUp;