<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
  AuthLayout
  <header></header>
  <main>
    <RouterView/>
  </main>
  <footer></footer>

</template>

<style scoped>
</style>