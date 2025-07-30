<template>
  <section class="AllSearch" :style="{transform:isMoved ? 'translateY(194px)':'translateY(0)'}">
    <div class="handle-bar" @click="handleClick" ></div>
      <SearchRoad   
        :locations="locations"
        @select-id="$emit('select-id', $event)" 
        />
      <CountTimer @show-kcal="$emit('show-kcal')" @recorded="$emit('recorded',$event)"/>
  </section>
</template>
<script>
  import SearchRoad from './SearchRoad.vue';
  import CountTimer from './CountTimer.vue';
  export default {
    name: 'AllSearch',
    data(){
      return{
        isMoved:false
      }
    },
    components: {
      SearchRoad,
      CountTimer
    },
    props: {
      locations: Array
    },
    methods:{
      handleClick(){
        this.isMoved=!this.isMoved
      }
    }
  };
</script>
<style lang="scss">
  .AllSearch {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 210px;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
    padding-top: 12px;
    transition: transform 0.3s ease;
    user-select: none;
    background:$background_color;
    z-index: 999;
    .handle-bar {
      width: 40px;
      height: 6px;
      border-radius: 10px;
      margin: 0 auto 10px;
      background: #d9d9d9;
      cursor:pointer ;
    }
  }
</style>
