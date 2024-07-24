<template>
  <div class="flex justify-center mt-4">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="px-4 py-2 bg-blue-600 text-white rounded">Anterior</button>
    <span class="mx-4">{{ currentPage }} / {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="px-4 py-2 bg-blue-600 text-white rounded">Próximo</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  margin: 0 10px;
}

.pagination button:hover {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}
</style>
