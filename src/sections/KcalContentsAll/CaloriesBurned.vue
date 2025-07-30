<template>
  <section class="CaloriesBurned">
      <h2>운동 시간</h2>
      <input
        type="text"
        v-model="formattedTime"
        @input="onInputTime"
        @blur="formatOnBlur"
        placeholder="00:00:00"
      >
      <button class="goto-btn" @click=fillInput><p>타이머 기록 추가 +</p></button>
  </section>
</template>
<script>
  import { ref, defineComponent, watch} from 'vue'

  export default defineComponent({
    name: 'CaloriesBurned',
    props: {
      lastRecord: {
        type: Number,
        default: 0
      }
    },
    setup(props, { emit }) {
      const formattedTime = ref('')
      const isFilledByButton = ref(false)

      const formatSecondsToHHMMSS = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60
        return [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':')
      }

      const onInputTime = (e) => {
        isFilledByButton.value = false
        const raw = e.target.value.replace(/[^\d:]/g, '')
        formattedTime.value = raw
      }

      const fillInput = () => {
        if (props.lastRecord > 0) {
          formattedTime.value = formatSecondsToHHMMSS(props.lastRecord)
          isFilledByButton.value = true
        } else {
          formattedTime.value = ''
        }
      }

      const formatOnBlur = () => {
        const numbers = formattedTime.value.replace(/\D/g, '').padStart(6, '0')
        const hours = numbers.slice(0, 2)
        const minutes = numbers.slice(2, 4)
        const seconds = numbers.slice(4, 6)
        formattedTime.value = `${hours}:${minutes}:${seconds}`
      }

      watch(formattedTime, (val) => {
        const [hh = 0, mm = 0, ss = 0] = val.split(':').map(Number)
        const minutes = hh * 60 + mm + ss / 60
        emit('update-time', minutes)
      })

      return {
        formattedTime,
        onInputTime,
        fillInput,
        formatOnBlur
      }
    }
  })
</script>
<style lang="scss">
  .CaloriesBurned{
    background-color: $background_color;
    position: relative;
    text-align: center;
    height: 169px;
    width: 100%;
    h2{
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      padding-top: 20px;
    }
    input{
      @include input;
      width: 146px;
      margin-top: 16px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      padding-left:0 ;
    }
    .goto-btn{
      display: flex;
      background-color: transparent;
      border: none;
      outline: none;
      margin: 20px auto;
      p{
        font-size: 16px;
        font-weight: bold;
        box-sizing: border-box;
        color: $background_color;
        padding: 6px 10px;
        border-radius:8px ;
        background-color: $accent_color_orange;
        &:hover{
          background-color:$main_color;
          box-shadow: inset 2px 2px 2px rgba(0,0,0,0.2);
          text-shadow: 2px 2px 3px rgba(0,0,0,0.3);
        }
      }
    }
  }
</style>