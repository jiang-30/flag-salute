<template>
  <div class="raising-container">
    <img class="fill-img" src="@/assets/image/raising.jpg" alt="raising">
    <img class="flag-image" :style="{width: flagWidth + 'px', height: flagHeight + 'px', transform: 'translate(' + transWidth + 'px,-' + transHeight + 'px)'}" src="@/assets/image/flag.png" alt="flag">
    <div class="fixed-btn">
      <van-button class="btn" @click="onClick" type="primary">升旗</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      minHeight: 0,
      maxHeight: 0,
      flagWidth: 150,
      flagHeight: 112,
      flagBottomHeight: 26,
      transHeight: 0,
      transWidth: 0
    }
  },
  inject: ['width', 'height'],
  mounted(){
    let w = this.width
    let h = this.height
    
    let imgW = 1080
    let imgH = 2400
    let tH = 2060
    let bH = 627
    let r
    let sh = 0
    if(w/h <= imgW/imgH){
      r = h/imgH
    } else {
      r = w / imgW
      sh = (imgH * r - h) / 2
    }
    this.flagWidth = 75 // this.flagWidth * r
    this.flagHeight = 56 // this.flagHeight * r
    this.minHeight = bH * r - sh - 13
    this.maxHeight = tH * r - sh - this.flagHeight
    this.transHeight = this.minHeight
    this.transWidth = 26 * r
    console.log(w, h, this.minHeight, this.maxHeight)
  },
  methods: {
    onClick(){
      if(this.transHeight == this.maxHeight) return
      let timer = setInterval(() => {
        this.transHeight += 5;
        if(this.transHeight >= this.maxHeight){
          clearInterval(timer)
          this.transHeight = this.maxHeight
          setTimeout(() => {
            this.$emit('next', 'raising')
          }, 2000);
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
    bottom: 0;
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