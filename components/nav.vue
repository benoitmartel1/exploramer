<template>
  <div class="nav">
    <div class="theme-wrapper">
      <div
        :class="[isRapportVisible ? 'active' : '', 'theme rapport']"
        @click="triggerRapport(true)"
      >
        <svg
          id="Icon_Rapport"
          data-name="Icon Rapport"
          xmlns="http://www.w3.org/2000/svg"
          width="32.964"
          height="39.584"
          viewBox="0 0 32.964 39.584"
        >
          <path
            id="Tracé_10"
            data-name="Tracé 10"
            d="M414.452,884.778H383.72a1.116,1.116,0,0,1-1.116-1.116V846.311a1.117,1.117,0,0,1,1.116-1.117h30.732a1.116,1.116,0,0,1,1.116,1.117v37.351A1.116,1.116,0,0,1,414.452,884.778Zm-29.615-2.233h28.5V847.427h-28.5Z"
            transform="translate(-382.604 -845.194)"
            fill="#260801"
          />
          <path
            id="Tracé_11"
            data-name="Tracé 11"
            d="M407.991,854.992H389.552a1.117,1.117,0,1,1,0-2.233h18.439a1.117,1.117,0,0,1,0,2.233Z"
            transform="translate(-382.604 -845.194)"
            fill="#260801"
          />
          <path
            id="Tracé_12"
            data-name="Tracé 12"
            d="M407.991,862.522H389.552a1.116,1.116,0,1,1,0-2.233h18.439a1.116,1.116,0,0,1,0,2.233Z"
            transform="translate(-382.604 -845.194)"
            fill="#260801"
          />
          <path
            id="Tracé_13"
            data-name="Tracé 13"
            d="M398.419,870.051h-8.867a1.117,1.117,0,1,1,0-2.233h8.867a1.117,1.117,0,0,1,0,2.233Z"
            transform="translate(-382.604 -845.194)"
            fill="#260801"
          />
        </svg>
      </div>
      <div
        v-for="i in nbOfThemes"
        @click="triggerRapport(false)"
        :key="'theme' + i"
        :class="[theme == i - 1 && !isRapportVisible ? 'active' : '', 'theme']"
      >
        <div v-if="i - 1 > theme">
          <svg
            id="Icon_Locked"
            data-name="Icon Locked"
            xmlns="http://www.w3.org/2000/svg"
            width="28.039"
            height="39.251"
            viewBox="0 0 28.039 39.251"
          >
            <path
              id="Tracé_14"
              data-name="Tracé 14"
              d="M344.269,860.716h-2.278v-3.244a10.628,10.628,0,0,0-21.257,0v3.244h-2.278a1.114,1.114,0,0,0-1.113,1.113v23.153a1.113,1.113,0,0,0,1.113,1.113h25.813a1.113,1.113,0,0,0,1.113-1.113V861.829A1.113,1.113,0,0,0,344.269,860.716Zm-21.309-3.244a8.4,8.4,0,0,1,16.805,0v3.244H322.96Zm20.2,26.4H319.569V862.942h23.587Z"
              transform="translate(-317.343 -846.844)"
              fill="#260801"
            />
            <path
              id="Tracé_15"
              data-name="Tracé 15"
              d="M334.188,870.123a2.826,2.826,0,1,0-3.951,2.589v6.822a1.113,1.113,0,0,0,2.226,0v-6.808A2.826,2.826,0,0,0,334.188,870.123Z"
              transform="translate(-317.343 -846.844)"
              fill="#260801"
            />
          </svg>
        </div>
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
    isRapportVisible() {
      return this.$parent.showRapport
    },
  },
  methods: {
    triggerRapport(status) {
      this.$parent.showRapport = status
    },
  },
}
</script>

<style>
.nav {
  width: 100%;
  /* background-color: #666; */
  height: 106px;
  z-index: 10;
  /* position: absolute; */
}
.theme {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px red dashed; */
  /* flex-grow: 1;
  flex-basis: 0; */
  flex-grow: 1;
  background-color: #ddd;
  border-radius: 5px 5px 0 0;
  /* border-right: 1px white solid; */
  /* border-left: 1px white solid; */
}
.theme.active {
  background-color: white;
}
.theme-wrapper {
  height: 100%;
  width: 100%;
  /* margin: auto; */
  display: flex;
  flex-wrap: wrap;

  gap: 3px;
  /* border: 2px red solid; */
}
.nav .experience {
  float: right;
}
</style>
