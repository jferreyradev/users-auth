<script setup>
import LiqBoletasPers from '@/components/LiqBoletasPers.vue'
import { ref } from 'vue'
import { useLiqStore } from '@/stores/liqStore.js'

const dni = ref('')
const store = useLiqStore()

function handleClick() {
  console.log(dni.value)
  //store.setPers(dni.value)
  store.dni = dni.value
}
</script>

<template>
  <main>
    <h1>Panel de boletas</h1>
    <div>
      <v-text-field v-model="dni" label="DNI" outlined required></v-text-field>
      <v-btn @click="handleClick"></v-btn>
    </div>
    <LiqBoletasPers v-if="dni" :dni="dni"></LiqBoletasPers>
  </main>
</template>
