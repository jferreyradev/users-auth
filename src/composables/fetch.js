// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)
    const isPending = ref(false)

    const fetchData = () => {
        // reset state before fetching..
        data.value = null
        error.value = null
        isPending.value = true



        fetch(toValue(url))
            .then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err))
            .finally(() => (isPending.value = false))
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error, isPending }
}