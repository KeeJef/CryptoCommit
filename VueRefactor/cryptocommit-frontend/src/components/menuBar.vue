<template>
  <header class="flex justify-between bg-[#e9e9e9] h-14">
    <div class="flex justify-start">
      <div class="justify-center items-center bg-blue-500 px-6 hidden md:flex">
        <div class="text-white text-lg">Github</div>
      </div>
      <div class="justify-center whitespace-nowrap items-center px-6 hidden lg:flex">
        <div class="text-black text-lg">Request a project...</div>
      </div>
    </div>
    <div class="flex justify-self-center self-center px-2 md:px-4">
      <a href="."
        ><img src="../assets/CryptoCommitLogo.webp" alt="CryptoCommit Logo"
      /></a>
    </div>
    <div class="flex justify-end self-center pr-2 md:pr-4">
      <SimpleTypeahead
        class="p-2 text-black w-full"
        id="typeahead_id"
        placeholder="Search..."
        :items="this.projectList"
        :minInputLength="1"
        :itemProjection="itemProjectionFunction"
        @selectItem="selectItemEventHandler"
        @onInput="onInputEventHandler"
        @onFocus="onFocusEventHandler"
        @onBlur="onBlurEventHandler"
      >
      </SimpleTypeahead>
    </div>
  </header>
  <div class="text-center pt-5 text-xl px-4">Aggregate Github commit history across all repositories of a project</div>
</template>

<script>
import SimpleTypeahead from "vue3-simple-typeahead";
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'

export default {
  name: "menuBar",
  props: {
    projectList: Array
  },
  components: {
    SimpleTypeahead,
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
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item{
    border-bottom: 0.1rem solid #d1d1d1 !important;
		border-left: 0.1rem solid #d1d1d1 !important;
		border-right: 0.1rem solid #d1d1d1 !important;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item.simple-typeahead-list-item-active[data-v-f81ca714] {
		background-color: #dfe7d0;
}

</style>
