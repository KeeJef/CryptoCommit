<template>
    <SimpleTypeahead
	id="typeahead_id"
	placeholder="Start writing..."
	:items="['One','Two','Three']"
	:minInputLength="1"
	:itemProjection="itemProjectionFunction"
	@selectItem="selectItemEventHandler"
	@onInput="onInputEventHandler"
	@onFocus="onFocusEventHandler"
	@onBlur="onBlurEventHandler"
>
    </SimpleTypeahead>
</template>
  
  <script>
  import SimpleTypeahead from 'vue3-simple-typeahead';

  export default {
    name: "searchBar",
    props: {},
    components: {
      SimpleTypeahead,
    },
  };
  </script>
  