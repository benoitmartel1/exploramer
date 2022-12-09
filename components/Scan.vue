<template>
  <div class="action">
    <div v-for="(a, index) in content.actions" :key="a + index">
      <Icons v-if="a.roles" :roles="a.roles" />
      <div class="frame">
        {{ a[lang] }}
        <div v-if="a.hasScan">
          <div class="aframe-wrapper">
            <a-scene
              id="scene"
              mindar-image="imageTargetSrc: mind/3.mind;filterMinCF:0.001; filterBeta: 1000;warmupTolerance:2;missTolerance:3;uiError:no; uiLoading:no; uiScanning:no;"
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
              >
                <a-plane
                  height="1"
                  width="1"
                  position="0 0 0"
                  rotation="0 0 0"
                  src="#poissons"
                  material="shader: transparent-video"
                >
                  <a-plane color="red" height="1" width="1"></a-plane>
                </a-plane>
              </a-entity>

              <a-camera
                position="0 0 0"
                look-controls="enabled: false"
              ></a-camera>
            </a-scene>
          </div>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="button" @click="done()">Continuer</div>
    </div>
  </div>
</template>

<script>
var scanInterval

export default {
  data() {
    return {
      settings: this.$store.state.settings,
      targetTracked: false,
      lang: this.$store.state.settings.langue,
    }
  },
  props: ['content'],
  mounted() {
    const exampleTarget = document.querySelector('#example-target')
    console.log(exampleTarget)
    exampleTarget.addEventListener('targetFound', (event) => {
      scanInterval = setTimeout(() => {
        // this.done()
      }, 3000)
      this.targetTracked = true
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })
    exampleTarget.addEventListener('arReady', (event) => {
      console.log('MindAR is ready')
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
  border: 3px yellow solid;
  opacity: 1;
  width: 100%;
  position: absolute !important;
  z-index: 500 !important;
  top: 0;
  min-width: 100%;
  /* max-height: 100%; */
  width: auto;
  height: auto;
  /* top: -50%; */
  /* z-index: -100; */
  /* background-size: cover; */
  /* overflow: hidden; */
}
.aframe-wrapper,
.a-canvas {
  /* width: calc(var(--app-width) - 100px); */
  /* height: 1200px; */
}
.aframe-wrapper {
  height: 500px;
  position: relative;
  overflow: hidden;
  background-color: red;
  /* border: 6px solid green; */
  /* overflow: hidden;
  position: absolute;
  left: 0;
  top: 0; */
}
/* .a-canvas {
  border: 2px yellow solid;
  position: absolute;
} */
</style>
