<template>
  <div :class="[{ blurred: isBlurred }, 'scan action']">
    <Header />

    <div v-if="showCameraControls" class="camera-controls">
      <div name="focusMode">
        <div class="label">focusMode:</div>
        <input type="checkbox" />
        <div class="value"></div>
      </div>
      <div name="focusDistance">
        <div class="label">focusDistance:</div>
        <input type="range" />
        <div class="value"></div>
      </div>
      <div name="zoom">
        <div class="label">Zoom:</div>
        <input type="range" />
        <div class="value"></div>
      </div>
      <div name="brightness">
        <div class="label">Brightness:</div>
        <input type="range" />
        <div class="value"></div>
      </div>
      <div id="errorMsg" style="display: none"></div>
    </div>

    <div v-for="(a, index) in content.actions" :key="a + index">
      <Icons v-if="a.roles" :roles="a.roles" />

      <div class="frame">
        <span v-html="a[lang]"></span>
        <div
          v-if="a.hasScan"
          :class="[
            arReady ? 'show' : '',
            targetTracked ? 'active' : '',
            'aframe-wrapper show',
            isDone ? 'done ' : '',
          ]"
        >
          <div class="flash"></div>

          <ProgressCircle v-if="countdown != null" />
          <div class="border"></div>
          <LoadingDots v-if="a.hasScan && !arReady" />
          <!-- <div class="countdown">{{ countdown }}</div> -->
          <img
            :class="[showOverlay ? 'show' : '', 'overlay']"
            :src="require('@/assets/images/' + content.overlay)"
            alt=""
          />
          <div v-show="!isDone" class="target blink"></div>
          <a-scene
            id="scene"
            v-bind:mindar-image="
              'imageTargetSrc: mind/' +
              content.tag +
              '.mind;showStats:false;filterMinCF:0.0001; filterBeta: 1000;warmupTolerance:1;missTolerance:1;uiError:no; uiLoading:no; uiScanning:no;'
            "
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
          >
            <!-- <video
                id="poissons"
                src="videos/poissons.webm"
                muted                src="images/scan_overlays/Beluga_accouchement_230109.png"

                autoplay
                loop="true"
              ></video> -->
            <a-assets>
              <!-- <img
                id="overlay"
                :src="
                  require('@/assets/images/scan_overlays/' +
                    content.overlay +
                    '.png')
                "
                alt=""
              /> -->
            </a-assets>
            <a-entity
              id="example-target"
              mindar-image-target="targetIndex: 0"
              material="transparent: true"
            >
              <!-- <a-plane
                v-bind:width="[
                  content.overlayFormat ? content.overlayFormat.scale : 1,
                ]"
                v-bind:height="[
                  content.overlayFormat ? content.overlayFormat.scale : 1,
                ]"
                v-bind:position="[
                  content.overlayFormat
                    ? content.overlayFormat.position.join(' ')
                    : '0 0 0',
                ]"
                rotation="0 0 0"
                src="#overlay"
                material="transparent: true"
                :style="styleOverlay(content.overlayFormat)"
              >
              </a-plane> -->
            </a-entity>
            <a-camera
              position="0 0 0"
              look-controls="enabled: false"
            ></a-camera>
          </a-scene>
        </div>
      </div>
    </div>

    <div class="center">
      <ContinueButton v-if="showOverlay" />
    </div>
  </div>
</template>

