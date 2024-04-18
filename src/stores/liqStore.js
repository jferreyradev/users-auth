import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/composables/useFetch';


//const URL_API= 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'


export const useLiqStore = defineStore('liq', () => {

    const URL_API = 'http://www.serverconcepcion.duckdns.org:3007/api'

    const dni = ref('')

    function getLiq() {
        return useFetch(() => `${URL_API}/view/boletas?Documento=${dni.value}`)
    }
    function setPers(val) {
        console.log(val)
        dni.value = val
    }

    const { data, error, isPending } = getLiq(dni)

    return { data, error, isPending, setPers }
})