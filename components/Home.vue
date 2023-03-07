<template>
  <div>
    <div
      @touchend="handleTouch(0)"
      @mouseup="handleTouch(0)"
      class="home-button left"
    ></div>
    <div
      @touchend="handleTouch(1)"
      @mouseup="handleTouch(1)"
      class="home-button right"
    ></div>
  </div>
</template>

<script>
let timer
export default {
  data() {
    return {
      touchCount: 0,
    }
  },
  methods: {
    handleTouch(side) {
      if (this.touchCount % 2 == side) {
        this.touchCount++
        console.log(this.touchCount)

        this.startTimer()
        if (this.touchCount > 3) {
          this.$router.push('/')
          this.touchCount = 0
          clearTimeout(timer)
        }
      }
    },
    startTimer() {
      clearTimeout(timer)
      let that = this
      timer = setTimeout(() => {
        this.touchCount = 0
        console.log(this.touchCount)
      }, 600)
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
.home-button.left {
  top: 50px;
  left: 50px;
}
</style>
