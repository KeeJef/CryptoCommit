<template>
  <header class="flex justify-between bg-[#e9e9e9] h-14">
    <div class="flex justify-start">
      <div class="justify-center items-center bg-blue-500 px-6 hidden md:flex">
        <a href="https://github.com/keejef/cryptocommit"><div class="text-white text-lg select-none cursor-pointer">Github</div></a>
      </div>
      <div
        class="justify-center whitespace-nowrap items-center px-6 hidden lg:flex"
      >
        <a href="https://trustedsetup.typeform.com/to/uChiNE"><div class="text-black text-lg select-none cursor-pointer">Request a project...</div></a>
      </div>

    </div>
    <div class="flex justify-self-center self-center px-2 md:px-4">
      <a href="."
        ><img src="../assets/CryptoCommitLogo.webp" alt="CryptoCommit Logo"
      /></a>
    </div>
    
    <div class="flex justify-end self-center pr-2 md:pr-4">
      <SimpleTypeahead
      ref="typeahead"
        class="p-2 text-black w-full"
        id="typeahead_id"
        placeholder="Search..."
        :items="this.projectList"
        :minInputLength="1"
        :itemProjection="itemProjectionFunction"
        @selectItem="selectItemEventHandler"
        @compositionupdate="compositionUpdate($event)"
        @onInput="onInputEventHandler"
        @onFocus="onFocusEventHandler"
        @onBlur="onBlurEventHandler"
      >
      </SimpleTypeahead>
    </div>
  </header>
  <!-- this is messy, should just break out this conditional stuff into a different component -->
  <div v-if="showSorting" class="text-center pt-5 pb-2 text-xl px-4">
    Aggregate Github commit stats across all repos of a project with
    more than 20 stars ⭐
  </div>
  <div v-if="showSorting" class="border-b-2 border-slate-100"></div>
  <div v-if="showSorting" class="flex justify-center pb-1 pt-3 text-lg">Sort By</div>
  <div v-if="showSorting" class="flex justify-center gap-1 mb-2">
    <button
      :class="{
        'ml-1 py-0.5 px-2 bg-green-500 rounded-md text-white font-bold hover:bg-green-600':
          sortCommits,
      }"
      @click="sortProjectsByCommits"
    >
      Commits
    </button>
    <div class="relative">
      <button
        @mouseover="tooltip = true"
        @mouseleave="tooltip = false"
        :class="{
          'ml-1 py-0.5 px-2 bg-green-500 rounded-md text-white font-bold hover:bg-green-600':
            !sortCommits,
        }"
        @click="sortProjectsByWeighted"
      >
        Weighted
      </button>
      <div
        class="absolute bg-green-300 p-2 rounded-lg bottom-8 w-48 text-center sm:w-64"
        v-if="tooltip"
      >
        Sort by market weighted score. Weighted score is calculated as market cap ÷ total commits, lower is better.
      </div>
    </div>
  </div>
</template>

<script>
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";

export default {
  name: "menuBar",
  data() {
    return {
      projectSelected: "",
      sortCommits: true,
      tooltip: false,
    };
  },
  props: {
    projectList: Array,
    showSorting: Boolean,
  },
  components: {
    SimpleTypeahead,
  },
  methods: {
    selectItemEventHandler(project) {
      this.projectSelected = project;
      this.$refs.typeahead.input = project;
      this.$refs.typeahead.input = "";
      this.pushEventUpstream();
    },
    compositionUpdate(event) {
      this.$refs.typeahead.input = event.data;
    },
    pushEventUpstream() {
      this.$emit("projectSelected", this.projectSelected);
    },
    sortProjectsByCommits() {
      this.$emit("sortProjectsByCommits");
      this.sortCommits = true;
    },
    sortProjectsByWeighted() {
      this.$emit("sortProjectsByWeighted");
      this.sortCommits = false;
    },
  },
};
</script>

<style>
.simple-typeahead .simple-typeahead-list {
  max-height: 300px !important;
  position: absolute;
}
.simple-typeahead {
  position: relative !important;
  width: auto !important;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
  border-bottom: 0.1rem solid #d1d1d1 !important;
  border-left: 0.1rem solid #d1d1d1 !important;
  border-right: 0.1rem solid #d1d1d1 !important;
}
.simple-typeahead
  .simple-typeahead-list
  .simple-typeahead-list-item.simple-typeahead-list-item-active[data-v-f81ca714] {
  background-color: #dfe7d0;
}
</style>
