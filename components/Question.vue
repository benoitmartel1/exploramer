<template>
  <div class="question">
    <Header :class="[{ blurred: $parent.blurred }, 'content']" />
    <div
      :class="[{ blurred: showValidation || showResolve }, 'content body']"
      v-show="!rightAnswer"
    >
      {{ content.question[lang] }}
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
    </div>

    <div v-show="showValidation" class="validation popup">
      <div class="content">
        <div class="text">Es-tu certain.e de ta réponse?</div>
        <div class="button validate" @click="validate()">Valider</div>
        <div class="button cancel" @click="cancel()">Annuler</div>
      </div>
    </div>

    <div v-show="showResolve && !rightAnswer" class="validation popup">
      <div class="content">
        <div class="text">{{ content.resolve.wrong[lang] }}</div>
        <div class="button" @click="retry()">Réessayer</div>
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
          {{ content.resolve.right[lang] }}
        </div>

        <div class="footer center">
          <div class="button" @click="done()">Continuer</div>
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
  props: ['content'],
  methods: {
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
        this.rightAnswer = true
        this.$parent.blurred = false
      }
      this.showValidation = false
      //   this.$parent.blurred = false
      this.showResolve = true
    },
    done() {
      this.$parent.increment()
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

.question .choices .button {
  min-width: 400px;
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
}
.check svg {
  animation: popButton 300ms forwards ease-out;
}

.choices .button {
  opacity: 0;
  animation: popButton 300ms forwards ease-out;
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
</style>
