<template>
  <div class="info">
    <div class="info popup" @click="done()">
      <div>
        <div class="close" @click="done()">X</div>
        {{ info[lang] }}
      </div>
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
  props: ['info'],
  methods: {
    done() {
      this.$parent.showInfo = false
    },
  },
}
</script>

<style></style>
