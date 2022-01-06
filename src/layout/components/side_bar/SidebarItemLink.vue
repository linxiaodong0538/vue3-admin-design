<!--
 * @Author: Lw
 * @Date: 2021-10-08 16:57:54
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 16:58:20
-->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { isExternal } from '@/utils/validate'
import { useRouter } from 'vue-router'



export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()


    const push = () => {
      console.log('>>>routerLIST', router.getRoutes())
      router.push(props.to).catch((err) => {
        console.log('错误')
        console.log(err)

      })
    }
    return {
      push,
      isExternal
    }
  }
})
</script>
