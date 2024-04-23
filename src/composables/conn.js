// mouse.js
import { ref, toValue } from 'vue'

// by convention, composable function names start with "use"
export function useConn(baseUrl) {

    //const URL_API= 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'
    //const baseUrl = 'http://www.serverburru2.duckdns.org:3005/api'

    const apiUrl = ref(baseUrl || '')
    // a composable can update its managed state over time.
    /*function setUrl(url) {
        baseurl.value = (urlval)
    }*/

    // expose managed state as return value
    return { apiUrl }
}