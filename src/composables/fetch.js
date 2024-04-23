// fetch.js
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)
    const isPending = ref(false)

    const fetchData = () => {
        // reset state before fetching..
        data.value = null
        error.value = null
        isPending.value = true
        fetch(url())
            .then((res) => {
                res.json()
            })
            .then((_data) => {
                data.value = _data
            })
            .catch((err) => {
                console.log(err)
                error.value = err
            }
            )
            .finally(() => (isPending.value = false))
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error, isPending }
}