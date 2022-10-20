<template>
  <div class="icons">
    <div class="icon" v-for="(r, index) in roles" :key="r + index">{{ r }}</div>
  </div>
</template>

<script>
export default {
  props: ['roles'],
}
</script>

<style>
.icons {
  display: flex;
}
.icons .icon {
  margin-right: 20px;
  width: 100px;
  height: 100px;
  background-color: darkgoldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
