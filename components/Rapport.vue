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
    <div class="center">
      <div class="button" @click="done()">Continuer</div>
    </div>
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
h3 {
  background-color: #c9ebf4;
  padding: 5px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 45px;
  padding-left: 10px;
  margin: 60px 0 10px 0;
}
ul {
  list-style: none;
  padding-left: 0;
}
.prop {
  font-size: 38px;
  margin: 20px 0;
  display: flex;
}
.key {
  /* display: inline-block; */
  /* width: auto; */
  /* padding: 10px; */
  white-space: nowrap;
  margin-right: 20px;
}
.value {
  /* display: inline-block; */
  color: #003072;
  font-weight: 700;
  flex-grow: 1;
}
.value.empty {
  border-bottom: 1px solid black;
  width: 100%;
}
</style>
