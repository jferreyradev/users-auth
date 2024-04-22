import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/composables/useFetch';

//const URL_API= 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'

export const useLiqStore = defineStore('liq', () => {

    const URL_API = 'http://www.serverburru2.duckdns.org:3005/api'

    const dni = ref('')
    const data = ref('')
    const error = ref('')
    const isPending = ref('')

    function getLiq() {
        return useFetch(() => `${URL_API}/view/boletas?Documento=${dni.value}`)
    }

    function setPers(val) {
        console.log("obteniedo datos de " + val)
        dni.value = val
        isPending.value = true
        console.log(`${URL_API}/view/boletas?Documento=${dni.value}`)
        fetch(`${URL_API}/view/boletas?Documento=${dni.value}`)
            .then((res) => res.json())
            .then((_data) => {
                data.value = _data
                //this.month = _data[0].PERIODO.split('-')[1]
            })
            .catch((err) => {
                console.log(err)
                error.value = err
            })
            .finally(() => isPending.value = false)
    }

    return { data, error, isPending, setPers, dni, URL_API }
})