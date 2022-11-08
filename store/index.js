export const state = () => ({
  settings: {},
  content: { themes: {} },
  status: {
    theme: 0,
    subtheme: 0,
    step: 0,
    done: false,
  },
})

export const getters = {
  getExperience(state) {
    return state.experience
  },
  getStepContent: (state) => {
    const theme = state.content.themes[state.status.theme]
    const subtheme = theme.subthemes[state.status.subtheme]
    const lang = state.settings.langue
    return {
      theme: theme[lang],
      subtheme: subtheme,
      step: subtheme.steps[state.status.step],
    }
  },
}

export const mutations = {
  incrementTheme(state) {
    const max = state.content.themes.length
    const next = state.status.theme + 1
    if (next < max) {
      state.status.theme++
    } else {
      state.status.done = true
      state.status.theme = 0
    }
  },
  decrementTheme(state) {
    const max = state.content.themes.length
    const prev = state.status.theme - 1
    if (prev >= 0) {
      state.status.theme--
    } else {
      state.status.theme = max - 1
    }
  },
  incrementSubtheme(state) {
    const max = state.content.themes[state.status.theme].subthemes.length
    const next = state.status.subtheme + 1
    if (next < max) {
      state.status.subtheme++
    } else {
      this.commit('incrementTheme')
      state.status.subtheme = 0
    }
  },
  decrementSubtheme(state) {
    const prev = state.status.subtheme - 1
    if (prev >= 0) {
      state.status.subtheme--
    } else {
      this.commit('decrementTheme')
      const max = state.content.themes[state.status.theme].subthemes.length
      state.status.subtheme = max - 1
    }
  },
  incrementStep(state) {
    const max =
      state.content.themes[state.status.theme].subthemes[state.status.subtheme]
        .steps.length
    const next = state.status.step + 1
    if (next < max) {
      state.status.step++
    } else {
      this.commit('incrementSubtheme')
      state.status.step = 0
    }
  },
  decrementStep(state) {
    const prev = state.status.step - 1
    if (prev >= 0) {
      state.status.step--
    } else {
      this.commit('decrementSubtheme')
      const max =
        state.content.themes[state.status.theme].subthemes[
          state.status.subtheme
        ].steps.length
      state.status.step = max - 1
    }
  },
  setSettings(state, settings) {
    state.settings = settings
  },
  setContent(state, content) {
    //const arr = state.content.themes
    state.content = JSON.parse(JSON.stringify(content))
    state.content.themes.push.apply(
      state.content.themes,
      state.content.themes.splice(0, state.settings.parcours - 1)
    )

    // state.content = content
    //
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
