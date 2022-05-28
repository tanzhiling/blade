<template>
  <a-form-item label="是否禁用" name="disabled">
    <a-switch v-model:checked="model.disabled" />
  </a-form-item>
</template>
<script>
import { ref, unref, watch } from 'vue';
export default {
  props: {
    data: Object,
  },
  setup(props) {
    const model = ref();
    watch(
      () => props.data,
      (val) => {
        const { data } = unref(props);
        model.value = data;
      },
      { immediate: true },
    );
    return {
      model,
    };
  },
};
</script>
