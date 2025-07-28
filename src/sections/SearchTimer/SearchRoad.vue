<template>
  <section class="SearchRoad">
    <div class="SearchRiad-input inner">
      <input
        type="text"
        :id="searchid"
        v-model="searchText"
        @input="handleSelect"
        @keyup.enter="handleEnter"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        placeholder="장소 검색"
        />
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
    </div>
    <ul v-if="suggestions.length" class="autocomplete-list">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'SearchRoad',
  props:{
    locations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchText: '',
      searchid: `search-${Math.random().toString(36).substr(2, 8)}`
    };
  },
  computed: {
    suggestions() {
      const text = this.searchText.toLowerCase();
      if (!text) return []; // ✅ 입력 없으면 아무것도 안 보여줌
      return this.locations
        .filter(loc => loc.name && loc.name.toLowerCase().includes(text))
        .map(loc => loc.name);
    }
  },
  methods: {
  selectItem(itemName) {
  const selected = this.locations.find(loc => loc.name === itemName);
  if (selected) {
    this.$emit('select-id', selected.id);
  }

  this.searchText = ''; // ✅ input 초기화
  this.$nextTick(() => {
    document.getElementById(this.searchid)?.blur(); // ✅ 포커스 제거
  });
},
    handleSelect() {
      // 입력시 동작 필요하면 작성
    }
  },
  watch: {
    // locations() {
    //   this.searchText += '';
    // }
     locations(val) {
    console.log('🔍 SearchRoad.vue 받은 locations:', val);
  }
  },
  mounted() {
  console.log('📌 SearchRoad.vue 초기 location 수:', this.locations.length);
}
};
</script>

<style lang="scss" scoped>

.SearchRoad{
  position: relative;
  z-index: 10;
  .SearchRiad-input{
    margin-top: 10px;
    position: relative;
    #searchid,input{
      @include input;
      padding-left: 38px;
    }
    .fa-solid{
      position: absolute;
      font-size: 18px;
      top: 50%;
      left: 25px;
      color: $main_color;
      transform: translateY(-50%);
    }
  }
  .autocomplete-list {
    box-sizing: border-box;
    z-index: 100;
    width: 100%;
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    max-height: 200px;
    overflow-y: auto;
    li {
      padding: 8px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>