<template>
  <div class="rapport">
    <div class="center">
      <div class="experience">
        <img
          v-if="settings.experience == 0"
          src="@/assets/images/elements/beluga.png"
          alt=""
        />
        <img v-else src="@/assets/images/elements/rorqual.png" alt="" />
      </div>
      <h1>Résumé de l’enquête</h1>
      <div class="sous-titre">
        <div v-if="settings.experience == 0">Le béluga</div>
        <div v-else>Le rorqual</div>
      </div>
    </div>
    <div class="form">
      <!--Thème 1------------------------------------------>
      <h3>Morphologie et reproduction</h3>
      <div class="prop">
        <div class="key">Sexe :</div>
        <div v-if="isCompleted(0, 6)" class="value">Femelle</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">Âge :</div>
        <div v-if="isCompleted(0, 1)" class="value">27 ans</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">Longueur :</div>
        <div v-if="isCompleted(0, 4)" class="value">3,5 m</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">note :</div>
        <div v-if="isCompleted(0, 3)" class="value">
          Grandeur normale pour son âge.
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">Poids :</div>
        <div v-if="isCompleted(0, 0)" class="value">1 400 kg</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">note :</div>
        <div v-if="isCompleted(0, 2)" class="value">
          Poids normal pour son âge.
        </div>
        <div v-else class="empty value"></div>
      </div>

      <!--Thème 2------------------------------------------>
      <h3>Alimentation</h3>
      <div class="prop">
        <div class="key">Alimentation normale :</div>
        <div v-if="isCompleted(1, 0)" class="value">Oui</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">note :</div>
        <div v-if="isCompleted(1, 0)" class="value">
          L’alimentation est contaminée par les polluants toxiques.
        </div>
        <div v-else class="empty value"></div>
      </div>
      <!--Thème 3------------------------------------------>
      <h3>Menaces</h3>
      <div class="prop">
        <div class="key">Toxines :</div>
        <div v-if="isCompleted(2, 0)" class="value">10 ng/g</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">note :</div>
        <div v-if="isCompleted(2, 0)" class="value">
          Quantité trop élevée de toxines.
        </div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop">
        <div class="key">Signes d’accouchement récent :</div>
        <div v-if="isCompleted(2, 1)" class="value">Oui</div>
        <div v-else class="empty value"></div>
      </div>
      <div class="prop note">
        <div class="key">note :</div>
        <div v-if="isCompleted(2, 1)" class="value">
          Les complications à l’accouchement peuvent être liées à un taux de
          toxicité élevé.
        </div>
        <div v-else class="empty value"></div>
      </div>
    </div>
    <div v-if="content.hasMessage" class="message">
      <b>Bravo !</b> Vous avez complété cette section et vous pouvez maintenant
      accéder à la suivante.
    </div>
    <div v-if="this.content.type == 'rapport'" class="footer center">
      <div class="button" @click="done()">Continuer</div>
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
  props: ['content'],
  computed: {
    status() {
      return this.$store.getters.getStatus
    },
  },
  methods: {
    isCompleted(theme, subtheme) {
      if (theme < this.status.theme) {
        return true
      }
      if (this.status.subtheme > subtheme && theme <= this.status.theme) {
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
      this.$parent.showInfo = true
    }
    if (this.content.hasMessage) {
      this.$parent.showMessage = true
    }
  },
}
</script>

<style>
.experience img {
  max-height: 180px;
}
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
</style>
