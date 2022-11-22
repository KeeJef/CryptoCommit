<template>
  <header class="flex justify-between bg-[#e9e9e9] h-14">
    <div class="flex grow basis-0 justify-start">
      <div class="flex justify-center items-center bg-blue-400 px-6">
        <div class="text-white text-lg">Github</div>
      </div>
    </div>
    <div class="justify-self-center self-center px-4">
      <a href="."
        ><img src="../assets/CryptoCommitLogo.webp" alt="CryptoCommit Logo"
      /></a>
    </div>
    <div class="flex justify-end grow basis-0 self-center pr-4">
      <SimpleTypeahead
        id="typeahead_id"
        placeholder="Start writing..."
        :items="['One', 'Two', 'Three']"
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
</template>

<script>
import SimpleTypeahead from "vue3-simple-typeahead";

export default {
  name: "menuBar",
  props: {},
  components: {
    SimpleTypeahead,
  },
};
</script>
