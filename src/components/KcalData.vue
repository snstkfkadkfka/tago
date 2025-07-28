<template>
  <section class="KcalData" >
    </section>

</template>
<script setup>
import { ref, watchEffect, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  keyword : String
})

const emit = defineEmits(['sendFoodData']);

const loading = ref(false);
const error = ref('')
const foodResults = ref({});

watchEffect(async () => {

  
  if (!props.keyword) return;
  
  loading.value = true;
  error.value = '';
  foodResults.value = [];
  
  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02',
      {
        params: {
          serviceKey: process.env.VUE_APP_FOOD_KEY,
          FOOD_NM_KR: props.keyword,
          pageNo: 1,
          numOfRows: 20,
          type: 'json',
        },
      }
    );
    
    const items = response.data?.body?.items || [];

    const simplifiedItems = items.map(item => {
      const kcalPer100g = parseFloat(item.AMT_NUM1);
      const servingSizeStr = item.Z10500?.replace('g', '').trim();
      const servingSize = parseFloat(servingSizeStr);

      const oneServingKcal = (!isNaN(kcalPer100g) && !isNaN(servingSize))
        ? (kcalPer100g * servingSize) / 100
        : null;

      return {
        foodName: item.FOOD_NM_KR,
        kcalPerServing: oneServingKcal,
        rawKcalPer100g: kcalPer100g,
        servingSize
      };
    });



    foodResults.value = simplifiedItems;

    emit('sendFoodData', simplifiedItems);
    
  } catch (err) {
    console.error('API 오류:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss">
  .KcalData{
    position: absolute;
    width: 100%;
    }
</style>

