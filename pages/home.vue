<template>
  <div>
    <Nav />
    <Home />
    <Header v-if="stepContent.step.type !== 'rapport'">
      <h1>{{ stepContent.theme }}</h1>
      <h4>{{ stepContent.subtheme[lang] }}</h4>
    </Header>
    <Main>
      <div
        v-if="stepContent.step.hasInfo"
        class="info button"
        @click="showInfo = true"
      >
        ?
      </div>
      <Info
        v-if="showInfo && stepContent.subtheme.info"
        :info="stepContent.subtheme.info"
      />
      <Rapport
        v-if="stepContent.step.type == 'rapport'"
        :content="stepContent.step"
      />
      <Scan v-if="stepContent.step.type == 'scan'" />
      <Question
        v-if="stepContent.step.type == 'question'"
        :content="stepContent.step"
      />
      <Action
        v-if="stepContent.step.type == 'action'"
        :content="stepContent.step"
      />
      <Admin v-if="showAdmin" />
    </Main>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  components: true,
  data() {
    return {
      content: this.$store.state.content,
      settings: this.$store.state.settings,

      showInfo: false,
      showAdmin: false,
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
button {
  font-size: 96px;
}
</style>
