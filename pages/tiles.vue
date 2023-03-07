<template>
  <div id="pdf" style="overflow: auto" :key="count">
    <div class="controls">
      <button
        class="approMode"
        @click="updateSettings('langue', lang == 'fr' ? 'en' : 'fr')"
      >
        {{ lang == 'fr' ? 'en' : 'fr' }}
      </button>
      <button
        class="approMode"
        @click="updateSettings('experience', experience == 0 ? 1 : 0)"
      >
        {{ experience == 1 ? 'Béluga' : 'Rorqual à bosse' }}
      </button>
    </div>
    <div v-for="(theme, tindex) in content.themes" :key="theme + tindex">
      <div
        v-for="(subtheme, sindex) in theme.subthemes"
        :key="subtheme + sindex"
      >
        <div
          v-for="(step, index) in createDuplicates(subtheme.steps)"
          :key="step + index"
        >
          <div class="casier">
            <div class="appro">
              <!-- {{ theme.fr }}
            {{ subtheme.fr }}
            {{ step }} -->
              <Info v-if="step.hasInfo" :info="subtheme.info" />
              <div
                v-if="
                  blurred ||
                  step.hasInfo ||
                  step.preStatus == 'validate' ||
                  step.preStatus == 'wrong'
                "
                class="blurZone"
              ></div>
              <div
                :class="[
                  subtheme.isLast || step.type == 'intro' ? 'last-theme' : '',
                  'main-wrapper',
                  step.lastSlide == true && !showRapport ? 'last-slide' : '',
                ]"
              >
                <Nav
                  v-if="!step.noNav"
                  :isRapport="step.type == 'rapport'"
                  :unlocks="step.unlocks"
                  :themeIndex="tindex"
                  :isLast="step.lastSlide"
                />

                <div id="main">
                  <div>
                    <Title
                      v-if="step.type == 'title'"
                      :status="status(tindex, sindex, index)"
                      :content="stepContent(theme[lang], subtheme, step)"
                    />

                    <Intro v-if="step.type == 'intro'" :content="step" />
                    <Outro v-if="step.type == 'outro'" :content="step" />
                    <Rapport
                      v-if="step.type == 'rapport'"
                      :content="step"
                      :allContent="content"
                      :status="status(tindex, sindex, index)"
                      :showInfo="step.hasInfo == true"
                      :blurred="false"
                    />

                    <Scan
                      v-if="step.type == 'scan'"
                      :content="step"
                      :status="status(tindex, sindex, index)"
                      :preStatus="step.preStatus"
                    />

                    <Question
                      v-if="step.type == 'question'"
                      :content="step"
                      :isLastTheme="subtheme.isLast"
                      :preStatus="step.preStatus"
                      :status="status(tindex, sindex, index)"
                    />

                    <Action
                      v-if="step.type == 'action'"
                      :content="step"
                      :showInfo="step.hasInfo"
                      :preStatus="step.preStatus"
                      :status="status(tindex, sindex, index)"
                    />

                    <!-- <Admin v-if="showAdmin" :props="stepContent.step.type" /> -->
                  </div>
                  <Back :type="step.type" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Load local JSON content
import beluga from '~/static/data/beluga.json'
import rorqual from '~/static/data/rorqual.json'

