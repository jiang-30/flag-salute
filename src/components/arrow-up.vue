<template>
  <div class="arrow-up">
    <img class="fill-img animate__animated animate__bounce animate__infinite" src="@/assets/image/icon_down.png" alt="down">
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.arrow-up {
  position: absolute;
  top: 20px;
  left: 50%;
  z-index: 99;
  width: 40px;
  height: 40px;
  transform: translateX(-50%) rotate(180deg);
}
</style>