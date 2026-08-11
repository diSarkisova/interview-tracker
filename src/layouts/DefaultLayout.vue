<template>
  <div class="default-layout">
    <header>
      <router-link to="/">Трекер собеседований</router-link>

      <div>
        <router-link to="/">Доска</router-link>
        <router-link to="/interviews">Таблица</router-link>
        <router-link to="/consultations">Консультации</router-link>

        <div>
          <button @click="onAddForm">Добавить +</button>
        </div>
      </div>
    </header>
    <main>
      <RouterView/>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
function onAddForm() {
  console.log('onAddForm')
}
</script>


<style scoped>
</style>