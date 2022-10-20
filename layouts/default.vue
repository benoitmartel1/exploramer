<template>
  <div class="appro">
    <div id="app">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
body {
  color: white;
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
#app {
  width: var(--app-width);
  height: var(--app-height);
  border: 1px solid black;
  background-color: #777;
}
.appro {
  transform: scale(0.4);
  transform-origin: center 20px;
}
</style>
