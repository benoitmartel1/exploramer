<template>
  <div>
    <Info
      v-if="showInfo && stepContent.step.hasInfo"
      :info="stepContent.subtheme.info"
    />
    <div v-if="blurred || showInfo" class="blurZone"></div>
    <div class="main-wrapper">
      <Nav
        :isRapport="stepContent.step.type == 'rapport'"
        :unlocks="stepContent.step.unlocks"
      />
      <Home />
      <Main>
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
      </Main>
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
      console.log(old)
      this.clearAll()
      //   console.log(this.stepContent.step.type)
      //If first apparition of info button in sequence, then auto show info popup
      if (old.step.hasInfo == undefined && val.step.hasInfo !== undefined) {
        showInfoTimeout = setTimeout(() => {
          this.showInfo = true
        }, 800)
      }
    },
    deep: true,
  },
  mounted() {
    var that = this
    document.addEventListener('keydown', function (event) {
      if (event.code == 'ArrowRight') {
        that.increment()
      }
      if (event.code == 'ArrowLeft') {
        that.decrement()
      }
      if (event.code == 'KeyA') {
        console.log('a')
        that.showAdmin = true
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
      console.log('Clearing')
      clearTimeout(showInfoTimeout)
      this.showInfo = false
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
main > div {
  z-index: 1;
  width: 100%;
}
Main {
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
