<template>
  <div :class="[{ appro: approMode }, 'app-wrapper']">
    <div id="app">
      <Nuxt />
    </div>
    <div class="guide">
      <button class="approMode" @click="approMode = !approMode">
        {{ approMode ? 'Agrandir' : 'Rapetisser' }}
      </button>
      <ul>
        <li>
          <div class="key">Flèche droite :</div>
          <div class="description">Étape suivante</div>
        </li>
        <li>
          <div class="key">Flèche gauche :</div>
          <div class="description">Étape précédente</div>
        </li>
        <li>
          <div class="key">Touche S</div>
          <div class="description">Scanner la bannière</div>
        </li>
        <li>
          <div class="key">Cliquer en bas à droite<br />pendant 3 secondes</div>
          <div class="description">Revenir à la page de configuration</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approMode: true,
    }
  },
}
</script>

<style>
.guide {
  width: calc(100% - var(--app-width));
  margin: 30px;
  color: #ccc;
  font-size: 36px;
  word-wrap: normal;
  overflow-wrap: normal;
}
.guide li {
  margin-bottom: 30px;
}

.guide .key {
  color: white;
  font-weight: bold;
}
body {
  /* color: white; */
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
#app {
  flex-shrink: 0;
  width: var(--app-width);
  height: var(--app-height);
  border: 1px solid black;
  transform: scale(1);
}
#app .main-wrapper {
  width: 1180px;
  /* background-color: white; */
  height: calc(106px + 1704px);
  margin: auto;
  margin-top: 47px;
  /* background-color: #65adad; */
}
.appro {
  transform: scale(0.4);
  transform-origin: 0 0;
}
.app-wrapper {
  display: flex;
  width: 100%;
}
.approMode {
  cursor: pointer;
  display: flex;
  font-weight: bold;
  /* width: 200px; */
  padding: 30px;
  font-size: 36px;
  margin-right: -200px;
  opacity: 0.2;
}
</style>
