import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useConn } from '@/composables/conn';
import { useFetch } from '@/composables/fetch';



export const useUserStore = defineStore('user', () => {
    const currentUser = ref('')
    const pers = ref('')
    const nivel = ref(0)
    const conn = useConn()

    async function newUser(email, password) {
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
        console.log(currentUser.value)
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

    async function verifyDNI(dni) {
        console.log('verificando ', dni)

        try {
            const docRef = collection(db, "usersliq");

            // Create a query against the collection.
            const q = query(docRef, where("doc", "==", dni));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data().doc);
                    console.log('dni ', doc.data().doc);
                    console.log('nivel ', doc.data().nivel);
                });
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message)
        }
    }

    async function existDNI(dni) {
        console.log('verificando en ora ', dni)

        try {
            const res = await fetch(`http://www.serverburru2.duckdns.org:3005/api/view/personaLista?Documento=${dni}`)
            const data = res.json()
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    return { login, logout, newUser, currentUser, pers, verifyDNI, existDNI }
})