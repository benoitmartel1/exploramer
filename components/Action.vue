<template>
  <div class="action">
    <div v-for="(a, index) in content.actions" :key="a + index">
      <Icons v-if="a.roles" :roles="a.roles" />
      <div class="frame">{{ a[lang] }}</div>
    </div>
    <div class="center">
      <div class="button" @click="done()">Continuer</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$store.state.settings.langue,
    }
  },
  props: ['content'],
  methods: {
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style></style>
