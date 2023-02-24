<template>
  <div class="question">
    <Header :class="[{ blurred: isBlurred() }, 'content']" />

    <div
      :class="[{ blurred: showValidation || showResolve }, 'content body']"
      v-show="!rightAnswer"
    >
      <div class="text" v-html="content.question[lang]"></div>

      <div class="choices">
        <div
          class="button"
          v-for="(c, index) in content.choices"
          :key="c + index"
          @click="select(index)"
        >
          {{ c[lang] }}
        </div>
      </div>

      <div
        v-show="!rightAnswer && content.noBack !== true"
        class="back-button"
        @click="$parent.decrement()"
      >
        <svg
          id="a"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 241.73 103.1"
        >
          <path
            d="m74.81,70.73c-3.3,3.3-7.69,5.12-12.35,5.12h-11.38c-2.11,0-3.82-1.71-3.82-3.82s1.71-3.82,3.82-3.82h11.38c2.63,0,5.1-1.02,6.95-2.88,1.86-1.86,2.88-4.33,2.88-6.95,0-5.42-4.41-9.83-9.83-9.83h-27.19l7.13,7.13c1.49,1.49,1.49,3.91,0,5.4-1.49,1.49-3.91,1.49-5.4,0l-12.04-12.04c-2.37-2.38-2.37-6.24,0-8.62l12.04-12.04c.75-.75,1.72-1.12,2.7-1.12s1.95.37,2.7,1.12c1.49,1.49,1.49,3.91,0,5.4l-7.13,7.13h27.19c9.63,0,17.47,7.84,17.47,17.47,0,4.67-1.82,9.05-5.12,12.35Z"
            style="fill: #005e8f"
          />
        </svg>
      </div>
    </div>

    <div v-show="showValidation" class="validation popup">
      <div class="content">
        <div class="text">
          {{
            lang == 'fr' ? 'Es-tu certain.e de ta réponse ?' : 'Are you sure?'
          }}
        </div>
        <div class="button validate" @click="validate()">
          {{ lang == 'fr' ? 'Valider' : 'Confirm' }}
        </div>
        <div class="button cancel" @click="cancel()">
          {{ lang == 'fr' ? 'Annuler' : 'Cancel' }}
        </div>
      </div>
    </div>

    <div v-show="showResolve && !rightAnswer" class="validation popup">
      <div class="content">
        <div class="text" v-html="content.resolve.wrong[lang]"></div>
        <div class="button" @click="retry()">
          {{ lang == 'fr' ? 'Réessayer' : 'Try again' }}
        </div>
      </div>
    </div>

    <div v-show="showResolve" class="resolve body">
      <div v-if="rightAnswer" class="footer-wrapper">
        <div class="row">
          <div class="check">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="173"
              height="173"
              viewBox="0 0 173 173"
            >
              <g
                id="Groupe_66"
                data-name="Groupe 66"
                transform="translate(-556.574 -606.574)"
              >
                <g
                  id="Ellipse_2"
                  data-name="Ellipse 2"
                  transform="translate(556.574 606.574)"
                  fill="none"
                  stroke="#179573"
                  stroke-width="12"
                >
                  <circle cx="86.5" cy="86.5" r="86.5" stroke="none" />
                  <circle cx="86.5" cy="86.5" r="80.5" fill="none" />
                </g>
                <text
                  id="_"
                  data-name="✓"
                  transform="translate(592.574 737.574)"
                  fill="#179573"
                  font-size="117"
                  font-family="SegoeUIEmoji, Segoe UI Emoji"
                >
                  <tspan x="0" y="0">✓</tspan>
                </text>
              </g>
            </svg>
          </div>
          <div class="text" v-html="content.resolve.right[lang]"></div>
        </div>

        <div class="footer center">
          <ContinueButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$store.state.settings.langue,
      showValidation: false,
      showResolve: false,
      selectedChoice: null,
      rightAnswer: false,
    }
  },
  props: ['content', 'isLastTheme', 'preStatus', 'status'],
  mounted() {
    if (this.preStatus) {
      if (this.preStatus == 'validate') this.showValidation = true
      if (this.preStatus == 'right') {
        this.showResolve = true
        this.rightAnswer = true
      }
      if (this.preStatus == 'wrong') {
        this.showResolve = true
        this.rightAnswer = false
      }
    }
  },
  methods: {
    isBlurred() {
      if (this.preStatus == 'validate' || this.preStatus == 'wrong') {
        return true
      }
      return this.$parent.blurred
    },
    select(index) {
      this.selectedChoice = index
      if (this.content.validate) {
        this.$parent.blurred = true
        this.showValidation = true
      }
    },
    cancel() {
      this.showValidation = false
      this.$parent.blurred = false
    },
    retry() {
      this.showResolve = false
      this.$parent.blurred = false
    },
    validate() {
      if (this.content.choices[this.selectedChoice].isAnswer) {
        if (this.isLastTheme) {
          this.done()
        } else {
          this.rightAnswer = true
          this.$parent.blurred = false
        }
      }
      this.showValidation = false
      //   this.$parent.blurred = false
      this.showResolve = true
    },
    done() {
      this.$parent.increment()
      this.showValidation = false
      this.showResolve = false
      this.selectedChoice = null
      this.rightAnswer = false
    },
    beforeDestroy() {
      console.log('destroy')
      console.log(this.$parent.showRapport)
      console.log(this.showValidation)
    },
  },
}
</script>

<style>
.footer-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.resolve {
  height: 100%;
}
.resolve.body {
  padding-top: 80px;
}
.resolve .text {
  padding: 0 40px;
}
.resolve .row,
.body .text {
  animation: fadeLeft var(--default-tr-speed) ease-out !important;
}
.question .choices .button {
  width: 500px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  margin-bottom: 70px;
  margin-right: 20px;
}
.button.cancel {
  background-color: #c75666;
}
.button.validate {
  background-color: #179573;
}
.validation .content {
  text-align: center;
}
.validation .text {
  margin-bottom: 70px;
  margin-top: 50px;
  padding: 0 20px;
}
.content .question {
  width: 100%;
}
.body {
  padding-top: 150px;
}
.choices {
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.check {
  float: left;
  margin-right: 50px;
  height: 100%;
  /* margin: auto; */
  margin-bottom: 30px;
  text-align: center;
}
.check svg {
  animation: popButton 300ms forwards ease-out;
}

.choices .button {
  /* opacity: 0; */
  /* animation: popButton 300ms forwards ease-out; */
  animation: fromBottomRight var(--default-tr-speed) both;
}

.choices .button:nth-child(2) {
  animation-delay: 100ms;
}
.choices .button:nth-child(3) {
  animation-delay: 200ms;
}
.choices .button:nth-child(4) {
  animation-delay: 300ms;
}
.last-theme .choices .button {
  width: 80%;
  margin-bottom: 30px;
  min-height: 175px;
  display: flex;
  align-items: center;
}
</style>
