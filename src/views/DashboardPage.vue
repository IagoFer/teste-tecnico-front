<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Painel de Usuários</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div v-if="barSeries[0].data.length">
        <apexchart type="bar" height="350" :options="barChartOptions" :series="barSeries"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import { mapGetters } from 'vuex';

export default {
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    ...mapGetters('users', ['allUsers', 'total', 'totalPages']),
  },
  data() {
    return {
      barChartOptions: {
        chart: {
          id: 'bar-chart',
          toolbar: {
            show: false
          },
        },
        xaxis: {
          categories: []
        },
        colors: ['#007bff'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        yaxis: {
          title: {
            text: 'Usuários'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        }
      },
      barSeries: [
        {
          name: 'Usuários por Página',
          data: []
        }
      ],
      lineChartOptions: {
        chart: {
          id: 'line-chart',
          toolbar: {
            show: false
          },
        },
        xaxis: {
          categories: []
        },
        colors: ['#28a745'],
        stroke: {
          curve: 'smooth',
          width: 2
        },
        yaxis: {
          title: {
            text: 'Novos Usuários'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        }
      },
      lineSeries: [
        {
          name: 'Novos Usuários por Mês',
          data: []
        }
      ]
    };
  },
  methods: {
    getCategoriesFromUsers(users) {
      // Extrai os primeiros nomes dos usuários como categorias (apenas exemplo, pode ser substituído)
      return users.map(user => user.first_name);
    },
    getUserDataByPage(users) {
      // Retorna o número de usuários em cada página (apenas exemplo, pode ser ajustado)
      const usersByPage = new Array(this.totalPages).fill(0);
      users.forEach(user => {
        usersByPage[user.page - 1] = (usersByPage[user.page - 1] || 0) + 1;
      });
      return usersByPage;
    },
    getNewUserCountByMonth(users) {
      // Simula novos usuários por mês (apenas exemplo, ajuste conforme sua lógica real)
      // Pode ser uma função que processa as datas de criação dos usuários
      const months = new Array(12).fill(0);
      users.forEach(user => {
        // Supondo que `created_at` é uma string de data, por exemplo: "2023-07-20T17:32:28Z"
        const month = new Date(user.created_at).getMonth();
        months[month]++;
      });
      return months;
    },
    updateChartData() {
      if (this.allUsers && this.allUsers.length) {
        this.barChartOptions.xaxis.categories = this.getCategoriesFromUsers(this.allUsers);
        this.barSeries[0].data = this.getUserDataByPage(this.allUsers);
        this.lineChartOptions.xaxis.categories = this.getCategoriesFromUsers(this.allUsers);
        this.lineSeries[0].data = this.getNewUserCountByMonth(this.allUsers);
      }
    }
  },
  mounted() {
    this.$store.dispatch('users/fetchUsers'); // Busca dados dos usuários quando o componente é montado
  },
  watch: {
    allUsers: {
      immediate: true,
      handler() {
        this.updateChartData();
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

.p-4 {
  padding: 20px;
}

.grid {
  display: grid;
}

@media (min-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gap-4 {
  gap: 16px;
}

.mb-8 {
  margin-bottom: 32px;
}

.apexcharts-canvas {
  width: 100% !important;
}
</style>
