<template>
  <div id="pdf" style="overflow: auto" :key="count">
    <div class="controls">
      <button
        class="approMode"
        @click="updateSettings(lang == 'fr' ? 'en' : 'fr')"
      >
        {{ lang == 'fr' ? 'en' : 'fr' }}
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
                :class="[subtheme.isLast ? 'last-theme' : '', 'main-wrapper']"
              >
                <Nav
                  v-if="step.type !== 'outro' && step.type !== 'intro'"
                  :isRapport="step.type == 'rapport'"
                  :unlocks="step.unlocks"
                  :themeIndex="tindex"
                />

                <div id="main">
                  <div>
                    <Title
                      v-if="step.type == 'title'"
                      :content="stepContent(theme[lang], subtheme, step)"
                    />
                    <Intro v-if="step.type == 'intro'" :content="step" />
                    <Outro v-if="step.type == 'outro'" :content="step" />
                    <Rapport
                      v-if="step.type == 'rapport'"
                      :content="step"
                      :allContent="content"
                      :status="{
                        theme: tindex,
                        subtheme: sindex,
                        step: index,
                      }"
                      :showInfo="step.hasInfo == true"
                      :blurred="false"
                    />

                    <Scan v-if="step.type == 'scan'" :content="step" />

                    <Question
                      v-if="step.type == 'question'"
                      :content="step"
                      :isLastTheme="subtheme.isLast"
                      :preStatus="step.preStatus"
                    />

                    <Action
                      v-if="step.type == 'action'"
                      :content="step"
                      :showInfo="step.hasInfo"
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
      content: this.$store.state.content, // Uncomment for production
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
  },
  watch: {
    //If settings change, store the appropriate JSON content in the store
    settings() {
      const newContent = this.settings.experience == 0 ? beluga : rorqual
      //   console.log(newContent)
      this.$store.commit('setContent', newContent)
    },
    themes(val) {
      console.log('new content')
      console.log(val)
    },
  },
  methods: {
    updateSettings(lang) {
      this.$store.commit('updateLangue', lang)
      this.count++
    },
    createDuplicates(steps) {
      let arr = []
      steps.forEach((s) => {
        let skip = false
        if (s.hasInfo) {
          let temp = JSON.parse(JSON.stringify(s))
          delete s.hasInfo
          //   console.log(s)
          arr.push(s)
          arr.push(temp)
          skip = true
        }

        if (s.type == 'question') {
          arr.push(s)
          let states = ['validate', 'right', 'wrong']
          states.forEach((state) => {
            let temp = JSON.parse(JSON.stringify(s))
            temp.preStatus = state
            arr.push(temp)
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
  mounted() {
    // ... you code
    //Try to fetch settings from SQLITE server every 2 secs
    // const fetchInterval = setInterval(() => {
    //   if (this.settings == null || this.settings == undefined) {
    //     this.$fetch()
    //   } else {
    //     clearInterval(fetchInterval)
    //   }
    // }, 2000)
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
  display: block;
  /* height: 192px;
  width: 120px; */
  -webkit-font-smoothing: subpixel-antialiased;
  transform: translate3d(0, 0, 0) scale(calc(var(--appro-scale) / 10));
  zoom: 1;
  border: 1px yellow solid;
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
/* .loading-dots .stage {
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

} */
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
</style>
