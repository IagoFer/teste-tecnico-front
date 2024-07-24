import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: '',
  message: ''
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user,
  message: state => state.message
};

const actions = {
  async login({ commit }, user) {
    commit('auth_request');
    try {
      const response = await axios.post('https://reqres.in/api/login', user);
      const token = response.data.token;
      const userData = { email: user.email };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      commit('auth_success', { token, user: userData });
    } catch (error) {
      console.error('Login request failed:', error.response || error.message); // Log de depuração
      commit('auth_error');
      localStorage.removeItem('token');
      throw error;
    }
  },
  async register({ commit }, user) {
    commit('auth_request');
    try {
      await axios.post('https://reqres.in/api/register', user);
      commit('register_success');
    } catch (error) {
      commit('auth_error');
      throw error;
    }
  },
  logout({ commit }) {
    commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  },
  setMessage({ commit }, message) {
    commit('set_message', message);
  }
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },
  auth_success(state, { token, user }) {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = 'error';
    state.token = null;
    state.user = null;
  },
  register_success(state) {
    state.status = 'registered';
  },
  logout(state) {
    state.status = '';
    state.token = null;
    state.user = null;
  },
  set_message(state, message) {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
