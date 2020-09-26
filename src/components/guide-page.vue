<template>
  <div class="guide-container" :style="{height: height + 'px'}">
    <div class="animate__animated animate__bounce">guide</div>
    <van-button @click="onClick">进入升旗仪式</van-button>
  </div>
</template>

<script>
export default {
  props: {
    height: Number
  },
  methods: {
    onClick(){
      this.$emit('next')
    }
  }
}
</script>

<style lang="scss">
.guide-container {
  background-color: #0f0;
}
</style>