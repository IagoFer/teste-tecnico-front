<template>
  <div class="container">
    <!-- Alerta de sucesso -->
    <transition name="alert-fade">
      <div v-if="successMessage" class="alert success">
        {{ successMessage }}
      </div>
    </transition>

    <!-- Alerta de erro -->
    <transition name="alert-fade">
      <div v-if="errorMessage" class="alert error">
        {{ errorMessage }}
      </div>
    </transition>

    <!-- Modal de confirmação -->
    <transition name="modal-fade">
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal-content">
          <p>Tem certeza de que deseja excluir este usuário?</p>
          <div class="modal-buttons">
            <button @click="confirmDelete" class="btn-confirm">Sim</button>
            <button @click="cancelDelete" class="btn-cancel">Não</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Botão para criar um novo usuário -->
    <button @click="showCreateUserModal" class="btn-create">Novo Usuário</button>

    <!-- Modal de criação de usuário -->
    <transition name="modal-fade">
      <CreateUserForm
        v-if="showCreateUser"
        @form-submitted="handleCreateUserSubmitted"
        @close="closeCreateUserModal"
      />
    </transition>

    <!-- Modal de edição de usuário -->
    <transition name="modal-fade">
      <UserForm
        v-if="editMode"
        :user="selectedUser"
        @form-submitted="handleEditUserSubmitted"
        @close="closeEditUserModal"
      />
    </transition>

    <input 
      v-model="search" 
      @input="onSearch" 
      placeholder="Procurar usuário..." 
      class="input-search" 
    />
    <ul class="user-list">
      <li v-for="user in filteredUsers" :key="user.id" class="user-card">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <div class="user-info">
          <div class="user-name">{{ user.first_name }} {{ user.last_name }}</div>
          <div class="user-email">{{ user.email }}</div>
        </div>
        <div class="user-actions">
          <button class="btn-edit" @click="editUser(user)">Editar</button>
          <button class="btn-delete" @click="promptDelete(user.id)">Excluir</button>
        </div>
      </li>
    </ul>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="updatePage"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Pagination from './Pagination.vue';
import CreateUserForm from './CreateUserForm.vue'; // Componente para criação
import UserForm from './UserForm.vue'; // Componente para edição

export default {
  components: { Pagination, CreateUserForm, UserForm },
  data() {
    return {
      search: '',
      currentPage: 1,
      perPage: 4,
      selectedUserId: null,
      successMessage: '',
      errorMessage: '',
      showConfirmModal: false,
      userToDelete: null,
      showCreateUser: false,
      editMode: false, // Adicionado para controlar o modo de edição
    };
  },
  computed: {
    ...mapGetters('users', ['allUsers', 'total', 'totalPages']),
    filteredUsers() {
      return this.allUsers.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    selectedUser() {
      return this.allUsers.find(user => user.id === this.selectedUserId) || null;
    }
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),
    async promptDelete(userId) {
      this.userToDelete = userId;
      this.showConfirmModal = true;
    },
    async confirmDelete() {
      try {
        await this.deleteUser(this.userToDelete);
        this.showConfirmModal = false;
        this.userToDelete = null;
        this.fetchUsers({ search: this.search, page: this.currentPage, perPage: this.perPage });
        this.showSuccessAlert('Usuário excluído com sucesso.');
      } catch (error) {
        this.showConfirmModal = false;
        this.userToDelete = null;
        this.showErrorAlert('Erro ao excluir o usuário.');
      }
    },
    cancelDelete() {
      this.showConfirmModal = false;
      this.userToDelete = null;
    },
    editUser(user) {
      this.selectedUserId = user.id;
      this.editMode = true;
    },
    showCreateUserModal() {
      this.showCreateUser = true;
    },
    closeCreateUserModal() {
      this.showCreateUser = false;
    },
    handleCreateUserSubmitted() {
      this.showCreateUser = false;
      this.showSuccessAlert('Usuário criado com sucesso.');
      this.fetchUsers({ search: this.search, page: this.currentPage, perPage: this.perPage });
    },
    handleEditUserSubmitted() {
      this.editMode = false; // Sair do modo de edição
      this.selectedUserId = null; // Limpar o usuário selecionado
      this.showSuccessAlert('Usuário editado com sucesso.');
      this.fetchUsers({ search: this.search, page: this.currentPage, perPage: this.perPage });
    },
    showSuccessAlert(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = ''; // Ocultar a mensagem após 5 segundos
      }, 5000);
    },
    showErrorAlert(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = ''; // Ocultar a mensagem após 5 segundos
      }, 5000);
    },
    closeEditUserModal() {
      this.editMode = false; // Sair do modo de edição
      this.selectedUserId = null;
    },
    onSearch() {
      this.fetchUsers({ search: this.search, page: this.currentPage, perPage: this.perPage });
    },
    updatePage(page) {
      this.currentPage = page;
      this.fetchUsers({ search: this.search, page: this.currentPage, perPage: this.perPage });
    }
  },
  created() {
    this.fetchUsers({ search: this.search, page: this.currentPage, perPage: this.perPage });
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.btn-new-user {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
}

.btn-create {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
}

.btn-create:hover {
  background-color: #218838;
}

.btn-new-user:hover {
  background-color: #0056b3;
}

.input-search {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 16px;
  width: 100%;
  border-radius: 4px;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
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

.user-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.user-email {
  color: #555;
}

.user-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.btn-edit, .btn-delete {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
}

.btn-confirm {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #218838;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.alert {
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  text-align: center;
}

.alert.success {
  background-color: #d4edda;
  color: #155724;
}

.alert.error {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-fade-enter-active, .alert-fade-leave-active {
  transition: opacity 0.5s;
}

.alert-fade-enter, .alert-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.5s;
}

.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0;
}
</style>