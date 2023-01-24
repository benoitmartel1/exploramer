<template>
  <div>
    <Info
      v-if="showInfo && stepContent.step.hasInfo"
      :info="stepContent.subtheme.info"
    />
    <div v-if="blurred || showInfo" class="blurZone"></div>
    <div
      :class="[
        stepContent.subtheme.isLast || stepContent.step.type == 'intro'
          ? 'last-theme'
          : '',
        'main-wrapper',
      ]"
    >
      <Nav
        v-if="!stepContent.step.noNav"
        :isRapport="stepContent.step.type == 'rapport'"
        :unlocks="stepContent.step.unlocks"
        :themeIndex="status.theme"
      />
      <Home />

      <div id="main">
        <div>
          <Title
            v-if="stepContent.step.type == 'title' && !showRapport"
            :content="stepContent"
          />
          <Intro
            v-if="stepContent.step.type == 'intro' && !showRapport"
            :content="stepContent.step"
          />
          <Outro
            v-if="stepContent.step.type == 'outro' && !showRapport"
            :content="stepContent.step"
          />
          <Rapport
            v-if="stepContent.step.type == 'rapport' || showRapport"
            :content="stepContent.step"
            :allContent="content"
            :status="status"
            :showInfo="showInfo"
            :blurred="blurred"
            :isLastTheme="stepContent.subtheme.isLast"
          />

          <Scan
            v-if="stepContent.step.type == 'scan'"
            :content="stepContent.step"
          />

          <Question
            v-if="stepContent.step.type == 'question'"
            v-show="!showRapport"
            :content="stepContent.step"
            :isLastTheme="stepContent.subtheme.isLast"
            :preStatus="null"
          />

          <Action
            v-if="stepContent.step.type == 'action' && !showRapport"
            :content="stepContent.step"
            :showInfo="showInfo"
          />
        </div>
        <Back :type="stepContent.step.type" />
      </div>
    </div>
  </div>
</template>

<script>
var showInfoTimeout

// import beluga from '~/static/data/beluga.json'
// import rorqual from '~/static/data/rorqual.json'

export default {
  data() {
    return {
      content: this.$store.state.content, // Uncomment for production
      //   content: beluga, //Comment for production
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
      //   If in dev mode
      // if (beluga || rorqual) {
      //   console.log('IN DEV MODE')
      //   const s = this.status
      //   const theme = this.content.themes[s.theme]
      //   const subtheme = theme.subthemes[s.subtheme]

      //   return {
      //     theme: theme[this.lang],
      //     subtheme: subtheme,
      //     step: subtheme.steps[s.step],
      //   }
      // }

      return this.$store.getters.getStepContent
    },
  },
  watch: {
    stepContent(val, old) {
      this.clearing = false
      this.clearAll()
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
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeMount() {},
  methods: {
    onKeyDown(event) {
      let that = this
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
    },
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
    document.removeEventListener('keydown', this.onKeyDown)
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
.experience {
  padding: 10px;
  height: 180px;
}
.experience img {
  width: 70%;

  margin: auto;
  display: block;
  /* margin: auto; */
}
</style>
