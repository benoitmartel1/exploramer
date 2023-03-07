<template>
  <div
    :class="[{ outro: type == 'outro' }, { intro: type == 'intro' }, 'back']"
  >
    <svg
      v-if="(type !== 'outro' && type !== 'intro') || isLast"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="1273.001"
      height="1796.999"
      viewBox="0 0 1273.001 1796.999"
    >
      <defs>
        <filter
          id="Soustraction_1"
          x="0"
          y="0"
          width="1273.001"
          height="1796.999"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="6" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="15.5" result="blur" />
          <feFlood flood-opacity="0.424" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="Feuille" transform="translate(46.5 40.5)">
        <g
          transform="matrix(1, 0, 0, 1, -46.5, -40.5)"
          filter="url(#Soustraction_1)"
        >
          <path
            id="Soustraction_1-2"
            data-name="Soustraction 1"
            d="M1107.962,1704H0V0H1180V1607.815L1083.95,1704h24.012Z"
            transform="translate(46.5 40.5)"
            fill="#fff"
          />
        </g>
        <path
          id="Tracé_2"
          data-name="Tracé 2"
          d="M96,96H0L96,0Z"
          transform="translate(1180 1704) rotate(180)"
          fill="#c9c9c9"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['type', 'isLast'],
}
</script>

<style>
.back {
  transform: translate(-1.5px, -2px);
  position: absolute;
  z-index: -1;
  left: 0%;
  top: 0;
  background-color: #65adad;
  width: var(--app-width);
  height: var(--app-height);
}

/* #main:has(.outro) .back,
#main:has(.intro) .back {
  background-color: #005e8f;
} */
.last-theme .back {
  background-color: #005e8f;
}
.back svg {
  position: absolute;
  left: 4px;
  bottom: 9px;
}
</style>
