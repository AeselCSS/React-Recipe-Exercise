import { createContext, useState, ReactNode } from "react";
import { authProvider, User } from "../services/authFacade";
import { useContext } from "react";


interface AuthContextType {
    username: string|null;
    signIn: (user: User) => Promise<LoginResponse>;
    signOut: () => void;
    signUp: (user: SignUpRequest) => Promise<SignUpResponse>;
    isLoggedIn: () => boolean;
    isLoggedInAs: (role: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    //We use this to distinguish between being logged in or not
    const initialUsername = localStorage.getItem("username")||null
    const [username, setUsername] = useState<string | null>(initialUsername);

    const signIn = async (user_: LoginRequest) => {
        return authProvider.signIn(user_).then((user) => {
            setUsername(user.username)
            localStorage.setItem("username",user.username)
            localStorage.setItem("roles",JSON.stringify(user.roles))
            localStorage.setItem("token",user.token)
            return user;
        });
    };

    //Observe how we can sign user out without involving the backend (is that (always) good?)
    const signOut = () => {
        setUsername(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
    };

    const signUp = async (user: SignUpRequest):Promise<SignUpResponse> => {
        return authProvider.signUp(user).then((user) => {
            return user as SignUpResponse;
        });
    }

    const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const exp = jwtPayload.exp;

    if (!exp) {
        return false;
    }

    const expirationDate = new Date(exp * 1000);
    if (new Date() > expirationDate) {
        signOut();
        return false;
    }

    return username != null;
}

    const isLoggedInAs = (role: string[]) => {
        const roles:Array<string> = JSON.parse(localStorage.getItem("roles") || '[]');
        return roles?.some((r) => role.includes(r)) || false;
    }

    const value = { username, isLoggedIn, isLoggedInAs, signIn, signOut, signUp };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;