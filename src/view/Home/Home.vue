<template>
  <section>
      Home, {{res}}
  </section>
</template>

<script>
import { apiDataTest } from '@/api/data-test'
export default {
  name: 'Home',
  data () {
    return {
      res: ''
    }
  },
  methods: {
    getDataTest () {
      apiDataTest('json....').then(data => {
        this.res = data
      })
    }
  },
  mounted () {
    this.getDataTest()
  }
}
</script>

<style scoped>

</style>
