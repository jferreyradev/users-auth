<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'

const email = ref('')
const password = ref('')

const user = useUserStore()

function login() {
  user.login(email.value, password.value)
}

console.log(user.currentUser)
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card v-if="!user.currentUser">
          <v-card-title class="text-center">Inicio de sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                outlined
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Iniciar sesión</v-btn>

              <v-btn color="primary" block class="mt-2" @click="$emit('register')"
                >O regístrese</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
        <div v-else>
          <span>{{ user.currentUser.email }}</span>
          <v-btn @click="user.logout">Logout</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
