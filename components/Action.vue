<template>
  <div class="action">
    <Icons v-if="content.roles" :roles="content.roles" />
    {{ content[lang] }}
    <div class="button" @click="done()">Continuer</div>
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
