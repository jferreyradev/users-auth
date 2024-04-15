<script setup>
import TheLogin from '@/components/TheLogin.vue'
import TheSignUp from '@/components/TheSignUp.vue'
import { ref } from 'vue'

const login = ref(true)
</script>

<template>
  <main>
    <TheLogin @register="login = false" v-if="login" />
    <TheSignUp @cancel="login = true" v-else />
  </main>
</template>
