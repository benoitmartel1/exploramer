<template>
  <div class="rapport">
    <h1>Rapport d'enquête</h1>
    <div v-for="(t, tindex) in content.themes" :key="t + tindex">
      <h3>{{ t[lang] }}</h3>
      <ul>
        <li v-for="(s, sindex) in t.subthemes" :key="s + sindex">
          <div v-if="s.prop" class="prop">
            <div class="key">{{ s.prop.key[lang] }} :</div>
            <div
              v-if="
                status.theme > tindex ||
                (status.theme == tindex && status.subtheme > sindex)
              "
              class="value"
            >
              {{ s.prop.value[lang] }}
            </div>
            <div v-else class="empty value"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="button" @click="done()">Continuer</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: this.$store.state.settings,
      status: this.$store.state.status,
      content: this.$store.state.content,
      lang: this.$store.state.settings.langue,
    }
  },
  methods: {
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style>
.prop div {
  display: inline-block;
  white-space: nowrap;
}
.value {
  max-width: 90%;
}
.empty {
  border-bottom: 1px solid white;
}
</style>
