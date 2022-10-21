<template>
  <div class="aframe-wrapper">
    <a-scene
      id="scene"
      mindar-image="imageTargetSrc: mind/targets_(1).mind;filterMinCF:0.1; filterBeta: 1000;warmupTolerance:2;uiError:no; uiLoading:no; uiScanning:no;"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <video
          id="poissons"
          src="videos/poissons.webm"
          muted
          autoplay
          loop="true"
        ></video>
      </a-assets>
      <a-entity
        id="example-target"
        mindar-image-target="targetIndex: 0"
        material="shader: transparent-video; src: #poissons"
        geometry="primitive: plane;
					width: 1;
					height: 1"
        position="0 0 0"
      >
      </a-entity>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    </a-scene>
  </div>
</template>

<script>
var scanInterval

export default {
  data() {
    return {
      settings: this.$store.state.settings,
      targetTracked: false,
    }
  },
  mounted() {
    const exampleTarget = document.querySelector('#example-target')
    exampleTarget.addEventListener('targetFound', (event) => {
      scanInterval = setTimeout(() => {
        this.done()
      }, 3000)
      this.targetTracked = true
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })
    exampleTarget.addEventListener('targetLost', (event) => {
      clearTimeout(scanInterval)
      this.targetTracked = false
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })
  },
  methods: {
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style>
a-scene {
  z-index: 20;
}
.aframe-wrapper > video {
  opacity: 1;
  position: absolute;
  z-index: 10 !important;
}
.aframe-wrapper,
.a-canvas {
  width: calc(var(--app-width) - 100px);
  height: 1200px;
}
.aframe-wrapper {
  /* border: 6px solid green; */
  overflow: hidden;
  position: absolute;
  left: 50px;
  bottom: 50px;
}
/* .a-canvas {
  border: 2px yellow solid;
  position: absolute;
} */
</style>
