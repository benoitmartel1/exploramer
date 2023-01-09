<template>
  <div>
    <div
      @touchstart="startTimer()"
      @touchend="stopTimer()"
      @mousedown="startTimer()"
      @mouseup="stopTimer()"
      class="home-button"
    >
      Tenir 3 sec pour changer params
    </div>
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
  padding: 10px;
  font-size: 0.8em;
  font-weight: normal;
  width: 200px;
  height: 200px;
  /* background-color: orange; */
  border: rgb(240, 248, 255) 2px solid;
  opacity: 0.3;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
}
</style>
