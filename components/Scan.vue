<template>
  <div class="scan action">
    <Header />

    <div v-for="(a, index) in content.actions" :key="a + index">
      <Icons v-if="a.roles" :roles="a.roles" />

      <div class="frame">
        {{ a[lang] }}

        <div
          v-if="a.hasScan"
          :class="[
            arReady ? 'show' : '',
            targetTracked ? 'active' : '',
            'aframe-wrapper',
          ]"
        >
          <LoadingDots v-if="a.hasScan && !arReady" />
          <div class="countdown">{{ countdown }}</div>
          <div class="target blink"></div>
          <a-scene
            id="scene"
            v-bind:mindar-image="
              'imageTargetSrc: mind/' +
              content.tag +
              '.mind;filterMinCF:0.0001; filterBeta: 1000;warmupTolerance:2;missTolerance:3;uiError:no; uiLoading:no; uiScanning:no;'
            "
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
            <a-entity id="example-target" mindar-image-target="targetIndex: 0">
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

    <!-- <div class="center">
      <div class="button" @click="done()">Continuer</div>
    </div> -->
  </div>
</template>

<script>
var scanInterval
var arSystem
export default {
  data() {
    return {
      settings: this.$store.state.settings,
      targetTracked: false,
      lang: this.$store.state.settings.langue,
      arReady: false,
      countdown: null,
    }
  },
  props: ['content'],
  mounted() {
    this.$parent.isBusyLoading = true
    const exampleTarget = document.querySelector('#example-target')
    const scene = document.querySelector('#scene')

    scene.addEventListener('arReady', (event) => {
      console.log('ready')
      arSystem = scene.systems['mindar-image-system']
      this.arReady = true
      this.$parent.isBusyLoading = false
    })
    scene.addEventListener('arError', (event) => {
      this.$parent.isBusyLoading = false
    })

    exampleTarget.addEventListener('targetFound', (event) => {
      this.updateCountdown()
      scanInterval = setInterval(() => {
        this.updateCountdown()
      }, 1000)
      this.targetTracked = true
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })

    exampleTarget.addEventListener('targetLost', (event) => {
      this.clearTimeout()

      this.targetTracked = false
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })
  },
  beforeDestroy() {
    if (this.arReady || arSystem) {
      arSystem.stop()
      arSystem = null
    }
  },
  methods: {
    done() {
      arSystem.stop()
      this.$parent.increment()
    },
    updateCountdown() {
      if (this.countdown == null) {
        this.countdown = 3
      } else {
        this.countdown--
      }
      if (this.countdown == 0) {
        this.clearTimeout()
        this.done()
      }
    },
    clearTimeout() {
      clearTimeout(scanInterval)
      this.countdown = null
    },
  },
}
</script>

<style>
.scan .loading-dots .stage {
  transform-origin: -50% 0;
  transform: scale(2);
  margin-top: 230px;
}
a-scene {
  z-index: 20;
}
.countdown {
  position: absolute;
  z-index: 100;
  left: 5%;
  top: 5%;
  color: white;
  font-weight: 900;
}
.target {
  position: absolute;
  z-index: 100;
  left: calc(50% - 150px);
  top: calc(50% - 150px);

  --b: 10px; /* thickness of the border */
  --c: white; /* color of the border */
  --w: 30px; /* width of border */

  border: var(--b) solid #0000; /* space for the border */
  --_g: #0000 90deg, var(--c) 0;
  --_p: var(--w) var(--w) border-box no-repeat;
  background: conic-gradient(
        from 90deg at top var(--b) left var(--b),
        var(--_g)
      )
      0 0 / var(--_p),
    conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g)) 100% 0 /
      var(--_p),
    conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--_g)) 0 100% /
      var(--_p),
    conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--_g))
      100% 100% / var(--_p);

  /*Irrelevant code*/
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  margin: 5px;
  display: inline-flex;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.aframe-wrapper > video {
  opacity: 1;
  width: 100%;
  position: absolute !important;
  z-index: 0 !important;
  top: 0;
  min-width: 100%;
  width: auto;
  height: auto;
  opacity: 0;
  transition: opacity 200ms;
}
.aframe-wrapper {
  /* background-color: #8cdff0; */
  background-color: #8cc6d1;
  height: 500px;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
  transform: scale(0.95);
  transition: all 400ms;
  border: 0 white solid;
  border-width: 0;
}
.aframe-wrapper .target,
a-scene {
  display: none;
}
.aframe-wrapper.show {
  transform: scale(1);
}
.aframe-wrapper.show div {
  display: block;
}
.aframe-wrapper.active {
  border-width: 25px;
}

.aframe-wrapper.show > video {
  opacity: 1;
}
/* .a-canvas {
  border: 2px yellow solid;
  position: absolute;
} */
</style>
