<template>
  <section class="CountTimer">
    <button 
      class="count" 
      :class="{on:isRunning, holding:isHolding}"
      @click="toggleTimer"
      @mousedown="startHold"
      @mouseup="cancelHold"
      @mouseleave="cancelHold"
      >
      <!-- <p>타이머</p> -->
      <p>{{formattedTime}}</p>
    </button>
    <p class="kcalBnt" @click="$emit('show-kcal')">
      <i class="fa-solid fa-weight-scale"></i>
      칼로리 계산기
    </p>
  </section>
</template>
<script>
export default {
  name:"CountTimer",
  data(){
    return{
      elapsed:0,
      timer:null,
      isRunning:false,
      isHolding: false,
      holdTimer:null,
      records:[],
      isPressed: false, // 마우스 눌림 상태
    }
  },
  computed:{
    formattedTime(){
      const hours = String(Math.floor(this.elapsed / 3600)).padStart(2,'0');
      const min = String(Math.floor(this.elapsed / 60)).padStart(2,'0');
      const sec = String(this.elapsed % 60).padStart(2, '0');
      return `${hours}:${min}:${sec}`
    }
  },

  methods:{
    toggleTimer(){
      if(this.isRunning){
        clearInterval(this.timer);
        this.timer = null;
        this.isRunning=false;
        this.records = [this.elapsed]; // 최신 값 1개만 저장
        this.$emit('recorded', this.records[0]); // ✅ 부모로 전달
      }else{
        this.isRunning=true;
        this.timer=setInterval(()=>{
          this.elapsed++;
        },1000);
      }
    },
    resetTimer(){
      clearInterval(this.timer);
      this.timer = null;
      this.elapsed=0;
      this.isRunning=false;
      console.log("리셋")
    },
    startHold(){
      this.isHolding = true;
      this.holdTimer=setTimeout(()=>{
        this.resetTimer();
        this.isHolding = false;
      },2000)
    },
    cancelHold(){
      if(this.holdTimer){
        clearTimeout(this.holdTimer);
        this.holdTimer=null;
      }
      this.isHolding = false;
    }
  },
  beforeUnmount() {
    if(this.timer) clearInterval(this.timer);
  },
}
</script>
<style lang="scss">
  .CountTimer{
    display: flex;
    justify-content: center;
    .count{
      position: relative;
      text-align: center;
      margin-top:25px;
      border: 9px solid rgb(255, 255, 255);
      box-shadow: 0 0 0 10px $main_color;
      width: 200px;height: 200px;
      border-radius: 50%;
      background-color:  $main_color;
      transition: 0.1s;
      
      cursor: pointer;
      &.on{
        transform: scale(1.05);
        box-shadow: 0 0 0 10px $accent_color_orange;
        background-color:  $accent_color_orange;
      }
      &.holding{
        animation: holdPulse 2s linear forwards;
      }
      @keyframes holdPulse {
      0% { 
        background-color:$accent_color_orange; 
        box-shadow: 0 0 0 10px $accent_color_orange;
      }
      100% { 
        background-color:$main_color; 
        box-shadow: 0 0 0 10px $main_color;
      }
      }
      p{
        color: #fff;
        margin-top: -40px;
        font-size: 36px;
        font-weight: bold;
      }
    }
    p.kcalBnt{
      cursor: pointer;
      border-bottom: 2px solid $background_color;
      color: $background_color;
      font-size: 12px;
      position: absolute;
      font-weight:500;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      transition: opacity  0.1s;
      padding-bottom: 2px;
      i{
        padding-right: 2px;
      }
      &:hover{
        opacity: 0.7;
      }
    }
  }
</style>