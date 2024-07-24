<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <span class="close-btn" @click="close">&times;</span>
        <h3>Criar Novo Usuário</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input v-model="user.name" id="name" type="text" required />
          </div>
  
          <div class="form-group">
            <label for="job">Cargo:</label>
            <input v-model="user.job" id="job" type="text" required />
          </div>
  
          <div class="modal-buttons">
            <button type="submit" class="btn-primary">Criar</button>
            <button @click="close" class="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: '',
          job: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await this.$store.dispatch('users/addUser', this.user);
          this.$emit('form-submitted');
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
        }
      },
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 500px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #333;
  }
  
  h3 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    transform: scale(1.02);
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
    transform: scale(1.02);
  }
  </style>
  