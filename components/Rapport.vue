<template>
  <div :class="[{ blurred: blurred || showInfo }, 'rapport']">
    <div class="center">
      <div class="experience">
        <img
          v-if="settings.experience == 0"
          src="@/assets/images/beluga.png"
          alt=""
        />
        <img v-else src="@/assets/images/rorqual.png" alt="" />
      </div>
      <h1 v-if="lang == 'fr'">Résumé de l’enquête</h1>
      <h1 v-else>SUMMARY OF THE INVESTIGATION</h1>
      <div class="sous-titre">
        <div v-if="settings.experience == 0">
          {{ lang == 'fr' ? 'Le béluga' : 'Beluga' }}
        </div>
        <div v-else>
          {{ lang == 'fr' ? 'Le rorqual à bosse' : 'Humpback whale' }}
        </div>
      </div>
    </div>
    <div class="form" v-if="settings.experience == 0">
      <!--Thème 1------------------------------------------>
      <h3>{{ themes[0] }}</h3>
      <div class="prop">
        <div class="key">{{ (lang == 'fr' ? 'Sexe' : 'Sex') + ' :' }}</div>
        <div v-if="isCompleted(0, 4)" class="value">
          {{ lang == 'fr' ? 'Femelle' : 'Female' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">{{ (lang == 'fr' ? 'Âge' : 'Age') + ' :' }}</div>
        <div v-if="isCompleted(0, 1)" class="value">
          {{ lang == 'fr' ? '27 ans' : '27' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Longueur' : 'Length') + ' :' }}
        </div>
        <div v-if="isCompleted(0, 3, 2)" class="value">
          {{ lang == 'fr' ? '3,50 m' : '3.50 m' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ lang == 'fr' ? 'note' : 'Note' }} :</div>
        <div v-if="isCompleted(0, 3)" class="value">
          {{
            lang == 'fr'
              ? 'Grandeur normale pour son âge.'
              : 'Normal length for its age'
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Poids' : 'Weight') + ' :' }}
        </div>
        <div v-if="isCompleted(0, 0)" class="value">
          {{ lang == 'fr' ? '1 400 kg' : '1,400 kg' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div v-if="isCompleted(0, 2)" class="value">
          {{
            lang == 'fr'
              ? 'Poids normal pour son âge.'
              : 'Normal weight for its age'
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>

      <!--Thème 2------------------------------------------>
      <h3>{{ themes[1] }}</h3>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Alimentation' : 'Diet') + ' :' }}
        </div>
        <div v-if="isCompleted(1, 0)" class="value">
          {{ lang == 'fr' ? 'Normale' : 'Normal' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div v-if="isCompleted(1, 0)" class="value">
          {{
            lang == 'fr'
              ? 'L’alimentation est contaminée par les polluants toxiques.'
              : "The beluga's diet is contaminated by toxic pollutants"
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <!--Thème 3------------------------------------------>
      <h3>{{ themes[2] }}</h3>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Toxines' : 'Toxins') + ' :' }}
        </div>
        <div v-if="isCompleted(2, 0, 2)" class="value">
          {{ lang == 'fr' ? '10 ng/g' : '10 ng/g' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div v-if="isCompleted(2, 0)" class="value">
          {{
            lang == 'fr'
              ? 'Quantité trop élevée de toxines.'
              : 'Elevated level of toxins'
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">
          {{
            (lang == 'fr'
              ? 'Signes d’accouchement'
              : 'Signs of recent calving') + ' :'
          }}
        </div>
        <div v-if="isCompleted(2, 1)" class="value">
          {{ lang == 'fr' ? 'Oui' : 'Yes' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div v-if="isCompleted(2, 1)" class="value">
          {{
            lang == 'fr'
              ? 'Les complications à l’accouchement peuvent être liées à un taux de toxicité élevé.'
              : 'Complications of calving are often linked to elevated levels of toxicity'
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>
    </div>
    <div v-else class="form">
      <!--Thème 1------------------------------------------>
      <h3>{{ themes[0] }}</h3>
      <div class="prop">
        <div class="key">{{ (lang == 'fr' ? 'Sexe' : 'Sex') + ' :' }}</div>
        <div v-if="isCompleted(0, 4)" class="value">
          {{ lang == 'fr' ? 'Mâle' : 'Male' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">{{ (lang == 'fr' ? 'Âge' : 'Age') + ' :' }}</div>
        <div v-if="isCompleted(0, 1)" class="value">
          {{ lang == 'fr' ? '41 ans' : '41' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Longueur' : 'Length') + ' :' }}
        </div>
        <div v-if="isCompleted(0, 3, 2)" class="value">
          {{ lang == 'fr' ? '15,80 m' : '15.80 m' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ lang == 'fr' ? 'note' : 'Note' }} :</div>
        <div v-if="isCompleted(0, 3)" class="value">
          {{
            lang == 'fr'
              ? 'Grandeur normale pour son âge.'
              : 'Normal length for its age'
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Poids' : 'Weight') + ' :' }}
        </div>
        <div v-if="isCompleted(0, 0)" class="value">
          {{ lang == 'fr' ? '28 000 kg' : '28,000 kg' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div v-if="isCompleted(0, 2)" class="value">
          {{
            lang == 'fr'
              ? 'Poids anormal pour son âge.'
              : 'Abnormal weight for its age'
          }}
        </div>
        <div v-else class="empty value"></div>
      </div>

      <!--Thème 2------------------------------------------>
      <h3>{{ themes[1] }}</h3>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Alimentation' : 'Diet') + ' :' }}
        </div>
        <div v-if="isCompleted(1, 0)" class="value">
          {{ lang == 'fr' ? 'Anormale' : 'Abnormal' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div
          v-if="isCompleted(1, 0)"
          class="value"
          v-html="
            lang == 'fr'
              ? 'Du plastique se trouve dans son estomac.<br>Petite quantité, non dangereuse.'
              : 'There is plastic in the whale\'s stomach;<br>small quantity, not hazardous'
          "
        ></div>
        <div v-else class="empty value"></div>
      </div>
      <!--Thème 3------------------------------------------>
      <h3>{{ themes[2] }}</h3>
      <div class="prop">
        <div class="key">
          {{ (lang == 'fr' ? 'Toxines' : 'Toxins') + ' :' }}
        </div>
        <div v-if="isCompleted(2, 0, 2)" class="value">
          {{ lang == 'fr' ? '100 ng/g' : '100 ng/g' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">{{ (lang == 'fr' ? 'note' : 'Note') + ' :' }}</div>
        <div v-if="isCompleted(2, 1)" class="value">
          {{ lang == 'fr' ? 'Quantité normale.' : 'Normal concentration' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">
          {{
            (lang == 'fr'
              ? 'Traces d’impacts avec des navires et engins de pêche'
              : 'Signs of collisions with ships and fishing gear') + ' :'
          }}
        </div>
        <div v-if="isCompleted(2, 1)" class="value">
          {{ lang == 'fr' ? 'Oui' : 'Yes' }}
        </div>
        <div v-else class="empty value"></div>
      </div>
    </div>
    <div v-if="content.hasMessage" class="message">
      <div v-if="lang == 'fr'">
        <b>Bravo !</b> Vous avez complété cette section et vous pouvez
        maintenant accéder à la suivante.
      </div>
      <div v-else>
        <b>Congratulations!</b> You have completed this section. You can now
        move to the next section.
      </div>
    </div>
    <div v-if="content.type == 'rapport'" class="footer center">
      <ContinueButton />
    </div>
    <div v-else class="footer center">
      <ContinueButton
        :skipDefaultClick="true"
        @click="this.$parent.showRapport = false"
      />
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
  props: [
    'content',
    'allContent',
    'status',
    'blurred',
    'showInfo',
    'isLastTheme',
  ],
  computed: {
    themes() {
      let arr = []
      this.allContent.themes.forEach((t) => {
        if (t[this.lang]) arr.push(t[this.lang])
      })
      return arr
    },
  },
  methods: {
    isCompleted(theme, subtheme, step) {
      console.log(this.status)
      if (theme < this.status.theme) {
        return true
      }
      if (this.status.subtheme > subtheme && theme <= this.status.theme) {
        return true
      }
      if (
        this.status.step > step &&
        theme <= this.status.theme &&
        subtheme <= this.status.subtheme
      ) {
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
.rapport img {
  max-height: 180px;
}
/* .rapport .center > * {
  animation: fromTopRight var(--default-tr-speed) ease-out;
}

.form {
  animation: fromTop var(--default-tr-speed) ease-out !important;
} */

h3 {
  background-color: #c9ebf4;
  padding: 5px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 36px;
  padding-left: 10px;
  margin: 35px 0 10px 0;
}
.sous-titre {
  font-size: 50px;
}
.message {
  margin: 40px 0;
  font-size: 40px;
  background-color: #c9ebf4;
  padding: 25px;
  line-height: 1.2;
  border-radius: 5px;
  font-weight: bold;
}
.message b {
  font-weight: 800;
}
.form h3:first-child {
  margin-top: 20px;
}
ul {
  list-style: none;
  padding-left: 0;
}
.prop {
  font-size: 38px;
  margin-top: 15px;
  display: flex;
}
.prop.note {
  color: #003072;
  font-weight: 400;
  font-style: italic;
  margin-top: -2px;
  font-size: 32px;
}
.note .value {
  font-weight: 400;
  font-style: italic;
}
.key {
  /* display: inline-block; */
  /* width: auto; */
  /* padding: 10px; */
  white-space: nowrap;
  margin-right: 20px;
}
.value {
  /* display: inline-block; */
  color: #003072;
  font-weight: 700;
  flex-grow: 1;
}
.value.empty {
  border-bottom: 1px solid black;
  width: 100%;
}
.rapport:has(.message) .button {
  margin-top: 0;
}
.rapport .center,
.rapport .form {
  animation: fadeLeft 400ms ease-out forwards;
}
.rapport .form {
  margin-bottom: 30px;
}
</style>
