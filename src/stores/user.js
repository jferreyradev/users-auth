import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useFetch } from '@/composables/useFetch.js'
//import { useFilterStore } from '@/stores/filterStore.js'

//const store = useFilterStore()

export const useUserStore = defineStore('user', () => {
    const currentUser = ref('')
    const pers = ref({})

    async function setPers(dni) {
        const { data, error, isPending } = useFetch(() => `https://midliq-api-jr2sc3ef7gnx.deno.dev/api/view/personaLista?Documento=${dni}`)
        if (data) {
            pers.value = {
                'dni': data.DOCUMENTO,
                'Apellido': data.APELLIDO,
                'Nombre': data.NOMBRE
            }
        }
    }

    async function newUser(dni, email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Email already in use')
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email')
                    break
                default:
                    break;
            }
            return
        }
        currentUser.value = auth.currentUser
    }

    async function login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            currentUser.value = auth.currentUser
            console.log('Ingreso OK')
            console.log(currentUser.value)
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message)
        }
    }

    function logout() {
        signOut(auth).then(() => {
            currentUser.value = ''
            console.log('Logout')
            console.log(currentUser.value)
        }).catch((error) => {
            console.log(error)
        });
    }

    return { login, logout, newUser, currentUser, pers, setPers }
})