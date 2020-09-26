<template>
  <div class="raising-container" :style="{height: height + 'px'}">
    raising
    <van-button @click="onClick">升旗</van-button>
  </div>
</template>

<script>
export default {
  props: {
    height: Number
  },
  methods: {
    onClick(){
      setTimeout(() => {
        this.$emit('next')
      }, 2000)
    }
  }
}
</script>

<style lang="scss"> 
.raising-container {
  background: #f00;
}
</style>