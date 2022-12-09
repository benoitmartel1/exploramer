<template>
  <div class="action">
    <Icons v-if="content.roles" :roles="content.roles" />
    <div class="frame">{{ content[lang] }}</div>
    <div class="center">
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
  background-color: #c5ebf3;
  border-radius: 44px;
  width: 100%;
  padding: 30px;
  padding-top: 100px;
  border: 3px #606060 solid;
  margin-bottom: 20px;
}
</style>
