<template>
  <div :class="{ appro: approMode }">
    <div id="app">
      <button class="approMode" @click="approMode = !approMode">
        {{ approMode ? 'Agrandir' : 'Rapetisser' }}
      </button>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approMode: true,
    }
  },
}
</script>

<style>
body {
  /* color: white; */
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
#app {
  width: var(--app-width);
  height: var(--app-height);
  border: 1px solid black;
  transform: scale(1);
}
#app .main-wrapper {
  width: 1180px;
  /* background-color: white; */
  height: calc(106px + 1704px);
  margin: auto;
  margin-top: 47px;
  /* background-color: #65adad; */
}
.appro {
  transform: scale(0.4);
  transform-origin: 0 0;
}
.approMode {
  float: right;
  width: 200px;
  padding: 30px;
  font-size: 24px;
  margin-right: -200px;
  opacity: 0.2;
}
</style>
