<template>
  <div class="container">
    <h1>Busca de Usuários</h1>
    <div class="alert-card">
      <p>Não é necessário estar logado para realizar a busca. Mas se quiser fazer alguma ação efetue o login.</p>
      <p>Existem id de 1 a 12</p>
    </div>
    <div class="search-container">
      <input v-model="userId" type="text" placeholder="Digite o ID do usuário" class="input-search" />
      <button @click="fetchUser" class="btn-search">Buscar</button>
    </div>
    <transition name="fade">
      <div v-if="user" class="user-card">
        <img :src="user.avatar" alt="User Avatar" class="avatar" />
        <div class="user-info">
          <h3>{{ user.first_name }} {{ user.last_name }}</h3>
          <p>Email: {{ user.email }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      user: null,
    };
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${this.userId}`);
        this.user = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

h1 {
  text-align: center;
  margin-bottom: 16px;
  font-size: 2rem;
  color: #333;
}

.alert-card {
  background-color: #ffecb3;
  border-left: 5px solid #fbc02d;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.alert-card p {
  margin: 0;
  color: #333;
}

.search-container {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-search {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-search {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-search:hover {
  background-color: #0056b3;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.user-info {
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
