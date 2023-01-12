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
        <span>?</span>
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

.header-left {
  width: calc(90% - 35px);
  line-height: 1;
  float: left;
}
.header-left h1 {
  line-height: 1;
}
.header-left h4 {
  line-height: 1.2;
}
.header-right {
  /* background-color: green; */
  float: right;
  width: 135px;
}
.info.button {
  overflow: hidden;
}
.info.button span {
  animation: pulse 3000ms infinite ease;
  transform-origin: 50% 45%;
}
</style>
