// src/store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import users from './modules/users';

const store = createStore({
  modules: {
    auth,
    users
  }
});

export default store;
