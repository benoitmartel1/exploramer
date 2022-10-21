<template>
  <div class="admin">
    <div class="info popup">
      <div>
        <div class="close" @click="done()">X</div>
        <div class="button" @click="updateSettings('langue', 'fr')">FR</div>
        <div class="button" @click="updateSettings('langue', 'en')">EN</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async updateSettings(setting, value) {
      await this.$axios
        .$post('/api/settings', { setting, value })
        .then((res) => {
          if (res.settings) {
            this.settings = res.settings[0]
            this.$store.commit('setSettings', res.settings[0])
          }
          //This two next calls is to force the nuxt refresh to happen to reflect language change
          this.$parent.increment()
          setTimeout(() => {
            this.$parent.decrement()
          }, 10)
        })
    },
    done() {
      this.$parent.showAdmin = false
    },
  },
}
</script>

<style></style>
