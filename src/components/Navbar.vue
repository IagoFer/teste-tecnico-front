<template>
  <nav class="navbar">
    <div class="flex items-center space-x-4">
      <router-link to="/" class="nav-link">Inicio</router-link>
      <router-link v-if="isAuthenticated" to="/painel" class="nav-link">Painel</router-link>
      <router-link v-if="isAuthenticated" to="/usuarios" class="nav-link">Usuários</router-link>
    </div>
    <div class="flex items-center space-x-4">
      <router-link v-if="!isAuthenticated" to="/entrar" class="nav-link">Entrar</router-link>
      <router-link v-if="!isAuthenticated" to="/registrar" class="nav-link">Registrar</router-link>
      <button v-if="isAuthenticated" @click="handleLogout" class="nav-link">Sair</button>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout', 'setMessage']),
    handleLogout() {
      this.logout();
      this.setMessage('Você foi deslogado com sucesso.');
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
}

nav a:hover {
  background-color: #444;
}

button {
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #444;
}
</style>
