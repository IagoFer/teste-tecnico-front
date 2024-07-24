<template>
  <div id="app" class="bg-gray-100 min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex justify-center items-center">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

#app {
  font-family: 'Inter', sans-serif;
  color: #2c3e50;
}
</style>
