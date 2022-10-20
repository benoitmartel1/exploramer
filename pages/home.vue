<template>
  <div>
    <Nav />
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
    </Main>
  </div>
</template>

<script>
export default {
  components: true,
  data() {
    return {
      content: this.$store.state.content,
      settings: this.$store.state.settings,
      lang: this.$store.state.settings.langue,
      showInfo: false,
    }
  },
  computed: {
    status() {
      return this.$store.state.status
    },
    stepContent() {
      return this.$store.getters.getStepContent
    },
  },
  methods: {
    increment() {
      this.$store.commit('incrementStep')
    },
  },
}
</script>

<style>
button {
  font-size: 96px;
}
</style>
