<template>
  <div class="question">
    <div class="content" v-show="!showResolve">
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
        <div class="question">Es-tu certain.e de ta réponse?</div>
        <div class="button validate" @click="validate()">Valider</div>
        <div class="button cancel" @click="showValidation = false">Annuler</div>
      </div>
      <div class="blurZone"></div>
    </div>

    <div v-show="showResolve" class="resolve">
      <div v-if="rightAnswer">
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
        <div class="center">
          <div class="button" @click="done()">Continuer</div>
        </div>
      </div>
      <div v-else>
        {{ content.resolve.wrong[lang] }}
        <div class="center">
          <div class="button" @click="showResolve = false">Réessayer</div>
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
    validate() {
      if (this.content.choices[this.selectedChoice].isAnswer) {
        this.rightAnswer = true
      }
      this.showResolve = true
      this.showValidation = false
      this.$parent.blurred = false
    },
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style>
.question {
  padding-top: 100px;
  /* position: relative; */
}
.question .button {
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
  /* padding-top: 100px; */
  text-align: center;
  /* display: flex; */
  /* /* align-content: center; */
  /* align-items: center; */
  /* justify-content: center; */
}
.content .question {
  width: 100%;
}
.choices {
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.question .center {
  margin-top: 180px;
}
.check {
  float: left;
  margin-right: 50px;
}
</style>
