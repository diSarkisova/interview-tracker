<script setup lang="ts">
import {onMounted} from "vue";
import {useAuthStore} from "@/modules/auth/store/auth.store.ts";

const store = useAuthStore()

const {initAuth} = store

onMounted(() => {
  initAuth()
})
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
