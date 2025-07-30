<template>
  <section class="MenuHamburger" :class="{hide : isHidden}">
    <button @click="leftHidden"><i class="fa-solid fa-x"></i></button>
    <article class="img">
      <i class="fa-solid fa-bicycle"></i>
      <i class="fa-solid fa-down-long"></i>
      <div class="lineSolid"></div>
    </article>
    <nav>
      <ul class="gnb">
        <li><a href="javascript:void(0);" @click="alerts">홈</a></li>
        <li><a href="javascript:void(0);" @click="alerts">저장</a></li>
        <li><a href="javascript:void(0);" @click="$emit('open-kcal')">칼로리 계산기</a></li>
        <li><a href="javascript:void(0);" @click="alerts">검색내역</a></li>
        <li><a href="javascript:void(0);" @click="alerts">내보내기</a></li>
      </ul>
    </nav>
    <article class="info-bar">
      <ul>
        <li><a href="javascript:void(0);">설정</a></li>
        <li><a href="javascript:void(0);">고객센터</a></li>
      </ul>
    </article>
  </section>
</template>
<script>
  export default {
    name:'MenuHamburger',
    data(){
      return{
        isHidden:false,
      }
    },
    methods:{
      leftHidden(){
        this.$emit('close')
      },
      alerts(){
        alert("준비중 입니다.😊")
      }
    }
  }
</script>
<style lang="scss">
  .MenuHamburger{
    &.hide{transform: translateX(-100vw);}
    button{
      position: absolute;
      right: 20px;
      background: none;
      border: none;
      color: $black_color;
      top: 22px;
      cursor: pointer;
      .fa-x{
        font-size: 25px;
        transition:opacity 0.3s;
      }
      &:hover .fa-x{
        opacity: 0.5;
      }
    }

    .img{
      width: 60px;
      height: 100%;
      background-color: $main_color;
      box-shadow: 1px 0px 4px rgba(0,0,0,0.25);
      i{
        display: block;
        text-align: center;
        font-size: 40px;
        color: $background_color;
        &.fa-bicycle{
          transform: scaleX(-1);
          padding-top: 23px;
        }
        &.fa-down-long{
          margin-top: 8px;
          font-size: 20px;
        }
      }
      .lineSolid{
        border-right: 3px solid transparent;
        border-image: repeating-linear-gradient(
          to bottom,
          $background_color 10px,
          $background_color 30px,
          transparent 10px,
          transparent 40px
        );
        border-image-slice: 1;
        height: 100%;
        width: 0px;
        margin: 0 auto;
      }
    }
    nav{
      position: absolute;
      top:130px;
      left: 80px;
      color: $black_color;
      font-size: 20px;
      font-weight: 500;
      height: 70px;
      & .gnb li{
        a{
          line-height: 70px;
          transition: 0.3s;
          &:hover{
            font-size: 24px;
            color: $accent_color_orange;
          }
        }
      }
    }
    .info-bar{
      position: absolute;
      bottom: 0;left: 0;
      width: 100%;
      height: 100%;
      width: 100%;height: 200px;
      background-color: $background_color;
      box-shadow: 0px -3px 2.8px -2px rgba($black_color,0.18) ;
      ul{
        padding-right: 22px;
        padding-top: 18px;
        display: flex;
        justify-content: end;
        li{
          border-right: 1px solid #bcbcbc;
          padding:0 10px;
          transition:opacity 0.3s;
          opacity: 0.7;
          &:last-child{
            padding-right: 0;
            border-right:none ;
          }
          &:hover{
            opacity: 0.5;
          }
        }
      }
    }
  }
</style>