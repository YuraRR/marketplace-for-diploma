import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { email: string; name: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const storedAuth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
const initialAuthState: AuthState = storedAuth
  ? { ...JSON.parse(storedAuth), isAuthenticated: true }
  : initialState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.user = { email: action.payload.email, name: action.payload.name };
      state.isAuthenticated = true;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          isAuthenticated: true,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
