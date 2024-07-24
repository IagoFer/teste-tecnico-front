<template>
  <transition name="modal-fade">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">×</button>
        <h2>Edição de Usuário</h2>
        <form @submit.prevent="handleSubmit" class="form-content">
          <div class="form-group">
            <label for="firstName">Primeiro Nome</label>
            <input type="text" v-model="formData.first_name" required />
          </div>
          <div class="form-group">
            <label for="lastName">Último Nome</label>
            <input type="text" v-model="formData.last_name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="formData.email" required />
          </div>
          <div class="modal-buttons">
            <button type="submit" class="btn-submit">Salvar</button>
            <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      formData: { ...this.user }, // Cria uma cópia dos dados do usuário
      showModal: false, // Controla a exibição do modal
    };
  },
  mounted() {
    this.showModal = true;
  },
  methods: {
    handleSubmit() {
      // Aqui você deve enviar os dados do formulário para a API ou Vuex
      this.$emit('form-submitted', this.formData);
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.form-content {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus {
  border-color: #007bff;
  outline: none;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.btn-cancel {
  background-color: #6c757d;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.close-modal {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #555;
}

.close-modal:hover {
  color: #000;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
