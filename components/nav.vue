<template>
  <div class="nav">
    <div class="theme-wrapper">
      <div v-for="i in nbOfThemes" :key="'theme' + i" class="theme">
        <div v-if="i - 1 > theme">x</div>
        <div v-else>{{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: this.$store.state.settings,
      nbOfThemes: this.$store.state.content.themes.length,
    }
  },
  computed: {
    theme() {
      return this.$store.state.status.theme
    },
  },
}
</script>

<style>
.nav {
  width: var(--app-width);
  background-color: #666;
  height: 150px;
}
.theme {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: 0;
  border-right: 1px white solid;
  border-left: 1px white solid;
}
.theme-wrapper {
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
}
.nav .experience {
  float: right;
}
</style>
