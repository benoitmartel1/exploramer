<template>
  <div class="rapport">
    <div class="center">
      <h1>Résumé de l’enquête</h1>
      <div v-if="settings.experience == 0">Le béluga</div>
      <div v-else>Le rorqual</div>
    </div>
    <div>
      <h3>MORPHOLOGIE ET REPRODUCTION</h3>
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
      <h3>MORPHOLOGIE ET REPRODUCTION</h3>
      <div class="prop">
        <div class="key">Sexe :</div>
        <div v-if="isCompleted(1, 0)" class="value">Femelle</div>
        <div v-else class="empty value"></div>
      </div>
    </div>
    <div class="center">
      <div class="button" @click="done()">Continuer</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: this.$store.state.settings,
      status: this.$store.state.status,
      content: this.$store.state.content,
      lang: this.$store.state.settings.langue,
    }
  },
  methods: {
    isCompleted(theme, subtheme) {
      if (theme < this.status.theme) {
        return true
      }
      if (this.status.subtheme > subtheme) {
        return true
      }
      return false
    },
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style>
h3 {
  background-color: #c9ebf4;
  padding: 5px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 45px;
  padding-left: 10px;
  margin: 60px 0 10px 0;
}
ul {
  list-style: none;
  padding-left: 0;
}
.prop {
  font-size: 38px;
  margin: 20px 0;
  display: flex;
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
</style>
