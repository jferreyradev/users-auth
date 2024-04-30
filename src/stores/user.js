import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
//import { doc, setDoc, addDoc } from "firebase/firestore";
import * as rtdb from "firebase/database";

import { useConn } from '@/composables/conn';
import { useFetch } from '@/composables/useFetch.js';

export const useUserStore = defineStore('user', () => {
    const currentUser = ref('')
    const dni = ref('')
    const email = ref('')
    const nivel = ref(0)
    const conn = useConn()
    const isInOra = ref(false)
    const isInFire = ref(false)

    async function newUser(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await writeUserData(currentUser.value.uid, dni.value, email.value)
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

    async function writeUserData(userId, doc, email) {
        const db = rtdb.getDatabase();
        rtdb.set(rtdb.ref(db, 'users/' + userId), {
            doc: doc,
            email: email,
            uid: userId,
            nivel: 1
        });
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
                    email.value = doc.data().email
                });
                return true
            } else {
                console.log('DNI no registrado')
                return false
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message)
        }
    }


    return { login, logout, newUser, currentUser, verifyDNI, dni, email }
})