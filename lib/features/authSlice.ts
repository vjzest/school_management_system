import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  admin: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  admin: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin') || 'null') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ admin: any; token: string }>
    ) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('admin', JSON.stringify(action.payload.admin));
      }
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
