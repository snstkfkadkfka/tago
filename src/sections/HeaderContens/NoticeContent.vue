<template>
  <div class="slider-container">
    <div class="slider-track" :style="{ transform: `translateY(-${currentIndex * itemHeight}px)`, transition: transitioning ? 'transform 1s ease' : 'none' }">
      <div
        class="text-slide"
        v-for="(text, index) in duplicatedTexts"
        :key="index"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const texts = [
  '타슈 자전거 정보와 운동시간을 한 번에 볼 수 있습니다.',
  '타이머 버튼 안에 칼로리 계산기가 들어가 있습니다.',
  '칼로리 계산기를 이용하면 순 칼로리양을 계산해 보세요.',
  '이 앱은 타슈 정류장을 기준으로 하고 있습니다.',
]
const duplicatedTexts = [...texts, ...texts] // 무한 루프 위해 복제
const currentIndex = ref(0)
const itemHeight = 22 // 한 줄 높이(px)
const transitioning = ref(true)
const startSlider = () => {
  const loop = () => {
    transitioning.value = true
    currentIndex.value++
    setTimeout(() => {
      transitioning.value = false
      // 무한 루프 처리
      if (currentIndex.value >= texts.length) {
        currentIndex.value = 0
      }
      setTimeout(loop, 4000) // 멈추는 시간
    }, 1000) // 슬라이드 이동 시간
  }
  loop()
}
onMounted(() => {
  startSlider()
})
</script>
<style scoped>
.slider-container {
  height:22px;
  overflow: hidden;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 35px;
  margin-top: 12px;
}
.slider-track {
  display: flex;
  flex-direction: column;
}
.text-slide {
  padding-left:15px;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  background: #f8f8f8;
}
</style>
