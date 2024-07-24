<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Registrar</h1>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        <button type="submit" class="w-full py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
          Registrar
        </button>
        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  computed: {
    ...mapGetters('auth', ['authStatus'])
  },
  methods: {
    ...mapActions('auth', ['register', 'setMessage']),
    async registerUser() {
      try {
        this.error = null; // Reset error state
        await this.register({ email: this.email, password: this.password });
        if (this.authStatus === 'registered') {
          this.setMessage('Registro bem-sucedido. Por favor, faça login.');
          this.$router.push('/entrar');
        } else {
          this.error = 'Registro falhou.';
        }
      } catch (error) {
        console.error('Erro de registro:', error);
        this.error = 'Registro falhou: ' + (error.response ? error.response.data.error : error.message);
      }
    }
  }
};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f3f4f6;
}

.border-red-500 {
  border-color: #ef4444;
}

.focus:ring-indigo-500 {
  --tw-ring-color: #6366f1;
}

button {
  font-weight: 500;
  font-size: 1rem;
}
</style>
