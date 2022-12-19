<template>
  <div class="flex flex-row my-5">
    <div @click="changePage(this.currentPage - 1)" class="flex items-center text-2xl font-bold p-1 cursor-pointer select-none">&lt;</div>
    <div class="flex flex-row">
      <div v-for="pages in this.pageArray" :key="pages">
        <div
          @click="changePage(pages)"
          class="flex items-center m-1 py-0.25 px-2 bg-slate-400 rounded-md font-bold text-white text-lg cursor-pointer select-none	"
          :class="{ '!bg-green-500': pages === this.currentPage }"
        >
          {{ pages }}
        </div>
      </div>
    </div>
    <div @click="changePage(this.currentPage + 1)" class="flex items-center text-2xl font-bold p-1 cursor-pointer select-none">&gt;</div>
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
      //this is way to complicated, but it works for now, i think the proper way to do this is to start at the current page and subtract 3 and add 3 to the current page, making sure you don't go out of bounds, then generate and array based on those params

      this.maxPages = Math.ceil(this.maxItems / this.itemsPerPage);

      for (let i = this.currentPage; i >= 1; i--) {
        this.pageArray.push(i);
        if (i <= this.currentPage - 3) {
          break;
        }
      }
      this.pageArray.reverse();

      for (let i = this.currentPage; i < this.maxPages; i++) {
        this.pageArray.push(i + 1);
        if (i >= this.currentPage + 2) {
          break;
        }
      }
    },
    changePage(newPageNumber){
      if(newPageNumber < 1 || newPageNumber > this.maxPages){
        return
      }
      this.currentPage = newPageNumber
      this.$emit('changePage', this.currentPage)
    }
  },
  watch: {
    currentPage() {
      this.pageArray = [];
      this.calculatePages();
    },
  },
};
</script>

<style></style>
