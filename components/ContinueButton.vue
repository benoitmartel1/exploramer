<template>
  <div class="button continue" @click="$parent.done()">
    {{ lang == 'fr' ? 'Continuer' : 'XXX---Continue' }}
  </div>
</template>

<script>
export default {
  data() {
    return { lang: this.$store.state.settings.langue }
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
