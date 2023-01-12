<template>
  <div>
    <div
      @touchstart="startTimer()"
      @touchend="stopTimer()"
      @mousedown="startTimer()"
      @mouseup="stopTimer()"
      class="home-button"
    ></div>
  </div>
</template>

<script>
let timer
export default {
  methods: {
    startTimer() {
      let that = this
      timer = setTimeout(() => {
        that.$router.push('/')
      }, 2500)
    },
    stopTimer() {
      clearTimeout(timer)
    },
  },
}
</script>

<style scoped>
.home-button {
  cursor: pointer;
  padding: 10px;
  font-size: 0.8em;
  font-weight: normal;
  width: 120px;
  height: 120px;
  /* background-color: orange; */
  /* border: rgb(240, 248, 255) 2px solid; */
  opacity: 0.3;
  position: absolute;
  bottom: 50px;
  right: 50px;
  z-index: 999;
}
</style>
