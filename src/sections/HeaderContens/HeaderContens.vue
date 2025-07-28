<template>
  <section class="HeaderContens">
    <h1>
      <img src="../../assets/logo.png" alt="타Go LOGO">
    </h1>
    <button class="hamburger" @click="toggleMenu"> 
      <i class="fa-solid fa-bars"></i>
    </button>

    <MenuHamburger   
      :class="['MenuHamburger', { 'slide-in': isMenuOpen }]"
      @close="closeMenu"
      @open-kcal="openKcal"
    />
    <NoticeContent />
    <KcalContentsAllVue v-if="showKcal" @close="showKcal = false"/>
  </section>
</template>

<script>
import KcalContentsAllVue from '../KcalContentsAll/KcalContentsAll.vue';
import MenuHamburger from './MenuHamburger.vue';
import NoticeContent from './NoticeContent.vue';
export default {
  name:'HeaderContens' ,
  components:{
    MenuHamburger,
    NoticeContent,
    KcalContentsAllVue
  },
  data(){
    return{
      isMenuOpen:false,
      showKcal: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = true;
    },
    closeMenu() {
    this.isMenuOpen = false;
    },
    openKcal() {
    this.showKcal = true;
    this.isMenuOpen = false; // ← 메뉴는 닫고 칼로리 컴포넌트 열기
    }
  }
};
</script>
<style lang="scss" scoped>
  .HeaderContens{
    box-sizing: border-box;
    position: absolute;
    top: 0;left: 0;
    padding: 20px 16px 0px;
    width: 100%;
    height: 114px;
    background-image: linear-gradient(rgba($background_color,1)20%,rgba($background_color,0));
    h1{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 4px;
      img{
        width: 32px;
      }
    }
    .hamburger{
      cursor: pointer;
      background-color: gold;
      width: 36px;height: 36px;
      border-radius: 50%;
      background-color: $accent_color_orange;
      border: none;
      transition: 0.2s;
      &:hover{
        background-color: $main_color;
      }
      i{
        font-size: 18px;
        color: #fff;
        line-height: 36px;
      }
    }
    .MenuHamburger{
      position: absolute;
      top: 0;left: 0;
      width: 100%;
      height:740px;
      background-color: $background_color;
      transform: translateX(-100%); // 기본 상태: 왼쪽 화면 밖
      transition: transform 0.4s ease-out;
      z-index: 9999;
      &.slide-in {
        transform: translateX(0); // → 화면 안으로 들어옴
      }
    }
  }
</style>