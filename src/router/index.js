import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import UserList from '../components/UserList.vue';
import UserManagement from '../components/UserManagement.vue'; // Importando o novo componente
import store from '../store';

const routes = [
  { path: '/', name: 'UserManagement', component: UserManagement }, // Substituindo HomePage por UserManagement
  { path: '/entrar', name: 'Entrar', component: LoginPage },
  { path: '/registrar', name: 'Registrar', component: RegisterPage },
  {
    path: '/painel',
    name: 'Painel',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: UserList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (requiresAuth && !isAuthenticated) {
    next('/entrar');
  } else {
    next();
  }
});

export default router;
