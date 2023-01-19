<template>
  <div class="header">
    <div class="experience">
      <img
        v-if="settings.experience == 0"
        src="@/assets/images/beluga.png"
        alt=""
      />
      <img v-else src="@/assets/images/rorqual.png" alt="" />
    </div>
    <div class="header-wrapper">
      <div class="header-left">
        <h1>{{ stepContent.theme }}</h1>
        <h4>{{ stepContent.subtheme[lang] }}</h4>
      </div>
      <div class="header-right">
        <div
          v-if="stepContent.step.hasInfo"
          class="info button"
          @click="showInfo(true)"
        >
          <div class="mark">?</div>
          <div class="overlay"></div>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$store.state.settings.langue,
      settings: this.$store.state.settings,
    }
  },
  computed: {
    stepContent() {
      return this.$store.getters.getStepContent
    },
  },
  methods: {
    showInfo(val) {
      this.$parent.$parent.blurred = true
      this.$parent.$parent.showInfo = val
    },
  },
}
</script>

<style>
.header {
  /* height: 440px; */
  /* padding: 0 50px; */
  width: 100%;
  margin-bottom: 30px;
}
.header-wrapper {
  position: relative;
  display: flex;
  /* border: 1px red solid; */
}
.header-left {
  flex: 1;
  line-height: 1;
}
.header-left h1 {
  line-height: 1;
}
.header-left h4 {
  line-height: 1.2;
}
.header-right {
  width: 150px;
}
.info.button .overlay {
  width: 100%;
  height: 100%;
  z-index: 0;
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(23, 167, 242, 1) 21%,
    rgba(0, 94, 143, 1) 100%
  );
  animation: pulse 2000ms infinite linear;
}

.info.button {
  position: absolute;
  /* top: -140px;
  right: -10px; */
  overflow: hidden;
  font-weight: 700;
  font-size: 120px;
  width: 135px;
  height: 135px;
  color: white;
  background-color: #005e8f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 30px;
}
.info .mark {
  z-index: 100;
  position: absolute;
}
</style>