<script>
var scanInterval
var doneTimeout
var overlayTimeout
var arSystem
export default {
  head() {
    return {
      script: [
        {
          src: '/exploramer/js/camera-control.js',
        },
      ],
    }
  },
  data() {
    return {
      showCameraControls: this.$store.state.showCameraControls,
      settings: this.$store.state.settings,
      targetTracked: false,
      lang: this.$store.state.settings.langue,
      arReady: false,
      countdown: null,
      isDone: false,
      showOverlay: false,
    }
  },
  props: ['content', 'status', 'preStatus'],
  computed: {
    isBlurred() {
      console.log(this.content)
      return this.content.hasInfo && this.preStatus
        ? true
        : this.$parent.showInfo
    },
  },
  mounted() {
    if (this.preStatus == 'scanned') this.showOverlay = true
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
      this.onTargetFound()
    })
    exampleTarget.addEventListener('targetLost', (event) => {
      this.onTargetLost()
    })
    document.addEventListener('keydown', this.onKeyFound)
    document.addEventListener('keyup', this.onKeyLost)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyFound)
    document.removeEventListener('keyup', this.onKeyLost)

    if ((arSystem !== undefined && arSystem !== null) || this.arReady) {
      try {
        arSystem.stop()
        arSystem = null
      } catch (error) {}
    }
    this.clearTimeout()
    this.isDone = false
    this.showOverlay = false
    this.countdown = null
  },
  methods: {
    onKeyFound(e) {
      if (e.key == 's' && !this.targetTracked) {
        this.onTargetFound()
      }
    },
    onKeyLost(e) {
      if (e.key == 's') {
        this.onTargetLost()
      }
    },
    onTargetLost() {
      this.targetTracked = false
      this.clearTimeout()
    },
    onTargetFound() {
      this.targetTracked = true
      this.updateCountdown()
      scanInterval = setInterval(() => {
        this.updateCountdown()
      }, 666)
    },
    styleOverlay(s) {
      if (s) {
        let styleStr = 'width:400px; opacity:0.3; '
        if (s.scale) {
          styleStr += `transform:scale(${s.scale});"`
        }
        return styleStr
      } else {
        return ''
      }
    },

    timeOut() {
      clearInterval(scanInterval)

      this.countdown = null
      this.isDone = true
      let that = this
      overlayTimeout = setTimeout(() => {
        that.showOverlay = true
        if (that.arReady || arSystem) {
          arSystem.stop()
          arSystem = null
        }
      }, 250)
    },
    done() {
      //   arSystem.stop()
      //   arSystem = null
      this.clearTimeout()
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
        this.timeOut()
      }
    },
    clearTimeout() {
      this.countdown = null
      clearTimeout(doneTimeout)
      clearInterval(scanInterval)
      clearTimeout(overlayTimeout)
    },
  },
}
</script>

<style>
.scan .icons {
  position: absolute;
  z-index: 5;
}
.scan .loading-dots .stage {
  transform-origin: -50% 0;
  transform: scale(2);
  margin-top: calc(600px / 2);
}
a-scene {
  z-index: 200;
}
.countdown {
  position: absolute;
  z-index: 100;
  left: 5%;
  top: 5%;
  color: white;
  font-weight: 900;
}
.a-loader-title {
  display: none;
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

  width: 300px;
  height: 300px;
  box-sizing: border-box;
  margin: 5px;
  display: inline-flex;
  /* font-size: 30px;
  justify-content: center;
  align-items: center;
  text-align: center; */
}
.active .blink {
  --w: 40px; /* width of border */
  /* animation: none; */
  /* background-color: green; */

  animation-duration: 400ms;
  transition: transform 100ms ease-out;
  transform: scale(0.9);
  /* opacity: 0; */
  /* transition: all 500ms ease-out; */
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
  /* height: 500px;*/
  height: 600px;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
  transform: scale(0.95);
  transition: all 400ms;
  border: 0 white solid;
  border-width: 0;
}
.aframe-wrapper .target {
  display: none;
}
.aframe-wrapper.show {
  transform: scale(1);
}
.aframe-wrapper.show div:not(.pre, .progressCircle) {
  display: block;
}
.border,
.flash {
  position: absolute;
  z-index: 300;
  border: 40px white solid;
  border-color: rgb(102, 255, 51);
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 250ms ease-out;
}
.active .border {
  transform: scale(1);
}

.aframe-wrapper.show > video {
  opacity: 1;
}

.camera-controls {
  position: absolute;
  z-index: 100;
  background-color: white;
  padding: 50px;
  width: 100%;
  bottom: 0;
  left: 0;
}
.camera-controls .label,
.camera-controls .value {
  /* display: inline-block; */
  font-weight: 400;
  margin: 0 0.5em;
  width: auto;
  font-size: 0.8em;
}

.camera-controls .value {
  text-align: right;
}
.camera-controls > div {
  width: 100%;
  display: flex;
  /* border: 1px red solid; */
}
input,
input[type='range'] {
  flex-grow: 1;
  width: 100%;
}
.flash {
  background-color: lightblue;
  opacity: 0;
  position: absolute;
  z-index: 500;
  /* width: 100%; */
}
.done .flash {
  animation: flash 500ms forwards;
  /* opacity: 1; */
}
.overlay {
  position: absolute;
  z-index: 400;
  opacity: 0;
  width: 100%;
  transform: scale(1.05);
  transition: transform 200ms ease-out;
}
.show.overlay {
  opacity: 1;
  transform: scale(1);
}
.scan img {
  top: -40px;
}
.scan .frame {
  animation-name: fromBottomRight;
  padding-bottom: 30px;
}
.active video {
  animation: activeVideo 800ms infinite ease;
}

@keyframes activeVideo {
  0%,
  100% {
    filter: sepia(0%) hue-rotate(0deg);
  }

  50% {
    filter: sepia(60%) hue-rotate(90deg) brightness(1.2);
  }
}
</style>
