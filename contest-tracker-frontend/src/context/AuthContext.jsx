// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ct_token'));
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState(() => sessionStorage.getItem('ct_pending_email') || '');

  // Fetch current user whenever we have a token
  const fetchUser = useCallback(async () => {
    const storedToken = localStorage.getItem('ct_token');
    if (!storedToken) {
      setLoading(false);
      return;
    }
    try {
      const data = await authService.me();
      setUser(data);
    } catch {
      // Token invalid/expired — clear it
      localStorage.removeItem('ct_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Called after successful login
  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);
    const jwt = response.token;
    localStorage.setItem('ct_token', jwt);
    setToken(jwt);
    // Fetch user profile
    const profile = await authService.me();
    setUser(profile);
    return profile;
  }, []);

  // Called after registration
  const register = useCallback(async (credentials) => {
    const message = await authService.register(credentials);

    if (message === "User registered successfully. Verify OTP.") {
      setPendingEmail(credentials.email);

      sessionStorage.setItem(
        'ct_pending_email',
        credentials.email
      );
    }

    return message;
  }, []);

  // OTP Verify
  const verifyOtp = useCallback(async ({ email, otp }) => {
    const message = await authService.verifyOtp({ email, otp });
    sessionStorage.removeItem('ct_pending_email');
    setPendingEmail('');
    return message;
  }, []);

  // Resend OTP
  const resendOtp = useCallback(async (email) => {
    return await authService.resendOtp(email);
  }, []);

  // Forgot password
  const forgotPassword = useCallback(async (email) => {
    return await authService.forgotPassword(email);
  }, []);

  // Reset password
  const resetPassword = useCallback(async (payload) => {
    return await authService.resetPassword(payload);
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('ct_token');
    sessionStorage.removeItem('ct_pending_email');
    setToken(null);
    setUser(null);
    setPendingEmail('');
    toast.success('Logged out successfully');
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    pendingEmail,
    setPendingEmail,
    login,
    logout,
    register,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    refreshUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
