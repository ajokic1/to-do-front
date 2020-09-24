export const LOCAL_STORAGE_TOKEN = 'token';

export const API = {
  BASE: 'http://localhost:8000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/users',
    REFRESH: '/auth/refresh',
    INVALIDATE: '/auth/invalidate',
    FORGOT_PASSWORD: '/auth/forgot',
    RESET_PASSWORD: '/auth/reset',
    ME: '/auth/me',
  },
  TODOS: '/todos'
}

export const ROUTES = {
  HOME: "/",
  AUTH: {
    BASE: "/auth",
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    FORGOT: "/auth/forgot",
    LOGOUT: "/auth/logout",
    RESET: "/password/reset/:token",
  },
  TODOS: {
    EDIT: "/edit",
    CREATE: "/create"
  }
}