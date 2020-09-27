<template>
  <div class="raising-container">
    <img class="raising-image" src="@/assets/raising.jpg" alt="raising">
    <img class="flag-image" :style="{transform: 'translateY(-' + flagHeight + 'px)'}" src="@/assets/flag.png" alt="flag">
    <div class="fixed-btn">
      <van-button class="btn" @click="onClick" type="primary">升旗</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      flagHeight: 0,
    }
  },
  inject: ['width', 'height'],
  methods: {
    onClick(){
      setTimeout(() => {
        this.$emit('next')
      }, 500)
      let timer = setInterval(() => {
        this.flagHeight += 0.5;
        if(this.flagHeight > 500){
          clearInterval(timer)
          this.flagHeight = 500
        }
      }, 20)
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
  .flag-image {
    position: absolute;
    left: 50%;
    bottom: 200px;
    width: 100px;
    height: auto;
    z-index: 9;
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