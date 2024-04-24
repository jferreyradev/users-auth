<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useFetch } from '@/composables/useFetch.js'
import { useLiqStore } from '@/stores/liqStore'

const store = useLiqStore()

const email = ref('')
const password = ref('')
const dnilocal = ref('')

const user = useUserStore()

function useBoletasLiq(getId) {
  return useFetch(() => `${store.URL_API}/view/personaLista?Documento=${getId()}`)
}

const { data, error, isPending } = useBoletasLiq(() => user.dni)
const isRegistred = ref()

function login() {
  user.login(email.value, password.value)
}

async function handleClick() {
  user.dni = dnilocal.value
  isRegistred.value = await user.verifyDNI(user.dni)
  console.log(isRegistred.value)
}

function reset() {
  dnilocal.value = ''
  user.dni = ''
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card v-if="!user.currentUser">
          <v-card-title class="text-center">Inicio de sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <div v-if="!data">
                <v-text-field v-model="dnilocal" label="DNI" outlined required></v-text-field>
                <v-btn color="primary" block class="mb-10" @click="handleClick"
                  >Verificar DNI</v-btn
                >
                <span v-if="isPending">Verificando</span>
              </div>

              <div v-else>
                <h2>Bienvenido</h2>
                <h3>{{ data[0].APELLIDO }} {{ data[0].NOMBRE }}</h3>
                <h4>DNI {{ user.dni }}</h4>
                <div v-if="isRegistred">
                  <v-text-field
                    v-model="password"
                    label="Contraseña"
                    type="password"
                    outlined
                    required
                    class="mt-5"
                  ></v-text-field>
                  <v-btn type="submit" color="primary" block>Iniciar sesión</v-btn>
                </div>
                <div v-else>
                  <v-btn color="primary" block class="mt-2" @click="$emit('register')"
                    >Regístrese</v-btn
                  >
                </div>
              </div>
              <v-btn v-if="data" color="primary" block class="mt-2" @click="reset">Cancelar</v-btn>
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
