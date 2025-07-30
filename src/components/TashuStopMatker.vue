<template>
  <section class="TashuStopMarker">
    <i class="fa-solid fa-bicycle"></i>
    <span class="id" v-if="stopData">ID:<em>{{ stopData.id }}</em></span>
    <article class="text">
      <h4>{{stopData.name}}</h4>
      <span>자전거 개수 : <em>{{stopData.parking_count}}</em></span>
    </article>
  </section>
</template>
<script>
  export default {
    name:'TashuStopMarker',
    props:{
      stopData:{
        type:Object,
        default:null
      }
    }
  }
</script>
<style lang="scss">
  .TashuStopMarker{
    position: absolute;
    top: -460px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    pointer-events: auto;
    width: 200px;
    border-radius: 10px;
    background-color: $beige_color;
    border: 1px solid $gray_color;
    overflow: hidden;
      i{
        position: absolute;
        font-size: 120px;
        color: $background_color;
        z-index: -1;
        transform: scaleX(-1);
        right: -5px;
      }
      span.id{
        color: $gray_color;
        font-size: 10px;
        padding-left: 9px;
        display: block;
        padding-top: 8px;
      }
      .text{
        padding: 10px 10px 10px;
        h4{
          color: $accent_color_orange;
          font-size: 16px;
          font-weight: 700;
          padding-bottom: 5px;
          word-break: keep-all;
          line-height: 1.2;
        }
        span{
          display: block;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.3;
          em{
            font-size: 15px;font-weight: bold;
          }
        }
      
    }
  }
</style>