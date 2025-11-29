const API_BASE_URL = 'http://localhost:5002/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    this.setToken(data.token);
    return data;
  }

  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });
    this.setToken(data.token);
    return data;
  }

  async getImprovements(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/improvements?${params}`);
  }

  async createReport(reportData) {
    return this.request('/reports', {
      method: 'POST',
      body: reportData
    });
  }

  async getReports() {
    return this.request('/reports');
  }

  async getAdminStats() {
    return this.request('/admin/stats');
  }
}

export default new ApiService();