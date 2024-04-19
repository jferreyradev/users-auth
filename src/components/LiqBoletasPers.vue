<script setup>
//import { useFilterStore } from '@/stores/filterStore.js'
import { useFetch } from '@/composables/useFetch.js'
import RepoHeader from './RepoHeader.vue'
import { useLiqStore } from '@/stores/liqStore'

/*const store = useUserStore()

*/

const store = useLiqStore()

function useBoletasLiq(getId) {
  return useFetch(() => `${store.URL_API}/view/boletas?Documento=${getId()}`)
}

const { data, error, isPending } = useBoletasLiq(() => store.dni)

const getVto = (vto) => {
  if (vto) {
    const d = vto.split('-')
    return `${d[1]}/${d[0]}`
  }
  return null
}

const headers = [
  { key: 'TIPOLIQUIDACIONDESCRIPCION', title: 'Liquidación' },
  { key: 'PERIODO', title: 'Emisión' },
  { key: 'FECHADEV', title: 'Devengado' },
  { key: 'NETO', title: 'Neto' },
  { key: 'LIQUIDACIONID', title: 'link descarga' }
]
</script>

<template>
  <v-container>
    <RepoHeader
      v-if="data"
      title="Boletas disponibles para descarga"
      :subtitle="' DNI:' + data[0].DOCUMENTO + ' ' + data[0].APELLIDO + ' ' + data[0].NOMBRE"
    >
      <div>
        Rep: {{ data[0].REPARTICIONID }} Orden: {{ data[0].ORDEN }} Afiliado:{{ data[0].AFILIADO }}
      </div>
    </RepoHeader>
    <v-row>
      <div v-if="isPending">loading...</div>

      <v-card v-else-if="data" flat>
        <v-data-table
          class="elevation-1 text-caption pa-0 ma-0 w-auto"
          :headers="headers"
          :items="data"
          item-value="LIQUIDACIONID"
        >
          <template v-slot:item.PERIODO="{ value }">
            {{ getVto(value) }}
          </template>
          <template v-slot:item.FECHADEV="{ value }">
            {{ getVto(value) }}
          </template>

          <template v-slot:item.LIQUIDACIONID="{ value }">
            <a :href="store.URL_API + '/boleta?IdLiq=' + value">descargar</a>
          </template>
        </v-data-table>
      </v-card>
      <div v-else-if="error">No se puede obtener los datos solicitados.</div>
    </v-row>
  </v-container>
</template>
