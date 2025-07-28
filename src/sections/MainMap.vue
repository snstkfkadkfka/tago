<template>
  <section class="MainMap">
    <div id="map"></div> 
    <TashuApi 
      v-if="mapReady" 
      :map="map" 
      :selectedId="selectedId"
      @send-locations="onReceiveLocations"
    /> 
  </section>
</template>

<script>
import TashuApi from '@/components/TashuApi.vue';

export default {
  name:'MainMap',
  components:{
    TashuApi,
  },
  data(){
    return{
      map:null,
      mapReady : false,
      internalLocations: [],
      currentRoute: null,
      selectedId: null
    }
  },
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    // 네이버 지도 API 로드
    const script = document.createElement("script");
    script.src =
    `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.VUE_APP_NAVER_MAP_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      // 위치 정보 요청
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userLocation = new window.naver.maps.LatLng(lat, lng);
          // 지도 생성
          this.map = new window.naver.maps.Map("map", {
            center: userLocation,
            zoom: 16,
            minZoom:15,
            maxZoom:17
          });
          // 자전거 레이어 추가
          const bikeLayer = new window.naver.maps.BicycleLayer();
          bikeLayer.setMap(this.map);
          this.mapReady = true;

          window.naver.maps.Event.addListener(this.map, 'idle', () => {
            if (this.selectedStop) {
              this.updateMarkerPosition();
            }
          });

        },
        error => {
          // 위치 정보 가져오기 실패 시
          const fallbackLocation = new window.naver.maps.LatLng( 36.328600441526184, 127.4258233590836);
          this.map = new window.naver.maps.Map("map", {
            center: fallbackLocation,
            zoom: 16,
            minZoom: 15,
            maxZoom: 17
          });
          const bikeLayer = new window.naver.maps.BicycleLayer();
          bikeLayer.setMap(this.map);
          this.mapReady = true;
          console.error("GPS 위치 에러:", error);
        },
        {
          enableHighAccuracy: true,  // 위치 정확도 향상
          timeout: 10000,
          maximumAge: 0
        }
        
      );
    }
  },
  methods: {
  onReceiveLocations({ fullData }) {
    this.internalLocations = fullData;
    this.$emit('update:locations', fullData);
  },

  handleSearchId(id) {
    this.selectedId = id; // ⬅️ 전달할 ID 저장
  const loc = this.internalLocations.find(l => l.id === id);
  if (!loc) return;

  const ll = new naver.maps.LatLng(loc.x_pos, loc.y_pos);
  const marker = new naver.maps.Marker({
    position: ll,     // loc로 바꿔줌
    map: this.map,
    title: loc.name
  });

  naver.maps.Event.addListener(marker, 'click', () => {
    this.map.panTo(marker.getPosition());
  });

  this.map.panTo(ll);  // 부드럽게 이동
  this.map.setZoom(17); // 줌 설정
},
  }
};

</script>
<style lang="scss"  >
  .MainMap{
    position: relative;
    width: 100%;
    height: 740px;
    #map{
      width: 100%;height: 740px;
    }
  }
  .naver-map .map-control.logo-control {
    display: none !important;
}

</style>