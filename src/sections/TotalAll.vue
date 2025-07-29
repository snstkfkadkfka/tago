<template> 
  <section class="TotalAll">
    <MainMap  
    ref="mainMap" 
    @update:locations="locations = $event" 
    />
    <SearchTimer 
      class="AllSearch-Swiper"
      :locations="locations"
      @select-id="handleLocationSelect"
    />
    <HeaderContens />
  </section>
</template>
<script>
import MainMap from './MainMap.vue';
import HeaderContens from './HeaderContens/HeaderContens.vue';
import SearchTimer from './SearchTimer/SearchTimer.vue';

export default {
  name:'TotalAll',
  components:{
    MainMap,
    HeaderContens,
    SearchTimer
  },
    data() {
    return {
      locations: [] // 전체 주소 데이터
    };
  },
  methods: {
    handleLocationSelect(id) {
    this.$refs.mainMap?.handleSearchId(id);
    }
  },
  watch: {
  locations(val) {
    console.log('📦 TotalAll.vue에 전달된 타슈 데이터:', val);
  }
},
mounted() {
  console.log('📦 초기 타슈 데이터 상태:', this.locations);
}



};
</script>
<style lang="scss">
  .TotalAll{
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    top: 0;bottom: 0;left: 0;right: 0;
    margin: auto;
    max-width: 360px;
    height: 740px;
    border-radius:10px ;
    border:2px solid gray ;
    box-shadow: 0px 0px 0px 17px #1f1f1f;
    
  }
</style>