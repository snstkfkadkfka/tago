<template>
  <section class="KcalListFood">
    <ul class="selcet-foot">
      <li v-for="(food,index) in foods" :key="index">
        <div class="KcalListFood-text">
          <p>{{ food.foodName }}</p>
          <span>{{food.kcalPerServing ? parseFloat(food.kcalPerServing).toFixed(0) : '0.0'}}<i>kcal</i></span>
        </div>
        <button class="list-delect" @click="$emit('removeFood', food)">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name:'KcalListFood',
  props:{
    foods:{
      type:Array,
      required:true
    }
  }
}
</script>
<style lang="scss">
.KcalListFood{
  padding:0 10px;
  .selcet-foot{
    li{
      display: flex;
      border-bottom: 1px solid rgba($gray_color,0.4) ;
      padding:6px 0;
      .KcalListFood-text{
        width: 92%;
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        align-items: center;
        p{
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &>span{
          padding-right: 10px;
          font-size: 12px;
        }
      }
      .list-delect{
        width:8%;
        height: 20px;
        background-color: transparent;
        border: none;
        padding-left: 6px;
        i{
          font-size: 20px;
          color: $black_color;
        }
      }
    }
  }
}
</style>