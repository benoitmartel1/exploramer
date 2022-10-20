<template>
  <div class="aframe-wrapper">
    <!-- <div class="button ok" @touchend="$router.push('/')">OK ></div>
    {{ settings.langue }}
    {{ targetTracked }} -->
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
      <!-- <a-sky color="#6EBAA7" material="" geometry="" scale=""></a-sky> -->
      <!-- <canvas data-aframe-canvas="true" width="1920" height="977"></canvas> -->

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
      <!-- <a-entity mindar-image-target="targetIndex: 0" id="example-target">
        <a-plane
          color="blue"
          opacity="0.5"
          position="0 0 0"
          height="0.5"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity> -->
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <!-- <a-entity id="example-target" mindar-image-target="targetIndex: 0">
			<a-video src="#poissons" autoplay="true"></a-video>

		</a-entity> -->
    </a-scene>
  </div>
</template>

<script>
// import '~/static/js/mindar-image.prod.js'
// import '~/static/js/aframe.min.js'
// import '~/static/js/mindar-image-aframe.prod.js'
// import 'aframe-transparent-video-shader'
export default {
  data() {
    return {
      settings: this.$store.state.settings,
      targetTracked: false,
    }
  },
  mounted() {
    console.log('yo')
    // setTimeout(() => {
    //   window.location.reload(true)
    // }, 3000)

    const exampleTarget = document.querySelector('#example-target')
    exampleTarget.addEventListener('targetFound', (event) => {
      this.targetTracked = true
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })
    exampleTarget.addEventListener('targetLost', (event) => {
      this.targetTracked = false
      const video = document.querySelector('#poissons')
      video.pause()
      video.currentTime = 0
      video.play()
    })
  },
}
</script>

<style>
a-scene {
  position: absolute;
  top: 0;
  left: 0;
}
.aframe-wrapper > video {
  opacity: 1;
  position: absolute;
  z-index: 10 !important;
}
.aframe-wrapper {
  /* border: 6px solid green; */
  overflow: hidden;
  position: absolute;
  width: 1200px;
  height: 1920px;
}
</style>