export default {
  layout: 'print',
  data() {
    return {
      count: 0,
      settings: null,
    }
  },
  computed: {
    themes() {
      console.log(this.$store.getters.getThemes)
      return this.$store.getters.getThemes.filter((t) => !null && !t.isLast)
    },
    lang() {
      return this.$store.state.settings.langue
    },
    experience() {
      return this.$store.state.settings.experience
    },
    content() {
      return this.$store.state.content // Uncomment for production
    },
  },
  watch: {
    //If settings change, store the appropriate JSON content in the store
    experience(val) {
      console.log(val)
      const newContent = val == 0 ? beluga : rorqual
      //   console.log(newContent)
      this.$store.commit('setContent', newContent)
    },
    themes(val) {
      console.log('new content')
      console.log(val)
    },
  },
  methods: {
    status(tindex, sindex, index) {
      return {
        theme: tindex,
        subtheme: sindex,
        step: index,
      }
    },
    updateSettings(setting, value) {
      //   const tempSettings = JSON.parse(JSON.stringify(this.settings))
      //   tempSettings[setting] = value
      //   this.settings = tempSettings
      console.log(value)
      this.$store.commit('updateSetting', { setting: setting, value: value })

      this.count++
    },
    createDuplicates(steps) {
      let arr = []
      steps.forEach((s) => {
        let skip = false
        console.log(s)
        if (s.hasInfo) {
          s.preStatus = 'hasInfo'
          let temp = JSON.parse(JSON.stringify(s))
          //   temp.preStatus
          delete s.hasInfo
          //   console.log(s)
          arr.push(s)
          arr.push(temp)
          skip = true
        }

        if (s.type == 'question') {
          arr.push(s)
          let states = ['validate', 'wrong', 'right']
          states.forEach((state) => {
            if (state == 'right' && !s.resolve.right) {
            } else {
              let temp = JSON.parse(JSON.stringify(s))
              temp.preStatus = state
              arr.push(temp)
            }
          })
        } else if (s.type == 'scan') {
          if (!skip) arr.push(s)
          let states = ['scanned']
          states.forEach((state) => {
            {
              let temp = JSON.parse(JSON.stringify(s))
              temp.preStatus = state
              arr.push(temp)
            }
          })
        } else if (!skip) {
          arr.push(s)
        }
      })
      return arr
    },

    stepContent(t, s, st) {
      return { theme: t, subtheme: s, step: st }
    },
  },
}
</script>

<style>
:root {
  --appro-scale: 2;
}

.casier .appro {
  width: var(--app-width);
  height: var(--app-height);
  /* float: left; */
  overflow: hidden;
  display: block;
  /* height: 192px;
  width: 120px; */
  transform: scale(calc(var(--appro-scale) / 10));
  zoom: 1;
  /* border: 1px yellow solid; */
}
.casier .main-wrapper {
  /* width: 1180px;
  margin: auto;
  margin-top: 47px; */

  width: 1180px;
  height: 1810px;
  margin: 47px auto auto;
}

.casier {
  margin: 5px 5px;
  width: calc(var(--app-width) / 10 * var(--appro-scale));
  height: calc(var(--app-height) / 10 * var(--appro-scale));
  float: left;
  overflow: hidden;
}

h1 {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 50px;
}
button {
  font-size: 96px;
}
#main > div:not(.back) {
  z-index: 1;
  width: 100%;
}
#main {
  margin: 0;
  top: 104px;
  padding: 0;
  height: 1704px;
}
.experience {
  padding: 10px;
  height: 180px;
}
.experience img {
  width: 70%;

  margin: auto;
  display: block;
  /* margin: auto; */
}
#pdf {
  overflow: auto;
}
#pdf .controls {
  display: flex;
  justify-content: center;
  width: 100%;
}
#pdf .approMode {
  margin-right: 0 !important;
  font-size: 18px;
  padding: 5px;
  min-width: 200px;
  justify-content: center;
}
@page {
  size: A4;
  margin: 0;
}
@media print {
  #pdf .controls {
    display: none !important;
  }
  body {
    background-color: white;
  }
  #pdf {
    /* width: 100%; */
    /* min-height: 29.7cm !important; */
  }
  .casier {
    margin: auto;
    margin-top: 0.3in;
    float: none;
    width: 7.5in !important;
    height: 11in !important;
    page-break-after: always;
  }
  .casier .appro {
    /* width: 210mm !important;
    height: 297mm !important; */
    /* float: left; */
    display: block;
    /* height: 192px;
  width: 120px; */
    /* transform-origin: 50% 50%; */
    transform: scale(0.54);
    margin: 0.12in 0 0 0.12in;
    /* zoom: 1; */
    /* border: 3px yellow solid; */
  }
}
</style>
