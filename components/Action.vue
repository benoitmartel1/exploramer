<template>
  <div class="action">
    <Header />
    <div
      class="frame-wrapper"
      v-for="(a, index) in content.actions"
      :key="a + index"
    >
      <Icons v-if="a.roles" :roles="a.roles" />
      <div class="frame">
        <div>{{ a[lang] }}</div>
        <div class="center">
          <img
            v-if="a.image"
            :src="require('@/assets/images/elements/' + a.image.name)"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="center footer">
      <div class="button" @click="done()">Continuer</div>
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
  props: ['content'],
  methods: {
    done() {
      this.$parent.increment()
    },
  },
}
</script>

<style>
.frame {
  position: relative;
  z-index: -1;
  transform: scaleY(0);
  transform-origin: 50% 0;
  animation: openDown 400ms cubic-bezier(0.05, 0.67, 0.22, 0.98) forwards;
}

.frame-wrapper:nth-of-type(3) .frame {
  animation-delay: 300ms;
}
.frame img {
  max-height: 250px;
}
</style>
