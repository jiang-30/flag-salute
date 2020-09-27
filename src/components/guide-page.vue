<template>
  <div class="guide-container">
    <img class="guide-image" src="@/assets/guide.jpg" alt="guide">
  </div>
</template>

<script>
export default {
  props: {
    height: Number
  },
}
</script>

<style lang="scss" scoped>
.guide-container {
  position: relative;
  // background-color: #0f0;

  .guide-image {
    width: 100%;
    height: auto;
  }
}
</style>