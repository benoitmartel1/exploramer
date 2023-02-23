<template>
  <div class="info">
    <div class="info popup" @click="done()">
      <div class="content">
        <div class="close" @click="done()">
          <svg
            id="Fermer"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 70 70"
          >
            <g
              id="Ellipse_1"
              data-name="Ellipse 1"
              fill="none"
              stroke="#707070"
              stroke-width="3"
            >
              <circle cx="35" cy="35" r="35" stroke="none" />
              <circle cx="35" cy="35" r="33.5" fill="none" />
            </g>
            <g
              id="Groupe_5"
              data-name="Groupe 5"
              transform="translate(21.019 21.019)"
            >
              <line
                id="Ligne_10"
                data-name="Ligne 10"
                x2="29.424"
                y2="29.424"
                fill="none"
                stroke="#260801"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
              <line
                id="Ligne_11"
                data-name="Ligne 11"
                x1="29.424"
                y2="29.424"
                fill="none"
                stroke="#260801"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
            </g>
          </svg>
        </div>
        <div class="text" v-html="info[lang]"></div>
        <Icons v-if="info.roles" :roles="info.roles" />
      </div>
      <!-- <div class="blurZone"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$store.state.settings.langue,
    }
  },
  props: ['info'],
  methods: {
    done() {
      this.$parent.showInfo = false
      this.$parent.blurred = false
    },
  },
}
</script>

<style>
.close {
  width: 100%;
  text-align: right;
  padding: 20px 20px 0 0;
  /* background-color: red; */
}
.close svg {
  transform: scale(0.9);
}
.info .text {
  padding: 50px;
  padding-top: 0;
}
.info .icons {
  margin-bottom: 0px;
}
</style>
