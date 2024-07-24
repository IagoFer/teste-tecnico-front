<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Acesso</h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <Field
            name="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            :class="{ 'border-red-500': errors.email }"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <Field
            name="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            :class="{ 'border-red-500': errors.password }"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>

        <button type="submit" class="w-full py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
          Entrar
        </button>
        <p v-if="loginError" class="text-red-500 text-sm mt-2 text-center">{{ loginError }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useField, useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginError = ref(null);

    const { handleSubmit, errors } = useForm({
      validationSchema: yup.object({
        email: yup.string().required('O e-mail é obrigatório').email('Deve ser um e-mail válido'),
        password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
      }),
    });

    const { value: email } = useField('email');
    const { value: password } = useField('password');

    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch('auth/login', values);
        router.push('/painel');
      } catch (error) {
        console.error('Login falhou:', error);
        loginError.value = 'Login falhou, por favor verifique suas credenciais.';
      }
    });

    return {
      email,
      password,
      errors,
      onSubmit,
      loginError,
    };
  },
});
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
