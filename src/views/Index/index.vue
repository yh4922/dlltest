<template>
  <div class="home">
    <button @click="startCheck">测试</button>
  </div>
</template>

<script>
import getImages from './main'
export default {
  name: 'home',
  created () {
    // getImages()
  },
  methods: {
    async startCheck () {
      getImages()
    }
  }
}
</script>
