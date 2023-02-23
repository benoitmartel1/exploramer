<template>
  <Nuxt />
</template>

<script>
export default {
  data() {
    return {
      approMode: true,
      count: 0,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
  },
  methods: {
    updateSettings(lang) {
      this.$store.commit('updateLangue', lang)
      this.count++
    },
  },
}
</script>

<style>
.guide {
  width: calc(100% - var(--app-width));
  margin: 30px;
  color: #ccc;
  font-size: 36px;
  word-wrap: normal;
  overflow-wrap: normal;
}
.guide li {
  margin-bottom: 30px;
}

.guide .key {
  color: white;
  font-weight: bold;
}
body {
  /* color: white; */
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
#app {
  flex-shrink: 0;
  width: var(--app-width);
  height: var(--app-height);
  border: 1px solid black;
  transform: scale(1);
}
.print #app .main-wrapper {
  width: 1180px;
  /* background-color: white; */
  height: calc(106px + 1704px);
  margin: auto;
  margin-top: 47px;
  /* background-color: #65adad; */
}
.print .appro {
  transform: scale(0.4);
  transform-origin: 0 0;
}
.print .app-wrapper {
  display: flex;
  width: 100%;
}
.print .approMode {
  cursor: pointer;
  display: flex;
  font-weight: bold;
  /* width: 200px; */
  padding: 30px;
  font-size: 36px;
  margin-right: -200px;
  opacity: 0.2;
}
</style>
