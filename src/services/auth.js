import request from "./request";
import { API } from "../constants";

class AuthService {
  async register(userData) {
    try {
      await request.post(API.AUTH.REGISTER, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
      });
      return { done: true, error: null };
    } catch (e) {
      return this.statusWithErrors(e);
    }
  }

  async login(email, password) {
    try {
      const response = await request.post(API.AUTH.LOGIN, {
        email,
        password,
      });
      const userData = {
        ...response.data.user,
        ...response.data.token.original,
      };
      request.setToken(userData.access_token);
      return { done: true, error: null, user: userData };
    } catch (e) {
      return this.statusWithErrors(e);
    }
  }

  async forgotPassword(email) {
    try {
      await request.post(API.AUTH.FORGOT_PASSWORD, { email });
      return { done: true, error: null };
    } catch (e) {
      return this.statusWithErrors(e);
    }
  }

  async resetPassword(email, password, token) {
    try {
      await request.post(API.AUTH.RESET_PASSWORD, {
        email,
        password,
        token,
      });
      return { done: true, error: null };
    } catch (e) {
      return this.statusWithErrors(e);
    }
  }

  logout() {
    request.removeToken();
  }

  async getUser() {
    try {
      const response = await request.get(API.AUTH.ME);
      return response.data;
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }

  isAuthenticated() {
    return request.hasToken();
  }

  statusWithErrors(e) {
    let errors = [];
    if (!e.response.data) {
      errors.push(e.message);
      return { done: true, errors };
    }
    errors.push(e.response.data.message);
    for (const field in e.response.data.errors) {
      errors.push(e.response.data.errors[field]);
    }
    return { done: true, errors };
  }
}

export default new AuthService();
