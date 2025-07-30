<template>
  <section class="KcalContentsAll">
    <button  @click="handleClose"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    <KcalContent @update-total-kcal="caloriesIntake=$event"/>
    <CaloriesBurned :lastRecord="lastRecord" @update-time="cyclingMinutes = $event"  />
    <EquiredTime :caloriesIntake="caloriesIntake" :cyclingMinutes="cyclingMinutes"/>
  </section>
</template>
<script>
import KcalContent from './KcalContent.vue';
import CaloriesBurned from './CaloriesBurned.vue';
import EquiredTime from './EquiredTime.vue';
export default {
  name:'KcalContentsAll',
  components:{
    KcalContent,
    CaloriesBurned,
    EquiredTime
  },
  props:{
    lastRecord:Number
  },
  data(){
    return{
      caloriesIntake:0,
      cyclingMinutes:this.lastRecord / 60
    }
  },
  watch:{
    lastRecord(newVal){
      this.cyclingMinutes = newVal / 60;
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')     
      this.$emit('close-kcal')  
    }
  }
}
</script>
<style lang="scss">
  .KcalContentsAll{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:740px;
    z-index: 9999;
    &>button{
      background-color: transparent;
      border: none;
      outline: none;
      position: absolute;
      top: 16px;right:16px;
      z-index: 10;
      &>i{
        font-size: 20px;
        cursor: pointer;
        color: $black_color;
      }

    }
  }
</style>