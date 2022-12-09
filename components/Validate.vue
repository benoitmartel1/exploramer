<template>
  <div class="popup" @click="done()">
    <div>
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
      <div class="content">
        {{ info[lang] }}
      </div>
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
    },
  },
}
</script>

<style>
.close {
  width: 100%;

  text-align: right;
  /* background-color: red; */
}
.close svg {
  transform: scale(0.8);
}
.content {
  padding: 50px;
}
.popup > div {
  width: 1124px;
  min-height: 40%;
  background-color: white;
  border-radius: 44px;
  color: black;
  padding: 10px;
}
</style>
