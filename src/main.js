import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';

const app = createApp(App);

// Carrega o token do localStorage
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token) {
  store.commit('auth/auth_success', { token, user }); // Certifique-se de usar o namespace do módulo
}

app.use(store).use(router).mount('#app');
