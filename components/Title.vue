<template>
  <div class="title">
    <div class="experience">
      <img v-if="experience == 0" src="@/assets/images/beluga.png" alt="" />
      <img v-else src="@/assets/images/rorqual.png" alt="" />
    </div>
    <div class="main-block">
      <h1>{{ content.theme }}</h1>
      <div class="wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="361.654"
          height="42.529"
          viewBox="0 0 361.654 42.529"
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="Rectangle_21"
                data-name="Rectangle 21"
                width="361.654"
                height="42.529"
                fill="none"
                stroke="#260801"
                stroke-width="10"
              />
            </clipPath>
          </defs>
          <g id="Groupe_62" data-name="Groupe 62" transform="translate(0 0)">
            <g
              id="Groupe_61"
              data-name="Groupe 61"
              transform="translate(0 0)"
              clip-path="url(#clip-path)"
            >
              <path
                id="Tracé_65"
                data-name="Tracé 65"
                d="M349.744,30.619c-19.731,0-34.774-8.492-34.774-28.219,0,19.728-15.043,28.219-34.774,28.219S245.421,22.127,245.421,2.4c0,19.728-15.044,28.219-34.774,28.219S175.872,22.127,175.872,2.4c0,19.728-15.043,28.219-34.774,28.219S106.323,22.127,106.323,2.4V2c0,19.728-15.043,28.219-34.774,28.219S36.774,21.728,36.774,2C36.774,21.728,21.731,30.219,2,30.219"
                transform="translate(4.955 4.953)"
                fill="none"
                stroke="#260801"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
            </g>
          </g>
        </svg>
      </div>
      <h4 v-html="content.subtheme[lang]"></h4>
      <Picto :theme="realStatus.theme" />
    </div>
  </div>
</template>

<script>
var timer
export default {
  data() {
    return {
      lang: this.$store.state.settings.langue,
      experience: this.$store.getters.getExperience,
    }
  },
  props: ['content', 'status'],
  computed: {
    realStatus() {
      if (this.status) {
        return this.status
      } else {
        return this.$store.getters.getStatus
      }
    },
  },
  mounted() {
    timer = setTimeout(() => {
      this.done()
    }, 2200)
  },
  methods: {
    done() {
      this.$parent.increment()
    },
  },
  beforeDestroy() {
    clearTimeout(timer)
  },
}
</script>

<style>
.title {
  animation: fadeLeft var(--default-tr-speed) ease-out;
}
.main-block {
  /* animation: fromBottomRight 500ms ease-out; */
  text-align: center;

  line-height: 1;
  width: 80%;
  margin: auto;
  margin-top: 50px;
}
.main-block > * {
  /* animation: fromTopLeft var(--default-tr-speed) ease-out; */
}
.wave {
  margin: 60px;
}
.main-block h1 {
  font-size: 72px;
}
.main-block h4 {
  font-size: 66px;
}
.main-block .picto {
  animation: fromBottomRight var(--default-tr-speed) ease-out;
  margin-top: 60px;
}
.main-block .picto svg {
  width: 200px;
}
.title .picto svg {
  animation: picto 2500ms forwards;
}

.title .experience {
  margin-top: 80px;
  margin-bottom: 0;
}
@keyframes picto {
  from {
    transform: rotate(-20deg);
  }
  to {
    transform: rotate(10deg);
  }
}
</style>
