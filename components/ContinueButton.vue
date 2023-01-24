<template>
  <div class="button continue" @click="handleClick()">
    {{ lang == 'fr' ? 'Continuer' : 'Next' }}
  </div>
</template>

<script>
export default {
  data() {
    return { lang: this.$store.state.settings.langue }
  },
  props: ['skipDefaultClick'],
  methods: {
    handleClick() {
      if (this.skipDefaultClick !== true) {
        this.$parent.done()
      } else {
        console.log('false')
        this.$parent.$parent.showRapport = false
      }
    },
  },
}
</script>

<style scoped>
.button {
  border: 2px #606060 solid;
  border-radius: 5px;
  padding: 10px 70px;
  display: inline-block;
  background-color: #005e8f;
  font-weight: black;
  color: white;
  /* text-transform: uppercase; */
  font-size: 53px;
  font-weight: 900;
}
.continue {
  animation: fromBottomRight 500ms ease-out;
}
</style>
