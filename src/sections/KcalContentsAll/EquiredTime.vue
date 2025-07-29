<template>
  <section class="EquiredTiem">    
    <button @click="startAllAnimations">계산하기</button>
    <div class="equired-text inner">
      <h2>순 칼로리</h2>
      <p class="minute" :class="netCalorieColorClass">{{animatedFormattedNetCalories}}<span>kcal</span></p>
    </div>

    <div class="equired-bg">
      <div 
      class="red-orange graph"
      :style="{
        background: `conic-gradient(from -90deg at center,#ff7a63 ${currentPercents.red}%, #EBEBEB 0%)`
      }"
      ></div>
      <div 
        class="orange graph"
          :style="{
            background: `conic-gradient(from -90deg at center,#ffb060 ${currentPercents.orange}%, transparent 0%)`
          }"

      ></div>
      <div class="yellow graph"
          :style="{
            background: `conic-gradient(from -90deg at center,#ffec18 ${currentPercents.yellow}%, transparent 0%)`
          }"
      ></div>
      <div class="lighte-orange graph"></div>
      <div class="gary"></div>
    </div>
  </section>
</template>
<script>
export default {
  name:'EquiredTiem',
  data(){
    return{
       // 퍼센트 목표값들
      netCalories:0,
      targetPercents: {
        red: 50,
        orange: 32.5,
        yellow: 16.6,
      },
      currentPercents: {
        red: 0,
        orange: 0,
        yellow: 0
      },
      animationDuration: 1000,
      animatedNetCalories: 0,
    }
  },
  props:{
    caloriesIntake:{
      type:Number,
      required:true
    },
    cyclingMinutes:{
      type:Number,
      required:true
    }
  },
  computed:{
    formattedNetCalories(){
      return Math.max(0, Math.round(this.netCalories));
    },
    animatedFormattedNetCalories() {
      return Math.round(this.animatedNetCalories);
    },
    netCalorieColorClass() {
      return this.animatedNetCalories < 0 ? 'blue-color' : 'orange-color';
    }
  },
  methods:{
    startAllAnimations() {
      this.netCalories=this.calculateNetCalories();
      // 숫자 카운팅 애니메이션 실행
      this.animateNumber(this.netCalories);

      this.animateDonut('red', this.targetPercents.red);
      this.animateDonut('orange', this.targetPercents.orange);
      this.animateDonut('yellow', this.targetPercents.yellow);
    },
    easeInOutCubic(t) {
      return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    animateDonut(name, target) {
      const start = performance.now();
      const duration = this.animationDuration;

      const animate = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = this.easeInOutCubic(t);
        this.currentPercents[name] = +(target * eased).toFixed(1);

        if (t < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    },
    getCaloriesBurned(timeMin){
      const MET = 6.8;
      const weight = 67;
      return MET * weight * (timeMin / 60);
    },
    calculateNetCalories() {
      const burned = this.getCaloriesBurned(this.cyclingMinutes);
      return this.caloriesIntake - burned;
    },
    animateNumber(targetValue) {
      const start = performance.now();
      const duration = 1000;
      const initial = this.animatedNetCalories;

      const animate = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = this.easeInOutCubic(t);
        this.animatedNetCalories = initial + (targetValue - initial) * eased;

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          this.animatedNetCalories = targetValue; // 최종 값 보정
        }
      };
      requestAnimationFrame(animate);
    },
  }
}
</script>
<style lang="scss">
  .EquiredTiem{
  position: relative;
  width: 100%;
  background-image: linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8));
  background-color: $main_color;
  height: calc(100% - (237px + 109px + 169px));
  text-align: center;
  button{
    height: 35px;
    width: 100%;
    border: none;
    background-color: $accent_color_orange;
    font-size: 20px;
    font-weight: bold;
    color: $background_color;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
      background-color:rgba($accent_color_orange, 0.8) ;
    }
  }
  .equired-text{
    position: relative;
    z-index: 10;
    h2{padding-top:44px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
    }
    .minute{
      padding-top: 25px;
      color: $accent_color_orange;
      font-family: $es_fontFamily;
      font-weight: bold;
      font-size: 48px;
      padding-left: 20px;
      text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
      &.orange-color {
        color: $accent_color_orange;
      }
      &.blue-color {
        color: #4A90E2; 
      }
      span{
        font-size: 14px;
        font-family: $ko_fontFamily;
        color: $black_color;
        padding-left: 2px;
      }
    }
  }
  .equired-bg{
    @mixin circle{
      position: absolute;
      box-sizing: border-box;
      margin-top:120px;
      border-radius: 50%;
      width:400px;
      height:400px;
      top: 50%;left: 50%;
      transform: translate(-50%,-50%);
    }
    box-sizing: border-box;
    position: absolute;
    top: 40px;left: 0;
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    & .graph{
      @include circle();
      mask: radial-gradient(circle at center, transparent 0 50%, black 50% 100%);
      -webkit-mask: radial-gradient(circle at center, transparent 0 50%, black 50% 100%);
    }
    .lighte-orange{
      width: 400px;
      border:20px solid #FA0000;
      opacity: 0.2;
    }
    .gary{
      box-shadow: 0 0 0 10px #D9D9D9;
      @include circle();
    }
  }
}
</style>