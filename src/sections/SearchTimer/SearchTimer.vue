<template >
  <section class="SearchTimer">
    <AllSearch 
      :locations="locations"
      @show-kcal="showKcalContent"  
      @recorded="saveElapsedTime"
      @select-id="$emit('select-id', $event)" 
    />
    <KcalContentsAll 
      class="kcalAii"  
      :class="{show:isKcalVisible}"
      :lastRecord="lastRecord"
      @close-kcal="hideKcalContent"
    />
  </section>
</template>
<script>
  import AllSearch from './AllSearch.vue';
  import KcalContentsAll from '../KcalContentsAll/KcalContentsAll.vue';
  export default {
    name:'SearchTimer',
    components:{
      AllSearch,
      KcalContentsAll
    },
    data(){
      return{
        isKcalVisible:false,
        lastRecord:0
      }
    },
    props: {
      locations: {
        type: Array,
        default: () => []
      }
    },
    methods:{
      showKcalContent(){
        this.isKcalVisible=true
      },
      hideKcalContent(){
        this.isKcalVisible=false;
      },
      saveElapsedTime(time){
        this.lastRecord = time
      }
    }
  }
</script>
<style lang="scss">
  .kcalAii{
    position: absolute;
    top: 0;
    width: 100%;
    transform: translateX(100%);
    transition: transform 0.5s ease;
    &.show{
      transform: translateX(0);
    }
  }
</style>