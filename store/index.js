export const state = () => ({
  settings: {},
  content: { themes: undefined },
  theme: 0,
  subtheme: 0,
  step: 0,
  done: false,
})

export const getters = {
  getExperience(state) {
    return state.settings.experience
  },
  getThemes(state) {
    return state.content.themes
  },
  getTheme(state) {
    return state.theme
  },
  getStatus(state) {
    let arr = { theme: state.theme, subtheme: state.subtheme, step: state.step }
    return arr
  },
  getStepContent: (state) => {
    const theme = state.content.themes[state.theme]
    const subtheme = theme.subthemes[state.subtheme]
    const lang = state.settings.langue
    return {
      theme: theme[lang],
      subtheme: subtheme,
      step: subtheme.steps[state.step],
    }
  },
}

export const mutations = {
  setTheme(state, theme) {
    state.step = 0
    state.subtheme = 0
    state.theme = theme
  },
  incrementTheme(state) {
    const max = state.content.themes.length
    const next = state.theme + 1
    if (next < max) {
      state.theme++
    } else {
      state.done = true
      state.theme = 0
    }
  },
  decrementTheme(state) {
    const max = state.content.themes.length
    const prev = state.theme - 1
    if (prev >= 0) {
      state.theme--
    } else {
      state.theme = max - 1
    }
  },
  incrementSubtheme(state) {
    const max = state.content.themes[state.theme].subthemes.length
    const next = state.subtheme + 1
    if (next < max) {
      state.subtheme++
    } else {
      this.commit('incrementTheme')
      state.subtheme = 0
    }
  },
  decrementSubtheme(state) {
    const prev = state.subtheme - 1
    if (prev >= 0) {
      state.subtheme--
    } else {
      this.commit('decrementTheme')
      const max = state.content.themes[state.theme].subthemes.length
      state.subtheme = max - 1
    }
  },
  incrementStep(state) {
    const max =
      state.content.themes[state.theme].subthemes[state.subtheme].steps.length
    const next = state.step + 1
    if (next < max) {
      state.step++
    } else {
      state.step = 0
      this.commit('incrementSubtheme')
    }
  },
  decrementStep(state) {
    const prev = state.step - 1
    if (prev >= 0) {
      state.step--
    } else {
      this.commit('decrementSubtheme')
      const max =
        state.content.themes[state.theme].subthemes[state.subtheme].steps.length
      state.step = max - 1
    }
  },
  setSettings(state, settings) {
    state.settings = settings
    this.commit('resetStatus')
  },
  resetStatus(state) {
    state.step = 0
    state.done = false
    state.theme = 0
    state.subtheme = 0
  },
  updateSetting(state, payload) {
    state.settings[payload.setting] = payload.value
  },
  setContent(state, content) {
    //const arr = state.content.themes
    state.content = JSON.parse(JSON.stringify(content))
    var offset = state.settings.parcours - 1
    var arr = state.content.themes.filter((t) => !t.isLast)
    var last = state.content.themes.filter((t) => t.isLast)[0]
    state.content.themes = [...arr.slice(offset), ...arr.slice(0, offset)]
    state.content.themes.push(last)
  },
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  },
}
