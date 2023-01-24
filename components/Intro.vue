<template>
  <div :class="[{ blurred: $parent.blurred || $parent.showInfo }, 'intro']">
    <div class="center">
      <div class="experience">
        <img
          v-if="settings.experience == 0"
          src="@/assets/images/beluga.png"
          alt=""
        />
        <img v-else src="@/assets/images/rorqual.png" alt="" />
      </div>
      <div class="sous-titre">
        <div v-if="settings.experience == 0">
          {{ lang == 'fr' ? 'Le béluga' : 'Beluga' }}
        </div>
        <div v-else>
          {{ lang == 'fr' ? 'Le rorqual à bosse' : 'Humpback whale' }}
        </div>
      </div>
      <div class="main-text" v-html="content[lang]"></div>
    </div>
    <Icons v-if="content.roles" :roles="content.roles" />
    <div class="footer center">
      <ContinueButton />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: this.$store.state.settings,
      showMessage: false,
      lang: this.$store.state.settings.langue,
    }
  },
  props: ['content'],
  computed: {
    status() {
      return this.$store.getters.getStatus
    },
  },
  methods: {
    isCompleted(theme, subtheme) {
      if (theme < this.status.theme) {
        return true
      }
      if (this.status.subtheme > subtheme && theme <= this.status.theme) {
        return true
      }
      return false
    },
    done() {
      this.$parent.increment()
    },
  },
  mounted() {
    if (this.content.hasInfo && this.content.type == 'rapport') {
      console.log('showInfo')
      this.$parent.showInfo = true
    }
    if (this.content.hasMessage) {
      this.$parent.showMessage = true
    }
  },
}
</script>

<style>
.intro {
  color: white;
  padding: 120px 35px 0 35px;
}
.intro .experience,
.intro .sous-titre {
  animation: fromTopRight var(--default-tr-speed) ease-out;
}
.intro .main-text {
  animation: fromTopLeft var(--default-tr-speed) ease-out;
  margin-top: 0px;
}

.intro .experience {
  margin-bottom: 40px;
}
.intro .icons {
  margin: 90px auto;
  margin-left: 43%;
  display: flex;
  /* width: 45%; */
  transform: scale(1.6);

  /* justify-content: space-between; */
}
.intro .icons .icon svg {
  /* width: 300px; */
}
.intro .icon:last-child {
  margin-right: 0;
}
.intro .continue {
  border-color: white !important;
}
</style>
