<template>
  <header class="flex justify-between bg-[#e9e9e9] h-14">
    <div class="flex grow basis-0 justify-start">
      <div class="flex justify-center items-center bg-blue-500 px-6">
        <div class="text-white text-lg">Github</div>
      </div>
      <div class="justify-center items-center px-6 hidden lg:flex">
        <div class="text-black text-lg">Request a project...</div>
      </div>
    </div>
    <div class="justify-self-center self-center px-4">
      <a href="."
        ><img src="../assets/CryptoCommitLogo.webp" alt="CryptoCommit Logo"
      /></a>
    </div>
    <div class="flex justify-end grow basis-0 self-center pr-4">
      <SimpleTypeahead
        class="p-2 w-60 text-black"
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
  <div class="text-center pt-5 text-xl">This site aggregates commits across all Repositories and Branches of a project,<br>
giving a more accurate measurement of commit activity, if you like this project star it <a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://github.com/KeeJef/CryptoCommit">here</a></div>
</template>

<script>
import SimpleTypeahead from "vue3-simple-typeahead";

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
