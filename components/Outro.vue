<template>
  <div :class="[{ blurred: $parent.blurred || $parent.showInfo }, 'outro']">
    <div class="center">
      <div class="experience">
        <img
          v-if="settings.experience == 0"
          src="@/assets/images/beluga.png"
          alt=""
        />
        <img v-else src="@/assets/images/rorqual.png" alt="" />
      </div>
      <div v-if="lang == 'fr'">
        <div class="sous-titre">
          <div v-if="settings.experience == 0">Le béluga</div>
          <div v-else>Le rorqual à bosse</div>
        </div>
        <div class="bravo">Bravo !</div>
        <h2>Vous avez réussi à élucider<br />le mystère !</h2>
        <div class="main-text">
          <p>{{ content[lang] }}</p>
        </div>
      </div>
      <div v-else class="en">
        <div class="sous-titre">
          <div v-if="settings.experience == 0">Beluga</div>
          <div v-else>Humpback whale</div>
        </div>
        <div class="bravo">Congratulations!</div>
        <h2>You have solved<br />the mystery!</h2>
        <div class="main-text">
          <p>{{ content[lang] }}</p>
        </div>
      </div>
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
.outro {
  color: white;
  padding: 120px 35px 0 35px;
}
.main-text {
  text-align: left;
  font-size: 60px;
  line-height: 72px;
  margin-top: 160px;
}
.bravo {
  font-weight: 600;
  font-size: 150px;
  margin-top: 50px;
  margin-bottom: -80px;
}
.en .bravo {
  font-size: 120px;
  margin-bottom: -50px;
}
h2 {
  font-size: 66px;
  line-height: 72px;
}
.outro .experience {
  margin-bottom: 40px;
}
.outro .experience,
.outro .sous-titre {
  animation: fromTopRight var(--default-tr-speed) ease-out;
}

.outro .bravo,
.outro h2 {
  animation: fromTopLeft var(--default-tr-speed) ease-out;
}
.outro .main-text {
  animation: fromBottomRight var(--default-tr-speed) ease-out;
}
</style>
