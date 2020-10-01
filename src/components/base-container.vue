<template>
  <div class="guide-container">
    <div class="bg">
      <slot></slot>
    </div>
    <div class="item" v-show="active">
      <slot name="item"></slot>
    </div>
    <arrow-down v-if="index != 6" />
  </div>
</template>

<script>
import ArrowDown from './arrow'
export default {
  props: {
    active: Boolean,
    index: Number,
  },
  components: {
    ArrowDown,
  },

}
</script>

<style lang="scss">
.guide-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
  }
  .bg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .item img {
    position: absolute;
  }
}
</style>