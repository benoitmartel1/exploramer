<template>
  <div>
    <Info
      v-if="showInfo && stepContent.step.hasInfo == true"
      :info="stepContent.subtheme.info"
    />
    <div class="main-wrapper">
      <Nav />
      <Home />
      <Main>
        <div>
          <div
            class="header"
            v-if="
              stepContent.step.type !== 'rapport' &&
              !showRapport &&
              stepContent.step.type !== 'title'
            "
          >
            <div class="experience">
              <img
                v-if="settings.experience == 0"
                src="@/assets/images/elements/beluga.png"
                alt=""
              />
              <img v-else src="@/assets/images/elements/rorqual.png" alt="" />
            </div>
            <div class="header-left">
              <h1>{{ stepContent.theme }}</h1>
              <h4>{{ stepContent.subtheme[lang] }}</h4>
            </div>
            <div class="header-right">
              <div
                v-if="stepContent.step.hasInfo"
                class="info button"
                @click="showInfo = true"
              >
                ?
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <Title
            v-if="stepContent.step.type == 'title'"
            v-show="!showRapport"
            :content="stepContent"
          />
          <Rapport
            v-if="stepContent.step.type == 'rapport' || showRapport"
            :content="stepContent.step"
          />
          <Scan
            v-if="stepContent.step.type == 'scan'"
            v-show="!showRapport"
            :content="stepContent.step"
          />
          <Question
            v-if="stepContent.step.type == 'question'"
            v-show="!showRapport"
            :content="stepContent.step"
          />
          <Action
            v-if="stepContent.step.type == 'action'"
            v-show="!showRapport"
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
// import { onMounted } from 'vue'
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
      return this.$store.state.status
    },
    stepContent() {
      return this.$store.getters.getStepContent
    },
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
  },
}
</script>

<style>
.main-wrapper {
  /* position: relative; */
  /* border: 1px red solid; */
}

h1 {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 50px;
}
button {
  font-size: 96px;
}
main > div {
  /* position: absolute; */
  z-index: 1;
  width: 100%;
  /* height: 1704px; */
}
.header {
  /* height: 440px; */
  padding: 0 50px;
  width: 100%;
}
.header-left {
  width: calc(90% - 135px);
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
Main {
  margin: 0;
  top: 104px;
  padding: 0;
  height: 1704px;
  /* position: relative; */
}
.experience img {
  width: auto;
  height: 202px;
  display: block;
  margin: auto;
}
</style>
