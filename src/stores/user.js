import { ref } from 'vue'
import { defineStore } from 'pinia'

import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useUserStore = defineStore('user', () => {
    const currentUser = ref('')
    //const password = ref('')
    //const dni = ref('')
    //const name = ref('Eduardo')
    //const doubleCount = computed(() => count.value * 2)

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

    return { login, logout, newUser, currentUser }
})