<template>
  <div :class="[{ blurred: showInfo }, 'action']">
    <Header class="content" />
    <div
      class="frame-wrapper"
      v-for="(a, index) in content.actions"
      :key="a + index"
    >
      <Icons v-if="a.roles" :roles="a.roles" />
      <div class="frame">
        <div v-html="a[lang]"></div>
        <div class="center">
          <div v-if="a.image" class="image-wrapper">
            <img
              :class="{ show: imageLoaded }"
              :src="require('@/assets/images/' + getImageName(a.image))"
              :style="styleImage(a.image)"
              alt=""
              @load="onImageLoad"
            />
          </div>
          <div v-else class="spacer"></div>
        </div>
      </div>
    </div>
    <div class="center footer">
      <ContinueButton />
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
  props: ['content', 'showInfo', 'status', 'preStatus'], //The status prop is for tiles only, can be deleted for production
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
    getImageName(image) {
      if (image.hasEnVersion) {
        return image.name.split('.')[0] + '_' + this.lang + '.png'
      } else {
        return image.name
      }
    },
  },
}
</script>

<style>
.frame {
  margin-top: 50px;
  position: relative;
  /* z-index: -1; */
  /* transform: scaleY(0); */
  /* transform-origin: 50% 0; */
  /* animation: openDown 400ms cubic-bezier(0.05, 0.67, 0.22, 0.98) forwards; */
  animation: fromTopLeft var(--default-tr-speed) ease-out both;
}
.frame-wrapper .icons {
  position: absolute;
  z-index: 5;
}
.frame-wrapper:nth-of-type(odd) .frame {
  animation-name: fromBottomRight;
}
.frame-wrapper:nth-of-type(3) .frame {
  /* animation-delay: 300ms; */
}
.image-wrapper {
  width: 100%;
  margin-top: 30px;
}
.frame img {
  width: 100%;
  opacity: 0;
}

.action .experience img {
  opacity: 1;
}
.action:not(.scan) .frame img {
  transition: all 500ms ease-out;
  transition-delay: 500ms;
  /* transform: scale(1.1); */
}

.frame img.show {
  transform: scale(1);
  opacity: 1;
}
</style>
