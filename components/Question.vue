<template>
  <div class="question">
    <div v-show="!showResolve">
      {{ content.question[lang] }}
      <ul>
        <li
          class="button"
          v-for="(c, index) in content.choices"
          :key="c + index"
          @click="select(index)"
        >
          {{ c[lang] }}
        </li>
      </ul>
    </div>

    <div v-show="showValidation" class="validation popup">
      <div>
        SUre??
        <div class="button" @click="validate()">Oui</div>
        <div class="button" @click="showValidation = false">Non</div>
      </div>
    </div>

    <div v-show="showResolve" class="resolve">
      <div v-if="rightAnswer">
        {{ content.resolve.right[lang] }}
        <div class="button" @click="done()">Continuer</div>
      </div>
      <div v-else>
        {{ content.resolve.wrong[lang] }}
        <div class="button" @click="showResolve = false">Réessayer</div>
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
        this.$parent.showValidate = true
        // this.showValidation = true
      }
    },
    validate() {
      if (this.content.choices[this.selectedChoice].isAnswer) {
        this.rightAnswer = true
      }
      this.showResolve = true
      //   this.showValidation = false
    },
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style>
.question {
  position: relative;
}
.question .button {
  display: block;
  margin-bottom: 30px;
}
</style>
