<template>
  <div>
    <Info
      v-if="showInfo && stepContent.step.hasInfo"
      :info="stepContent.subtheme.info"
    />
    <div v-if="blurred || showInfo" class="blurZone"></div>
    <div
      :class="[stepContent.subtheme.isLast ? 'last-theme' : '', 'main-wrapper']"
    >
      <Nav
        :isRapport="stepContent.step.type == 'rapport'"
        :unlocks="stepContent.step.unlocks"
      />
      <Home />

      <div id="main">
        <div>
          <Title
            v-if="stepContent.step.type == 'title'"
            :content="stepContent"
          />

          <Rapport
            v-if="stepContent.step.type == 'rapport' || showRapport"
            :content="stepContent.step"
          />

          <Scan
            v-if="stepContent.step.type == 'scan'"
            :content="stepContent.step"
          />

          <Question
            v-if="stepContent.step.type == 'question' && !showRapport"
            :content="stepContent.step"
          />

          <Action
            v-if="stepContent.step.type == 'action' && !showRapport"
            :content="stepContent.step"
          />

          <Admin v-if="showAdmin" />
        </div>
        <Back />
      </div>
    </div>
  </div>
</template>

<script>
var showInfoTimeout

export default {
  data() {
    return {
      content: this.$store.state.content,
      settings: this.$store.state.settings,

      showRapport: false,
      showInfo: false,
      showAdmin: false,
      blurred: false,
      isBusyLoading: false,
    }
  },
  computed: {
    lang() {
      return this.$store.state.settings.langue
    },
    status() {
      return this.$store.getters.getStatus
    },
    stepContent() {
      return this.$store.getters.getStepContent
    },
  },
  watch: {
    stepContent(val, old) {
      this.clearAll()
      //   console.log(this.stepContent.step.type)
      //If first apparition of info button in sequence, then auto show info popup
      if (old.step.hasInfo == undefined && val.step.hasInfo !== undefined) {
        showInfoTimeout = setTimeout(() => {
          this.showInfo = true
        }, 1500)
      }
    },
    deep: true,
  },
  mounted() {
    var that = this
    document.addEventListener('keydown', function (event) {
      if (that.isBusyLoading == false) {
        if (isFinite(event.key)) {
          if (5 > event.key && event.key > 0)
            that.$store.commit('setTheme', event.key - 1)
        }

        if (event.code == 'ArrowRight') {
          that.increment()
        }

        if (event.code == 'ArrowLeft') {
          that.decrement()
        }
        if (event.code == 'KeyA') {
          that.showAdmin = true
        }
      }
    })
  },
  methods: {
    increment() {
      this.$store.commit('incrementStep')
    },
    decrement() {
      this.$store.commit('decrementStep')
    },
    clearAll() {
      clearTimeout(showInfoTimeout)
      this.showInfo = false
      this.showRapport = false
      this.blurred = false
    },
  },
  beforeDestroy() {
    this.clearAll()
  },
}
</script>

<style>
h1 {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 50px;
}
button {
  font-size: 96px;
}
#main > div:not(.back) {
  z-index: 1;
  width: 100%;
}
#main {
  margin: 0;
  top: 104px;
  padding: 0;
  height: 1704px;
}
.experience img {
  width: auto;
  height: 202px;
  display: block;
  margin: auto;
}
</style>
