// services/authService.js
import axios from 'axios';
import baseurl from './base';

const API_URL = baseurl;

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }

  getCurrentAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();