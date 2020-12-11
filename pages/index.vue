<template>
  <div>
    Nuxt.js SPA Boilerplate
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="dark">Dark</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style lang="scss" scoped> 
</style>