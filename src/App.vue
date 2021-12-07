<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {},
  setup() {
    const testFunction = (a = 2) => {
      const obj = {}
      return obj.toString() + a
    }
    return {
      testFunction
    }
  },
  mounted() {
    this.testFunction(2)
  }
}
</script>
