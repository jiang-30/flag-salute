<template>
  <div class="raising-container">
    <img class="raising-image" src="@/assets/raising.jpg" alt="raising">
    <div class="fixed-btn">
      <van-button class="btn" @click="onClick" type="primary">升旗</van-button>
    </div>
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
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped> 
.raising-container {
  position: relative;
  height: 100%;
  // background: #f00;

  .raising-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fixed-btn {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    .btn {
      width: 120px;
    }
  }
}
</style>