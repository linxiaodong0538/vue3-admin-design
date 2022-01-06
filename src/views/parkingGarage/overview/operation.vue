<template>
  <div>
    停车运营信息  
  </div>
</template>


<script lang="ts">
import { defineComponent,watch  } from 'vue'
import { useRoute, LocationQuery, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
           const router = useRouter()
    const route = useRoute()
    
    watch(
      () => route,
      query => {
        console.log(11111111)
        if (query) {
          console.log('query', query)
 
        }
      }
    )
  },
})
</script>
