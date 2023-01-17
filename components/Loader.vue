<template>
  <div>
    <div id="loader">
      <div v-for="(a, index) in assets" :key="a + index">
        <img :src="require('@/assets/images/' + a.path)" @load="onLoaded(a)" />
      </div>
    </div>
  </div>
</template>

<script>
//Assets Preloader

export default {
  data() {
    return {
      assets: [],
    }
  },
  computed: {},
  methods: {
    importAll(r) {
      r.keys().forEach((key) => {
        let str = key.split('./')[1]
        this.assets.push({ path: str, loaded: false })
      })
    },
    onLoaded(a) {
      a.loaded = true
      console.log('Loaded ' + a.path)
      if (this.isAllLoaded()) {
        console.log('All assets loaded')
        this.$parent.assetsLoaded = true
      }
    },
    isAllLoaded() {
      return (
        this.assets.filter((a) => a.loaded == true).length == this.assets.length
      )
    },
  },
  mounted() {
    this.importAll(require.context('@/assets/images/', true, /\.jpg$/))
    this.importAll(require.context('@/assets/images/', true, /\.png$/))
  },
}
</script>

<style>
#loader {
  display: none;
}
</style>
