<template>
  <section class="TashuApi">
    <TashuStopMarker
      v-if="selectedStop && showMarkerInfo"
        :stopData="selectedStop"
      />
  </section>
</template>
<script>
import TashuStopMarker from './TashuStopMatker.vue';

export default {
  name:'TashuApi',
  components:{
    TashuStopMarker
  },
  emits:[ 'send-locations','marker_click'],
  props:{
    map: { type: Object, required: true },
    selectedId: { type: [String, Number], default: null } // <- 추가
  },
  data() {
    return {
      apiData: [],
      error: null,
      markers: [],            // 마커들 관리용
      selectedStop: null,     // 선택된 마커 정보
      selectedMarker: null,
      showMarkerInfo: false 
    }
  },
async mounted() {
  try {
    // API 호출 대신 정적 JSON 파일 경로로 fetch
    const res = await fetch('/data/tashu.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

      console.log('Fetched JSON data:', json);  // 여기서 데이터 구조 확인
    // 예를 들어 json.results 또는 json.DATA 배열이면 그걸 사용
    this.apiData = json.results ? json.results.map(item => ({
      id: item.id,
      name: item.name,
      x_pos: item.x_pos,
      y_pos: item.y_pos,
      parking_count: item.parking_count
    })) : json.map(item => ({
      id: item.id,
      name: item.name,
      x_pos: item.x_pos,
      y_pos: item.y_pos,
      parking_count: item.parking_count
    }));
    
    this.$emit('send-locations', {
      names: this.apiData.map(item => item.name),
      fullData: this.apiData
    });

    this.apiData.forEach(item => {
      const position = new window.naver.maps.LatLng(item.x_pos, item.y_pos);
      const marker = new window.naver.maps.Marker({
        map: this.map,
        position: position,
        icon: {
          content: `
            <div class="markr" data-id=${item.id}>
              ${item.parking_count}
            </div>
          `
        }
      });
      marker.itemId = item.id;
      this.markers.push(marker);

      window.naver.maps.Event.addListener(marker, 'click', () => {
        this.selectMarker(item, marker);
        this.map.panTo(position);
        this.$emit('marker_click', item);

        const el = document.querySelector(`.markr[data-id="${item.id}"]`);
        if (el) {
          document.querySelectorAll('.markr.active').forEach(e => e.classList.remove('active'));
          el.classList.add('active');
        }
      });
    });
  } catch (e) {
    this.error = e.message;
  }

  window.naver.maps.Event.addListener(this.map, 'dragstart', () => {
    this.showMarkerInfo = false;
  });
},

  methods: {
    selectMarker(item, marker) {
      // 이전에 선택된 마커 복원
      if (this.selectedMarker && this.selectedMarker !== marker) {
        this.selectedMarker.setMap(this.map); // 다시 보여주기
      }
      this.selectedStop = item;
      this.selectedMarker = marker;

      this.showMarkerInfo = false; // ← 다시 트리거 주기 위해 잠깐 false
      this.$nextTick(() => {
        this.showMarkerInfo = true;
      });
    }
  },
  watch: {
  selectedId(newId) {
    const matched = this.apiData.find(i => i.id === newId);
    const matchedMarker = this.markers.find(m => m.itemId === newId);
    if (matched && matchedMarker) {
      this.selectMarker(matched, matchedMarker);
      this.map.panTo(new window.naver.maps.LatLng(matched.x_pos, matched.y_pos));

      //active 스타일 클래스 조작
      const el = document.querySelector(`.markr[data-id="${newId}"]`);
      if (el) {
        document.querySelectorAll('.markr.active').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
      }
    }
  }
}

};
</script>
<style lang="scss">
.TashuApi{
  font-family: $es_fontFamily;
  position: relative;
  width: 100%;
  
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.markr{
  background:$accent_color_orange; 
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  text-align: center;
  color:#fff;
  line-height: 30px;
  font-family: $es_fontFamily;
  font-weight: 600;
  border:2px solid $background_color ;
  box-shadow: 0 0 0 2px $accent_color_orange;
  transition: transform 0.5s ease;
  &.active {
    background-image:linear-gradient(rgba( $main_color,0.9),rgba( $main_color,0.9)); 
    box-shadow: 0 0 0 2px $main_color;
    transform: scale(1.2);
  }
}
</style>
<!-- app.vue , .eslintrs.js, hsconfig.json, eslintrd.json,.env 사용 -->
