<template>
  <div class="setup">
    <Loader />
    <transition name="fade">
      <div
        v-if="!$fetchState.pending && settings && assetsLoaded"
        :class="['wrapper', 'exp-' + settings.experience]"
      >
        <div
          :class="['button circle langue', settings.langue]"
          @click="
            updateSettings('langue', settings.langue == 'fr' ? 'en' : 'fr')
          "
        >
          {{ settings.langue }}
        </div>
        <div
          class="button experience"
          @click="
            updateSettings('experience', settings.experience == 0 ? 1 : 0)
          "
        ></div>
        <!-- <div
          class="button circle parcours"
          @click="
            updateSettings(
              'parcours',
              parseInt(settings.parcours) + 1 > themes.length
                ? 1
                : parseInt(settings.parcours) + 1
            )
          "
        >
          {{ settings.parcours }}
        </div> -->
        <div class="confirmation">
          <!-- <ol class="listing">
            <li v-for="(t, index) in themes" :key="'t' + index">
              <div v-if="t[settings.langue] !== ''">
                {{ t[settings.langue] }}
              </div>
            </li>
          </ol> -->
          <div class="button ok" @click="$router.push('/home')">OK ></div>

          <!-- <label class="switch">
            <h5>Show Camera Controls</h5>
            <input
              type="checkbox"
              v-model="showCameraControls"
              @click="toggleCameraControls"
            />
            <div class="slider round"></div>
          </label> -->
        </div>
      </div>
      <div v-else-if="$fetchState.error">
        Erreur : Le serveur SQLITE n'est pas en service.
      </div>
      <div v-else>
        <LoadingDots />
      </div>
    </transition>
  </div>
</template>

<script>
//Load local JSON content
import beluga from '~/static/data/beluga.json'
import rorqual from '~/static/data/rorqual.json'
import VuexPersistence from 'vuex-persist'
export default {
  layout: 'default',
  data() {
    return {
      settings: null,
      hasServerEnabled: true,
      assetsLoaded: false,
      showCameraControls: this.$store.state.showCameraControls,
    }
  },
  //On load, fetch settings from local SQLITE server
  async fetch() {
    this.settings = await this.$axios
      .$get('/api/settings')
      .then((res) => {
        this.$store.commit('setSettings', res.settings[0])
        return res.settings[0]
      })
      .catch((err) => {
        this.hasServerEnabled = false
        const settings = { id: 1, experience: 0, parcours: 1, langue: 'fr' }
        this.$store.commit('setSettings', settings)
        return settings
      })
  },
  computed: {
    themes() {
      let themes = this.$store.getters.getThemes
      console.log(themes)
      if (themes) {
        return themes.filter((t) => !null && !t.isLast)
      }
    },
  },
  watch: {
    //If settings change, store the appropriate JSON content in the store
    settings() {
      const newContent = this.settings.experience == 0 ? beluga : rorqual
      console.log(newContent)
      this.$store.commit('setContent', newContent)
    },
    themes(val) {
      console.log('new content')
      console.log(val)
    },
  },
  methods: {
    toggleCameraControls() {
      console.log(!this.showCameraControls)
      this.$store.commit('toggleCameraControls', !this.showCameraControls)
    },
    //Update settings in SQLITE server
    async updateSettings(setting, value) {
      if (this.hasServerEnabled) {
        await this.$axios
          .$post('/api/settings', { setting, value })
          .then((res) => {
            if (res.settings) {
              this.settings = res.settings[0]
              this.$store.commit('setSettings', res.settings[0])
            }
          })
          .catch((err) => {
            this.updateSettingsOffline(setting, value)
          })
      } else {
        this.updateSettingsOffline(setting, value)
      }
    },
    updateSettingsOffline(setting, value) {
      const tempSettings = JSON.parse(JSON.stringify(this.settings))
      tempSettings[setting] = value
      this.settings = tempSettings
      this.$store.commit('setSettings', tempSettings)
    },
  },
  mounted() {
    // this.testApi()
    //Try to fetch settings from SQLITE server every 2 secs
    const fetchInterval = setInterval(() => {
      if (this.settings == null || this.settings == undefined) {
        this.$fetch()
      } else {
        clearInterval(fetchInterval)
      }
    }, 2000)
  },
}
</script>

<style>
.loading-dots .stage {
  transform: scale(3);
  transform-origin: -25% -480px;
}
.wrapper {
  font-size: 3em;
  width: 100%;
  height: 100%;
  min-height: 1920px;
  padding: 15% 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 25%;
  /* transition: background-color 0.3s; */
}
.wrapper.exp-0 {
  background-color: rgb(156, 184, 192);
}
.wrapper.exp-1 {
  background-color: rgb(137, 114, 146);
}
.setup .button {
  background: none;
}
.experience,
.ok {
  border: none;
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  border-radius: 50%;
  width: 300px;
  height: 300px;
}
.langue {
  border: none;
}
.langue.fr {
  background-color: blue;
}
.langue.en {
  background-color: red;
}
.parcours,
.langue {
  font-size: 96px;
}
.setup .experience {
  width: 100%;
  height: 300px;
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
}
.exp-0 .experience {
  background-image: url('@/assets/images/beluga.png');
}
.exp-1 .experience {
  background-image: url('@/assets/images/rorqual.png');
}
.confirmation {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.ok {
  font-size: 96px;
  /* margin-top: auto; */
  /* margin-top: 100px; */
  align-self: flex-end;
}

.listing {
  font-size: 0.2em;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #101010;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.switch h5 {
  font-size: 60px;
}
</style>
