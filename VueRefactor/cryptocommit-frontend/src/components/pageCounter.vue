<template>
  <div class="flex flex-row">
    <div class="flex items-center text-2xl font-bold p-1">&lt;</div>
    <div class="flex flex-row">
      <div
        class="flex items-center m-1 py-0.25 px-2 bg-green-500 rounded-md font-bold text-white text-lg"
      >
        1
      </div>
    </div>
    <div class="flex items-center text-2xl font-bold p-1">&gt;</div>
  </div>
</template>

<script>
export default {
  name: "PageCounter",
  data() {
    return {
      maxPages: 0,
      currentPage: 1,
      pageArray: [],
    };
  },
  props: {
    maxItems: Number,
    itemsPerPage: Number,
  },
  components: {},
  mounted() {
    this.calculatePages();
  },
  methods: {
    calculatePages() {
      this.maxPages = Math.ceil(this.maxItems / this.itemsPerPage);

      for(let i = this.currentPage; i >= 1; i--){
        this.pageArray.push(i);
        if(i <= (this.currentPage - 4)){
          break;
        }
      }
      this.pageArray.reverse();

      for (let i = this.currentPage; i < this.maxPages; i++) {
        this.pageArray.push(i + 1);
        if (i >= (this.currentPage + 4)) {
          break;
        }
            
      }

    },
  },
};
</script>

<style></style>
