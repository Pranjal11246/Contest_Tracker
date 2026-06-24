// src/services/authService.js
import api from './api';

export const authService = {
  /**
   * POST /auth/register
   * Returns plain string message
   */
  register: async ({ email, password }) => {
    const { data } = await api.post('/auth/register', { email, password });
    return data; // "User registered successfully. Verify OTP."
  },

  /**
   * POST /auth/verify
   * Returns plain string message
   */
  verifyOtp: async ({ email, otp }) => {
    const { data } = await api.post('/auth/verify', { email, otp });
    return data;
  },

  /**
   * POST /auth/resend-otp?email=...
   * Returns plain string message
   */
  resendOtp: async (email) => {
    const { data } = await api.post(`/auth/resend-otp?email=${encodeURIComponent(email)}`);
    return data;
  },

  /**
   * POST /auth/login
   * Returns { token: "..." }
   */
  login: async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data; // { token }
  },

  /**
   * POST /auth/forgot-password
   * Returns plain string
   */
  forgotPassword: async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  /**
   * POST /auth/reset-password
   * Returns plain string
   */
  resetPassword: async ({ email, otp, newPassword }) => {
    const { data } = await api.post('/auth/reset-password', { email, otp, newPassword });
    return data;
  },

  /**
   * GET /user/me — requires JWT
   * Returns { email, role, verified }
   */
  me: async () => {
    const { data } = await api.get('/user/me');
    return data;
  },
};
