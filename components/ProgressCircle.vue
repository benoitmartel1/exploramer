<template>
  <div class="progressCircle">
    <div class="circle-wrap">
      <div class="circle">
        <div class="mask full">
          <div class="fill"></div>
        </div>
        <div class="mask half">
          <div class="fill"></div>
        </div>
        <!-- <div class="inside-circle"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.progressCircle {
  /* background-color: blue; */
  position: absolute;
  z-index: 700;
  display: flex;

  width: 100%;
  height: 100%;

  animation: zoomOut 300ms ease-out;
  align-items: center;
  justify-content: center;
}

.circle-wrap {
  width: 150px;
  height: 150px;
  background: #333;
  border-radius: 50%;
  /* border: 1px solid #cdcbd0; */
  mask-image: radial-gradient(
    circle farthest-side at center,
    transparent 69%,
    white 70%
  );
  /* box-shadow: 10px 10px 0 0 black;s */
}

.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
}

.circle-wrap .circle .mask {
  clip: rect(0px, 150px, 150px, 75px);
}

/* .circle-wrap .inside-circle {
  width: 122px;
  height: 122px;
  border-radius: 50%;
  background: #1e51dc;
  line-height: 120px;
  text-align: center;
  margin-top: 14px;
  margin-left: 14px;
  color: #1e51dc;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 14em;
} */

/* color animation */

/* 3rd progress bar */
.mask .fill {
  clip: rect(0px, 76px, 150px, 0px);
  background-color: white;
}

.mask.full,
.circle .fill {
  animation: fill 2s linear;
  transform: rotate(180deg);
}

@keyframes fill {
  0% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>
