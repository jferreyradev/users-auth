<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useFetch } from '@/composables/useFetch'

/*
function useLiq(getId) {
  return useFetch(() => `${store.URL_API}/view/liq?${getId()}&sort={"Orden":"asc"}`)
}

const { data, error, isPending } = useLiq(() => store.filterString)
*/

const email = ref('')
const password = ref('')
const password2 = ref('')

const user = useUserStore()

function signUp() {
  user.newUser(email.value, password.value)
  console.log('Se va a registar el usuario')
}

console.log(user.currentUser)
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card v-if="!user.currentUser">
          <v-card-title class="text-center">Registro de usuario</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
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
              <v-text-field
                v-model="password2"
                label="Confirmar contraseña"
                type="password"
                outlined
                required
              ></v-text-field>

              <v-btn type="submit" color="primary" block>Enviar</v-btn>
              <v-btn color="primary" block @click="$emit('cancel')" class="mt-2">Cancelar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <div v-else>
          <span>{{ user.currentUser.email }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
