import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const LOGIN_URL = API_URL + "/api/auth/login";
const SIGNUP_URL = API_URL + "/api/user-with-role";

export type User = { username: string; password: string; roles?: string[] };

const authProvider = {
  isAuthenticated: false,
  async signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    const res = await fetch(LOGIN_URL, options);
    return handleHttpErrors(res);
  },

  async signUp(newUser: SignUpRequest): Promise<SignUpResponse> {
    const options = makeOptions("POST", newUser);
    const res = await fetch(SIGNUP_URL, options);
    return handleHttpErrors(res);
  },
};

export { authProvider };
