<template>
  <section class="KcalContent">
    <article class="foodkcal">
      <div class="foodInfut inner">
        <h2>음식 칼로리</h2>      
        <div class="food-inner">
          <input 
            type="text" 
            :value="searchkeyword"
            placeholder=" 하나씩 입력해 주세요."
            @compositionstart="isComposing = true"
            @compositionend="onCompositionEnd"
            @input="onInput"
            @focus="showDropdown = true"
            @blur="hideDropdown"
          />
          <KcalData :keyword="searchkeyword" @sendFoodData="handleFoodData" />
          <button @click="addSelectedFood">추가하기</button>
        </div>

        <div class="food-selects" v-if="showDropdown && searchkeyword">
          <KcalListSelect 
          :foods="foodList"
          :keyword="searchkeyword"
          @select="selectFood"
          />

        </div>
        
        <div class="listFoods">
          <KcalListFood :foods="selectedFoods" @removeFood="removeFood" />

        </div>

        
        <span>1인분 기준</span>
      </div>

      <div class="all-kcal">
        <h2>섭취 칼로리</h2>
        <p>{{ totalKcal }}<span>kcal</span></p>
      </div>

    </article>


  </section>
</template>
<script scoped>
  import KcalData from '@/components/KcalData.vue';
  import KcalListFood from './KcalListFood.vue';
  import KcalListSelect from './KcalListSelect.vue';

  export default {
  name:'KcalContent',
  components:{
    KcalData,
    KcalListFood,
    KcalListSelect
  },
  data() {
    return {
      searchkeyword: '',
      isComposing: false,
      foodList: [],       
      selectedFood: null,
      selectedFoods: [],
      showDropdown: false,
      
     
    };
  },
  methods: {
    handleFoodData (data) {
      this.foodList = data;
    },
    hideDropdown() {// 혹은 제거
      setTimeout(() => {
        this.showDropdown = false;
      }, 300);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.searchkeyword = food.foodName;  
      this.showDropdown = false; 
    },
    addSelectedFood() {
      if (this.selectedFood) {
        console.log('추가됨, 자동완성 숨김 처리');
        this.selectedFoods.push({ ...this.selectedFood });
        this.selectedFood = null;
        this.searchkeyword = '';
        this.showDropdown = false; // ✅ 자동완성 숨기기

        this.$emit('update-total-kcal',this.totalKcal)

        this.$nextTick(() => {
          const list = this.$el.querySelector('.listFoods');
          if (list) list.scrollTop = list.scrollHeight;
        });
      }
    },
  
    removeFood(foodToRemove) {
      console.log('삭제 요청된 음식:', foodToRemove);
      console.log('삭제 전 목록:', this.selectedFoods);
      this.selectedFoods = this.selectedFoods.filter(food => food !== foodToRemove);
      console.log('삭제 후 목록:', this.selectedFoods);
    },
    onInput(event) {
      if (!this.isComposing) {
        this.searchkeyword = event.target.value;
        this.showDropdown = !!event.target.value;
      }
    },

    onCompositionEnd(event) {
      this.isComposing = false;
      this.searchkeyword = event.target.value;
    },

  },
  computed: {
  totalKcal() {
    return this.selectedFoods.reduce((sum, food) => {
      return sum + (parseFloat(food.kcalPerServing) || 0);
    }, 0).toFixed(0);
  }
}
}
</script>
<style lang="scss">
  .KcalContent{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $background_color;
    h2{
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      padding-top: 20px;
    }
    .foodkcal{
      .foodInfut{
        height: 250px;
        position: relative;
        &>h2{padding-top: 18px;}
        .food-inner{
          position: relative;
          margin-top: 15px;
          input{
            @include input;
            height: 26px;
          }
          &>button{
            position: absolute;
            top: 50%;right:8px;
            padding:4px 8px;
            border: none;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            line-height: 12px;
            box-sizing: border-box;
            transform: translateY(-50%);
            background-color: $main_color;
            color: #fff;
            cursor: pointer;
            transition: 0.3s;
            &:hover{
              background-color: $accent_color_orange;
            }
          }
        }
        .food-selects{
          position: absolute;
          width: 323px;
          height: 132px;
          overflow-y:auto;
          z-index: 10;
        }
        .listFoods{
          position: absolute;
          height: 132px;
          width: 323px;
          overflow-y:auto ;
        }
        &>span{
          position: absolute;
          font-size: 12px;
          bottom: 6px;
          right: 16px;
          z-index: 20;
        }
      }
      .all-kcal{
        height: 109px;
        width: 100%;
        background-color: rgba($main_color, 0.19);
        text-align: center;
        p{
          padding-top: 10px;
          font-family: $es_fontFamily;
          color: $accent_color_orange;
          font-weight: bold;
          font-size: 36px;
          span{
            font-family:  "Noto Sans KR", sans-serif;color: #353535;
            font-size: 15px;
            font-weight: 400;
            padding-left: 3px;
          }
        }
      }
    }


  }
</style>