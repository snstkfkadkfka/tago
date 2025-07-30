<template>
  <section class="KcalListSelect">
    <ul class="selcet-foot">
      <li  v-for="(food, index) in foods" :key="index" @click="selectFood(food)">
        <div class="KcalListFood-text">
          <p><span>{{ keyword }}</span>{{ getRemainingText(food.foodName) }}</p>
          <span>{{food.kcalPerServing ? parseFloat(food.kcalPerServing).toFixed(0) : '0.0'}}<i>kcal</i></span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    name:'KcalListSelect',
    props:{
      foods:{
        type:Array,
        required:true
      },
      keyword:{
        type:String,
        required: false,
      }
    },
    methods:{
      selectFood(food){
        this.$emit('select',food);
      },
      getRemainingText(fullName){
        if(this.keyword && fullName.startsWith(this.keyword)){
          return fullName.slice(this.keyword.length);
        }
        return fullName;
      }
    }
  }
</script>
<style lang="scss">
  .KcalListSelect{
    position: relative;
    left: 0;
    padding: 0 10px;
    background:$background_color;
    .selcet-foot{
      width: 100%;
      li{
        display: flex;
        border-bottom: 1px solid rgba($gray_color,0.4) ;
        padding:6px 0;
        cursor: pointer;
        &:hover{
          background:rgba($main_color,0.5);
        }
        .KcalListFood-text{
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          align-items: center;
          p{
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span{
              padding-left: 10px;
              color:$accent_color_orange ;
            }
          }
          &>span{
            font-size: 12px;
          }
        }
      }
    }
  }
</style>