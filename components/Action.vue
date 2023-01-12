<template>
  <div :class="[{ blurred: $parent.showInfo }, 'action']">
    <Header class="content" />
    <div
      class="frame-wrapper"
      v-for="(a, index) in content.actions"
      :key="a + index"
    >
      <Icons v-if="a.roles" :roles="a.roles" />
      <div class="frame">
        <div>{{ a[lang] }}</div>
        <div class="center">
          <div
            v-if="a.image"
            class="image-wrapper"
            :style="styleImage(a.image)"
          >
            <img
              :class="{ show: imageLoaded }"
              :src="require('@/assets/images/' + a.image.name)"
              alt=""
              @load="onImageLoad"
            />
          </div>
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
      imageLoaded: false,
    }
  },
  props: ['content'],
  methods: {
    onImageLoad() {
      this.imageLoaded = true
    },
    done() {
      this.$parent.increment()
    },
    styleImage(i) {
      let str = 'width: '
      str += i.width !== undefined ? i.width + '%;' : '100%;'
      return str
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
.image-wrapper {
  display: inline-block;
}
.frame img {
  width: 100%;
  opacity: 0;
  transition: opacity 200ms ease-out;
  /* margin: auto; */
  /* max-height: 250px; */
}
.frame img.show {
  opacity: 1;
}
</style>
