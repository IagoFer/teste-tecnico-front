import axios from 'axios';

const state = {
  users: [],
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

const getters = {
  allUsers: (state) => state.users,
  total: (state) => state.total,
  totalPages: (state) => state.totalPages,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  async fetchUsers({ commit }, { search = '', page = 1, perPage = 6 } = {}) {
    commit('fetch_users_request');
    try {
      const params = { search, page, per_page: perPage };
      const response = await axios.get('https://reqres.in/api/users', { params });
      const { data, total, total_pages } = response.data;
      // Adiciona o campo `page` para simular a paginação
      const usersWithPage = data.map(user => ({ ...user, page }));
      commit('fetch_users_success', { users: usersWithPage, total, totalPages: total_pages });
    } catch (error) {
      commit('fetch_users_failure', error);
    }
  },

  async deleteUser({ commit }, userId) {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      commit('removeUser', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },

  async updateUser({ commit }, user) {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, user);
      commit('updateUser', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },

  async addUser({ commit }, user) {
    try {
      const response = await axios.post('https://reqres.in/api/users', user);
      commit('addUser', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  },
};

const mutations = {
  fetch_users_request(state) {
    state.loading = true;
    state.error = null;
  },
  fetch_users_success(state, { users, total, totalPages }) {
    state.users = users;
    state.total = total;
    state.totalPages = totalPages;
    state.loading = false;
  },
  fetch_users_failure(state, error) {
    state.loading = false;
    state.error = error;
  },
  removeUser(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  },
  updateUser(state, updatedUser) {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  addUser(state, newUser) {
    state.users.push(newUser);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
