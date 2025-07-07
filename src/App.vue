<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';



</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class=" text-center">
    Made with <i class="mdi mdi-cat text-orange"></i><i class="mdi mdi-cat text-grey"></i><i
      class="mdi mdi-cat text-orange"></i><i class="mdi mdi-cat text-grey"></i> <i
      class="mdi mdi-sleep-off text-teal fw-b"></i> <i class="mdi mdi-car-sports text-grey"></i> by
    Jiu-Jitsu
  </footer>
</template>

<style lang="scss"></style>
