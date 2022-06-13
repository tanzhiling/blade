<template>
  <a-form-item label="自定义字符" name="character">
    <a-input v-model:value="model.character" allow-clear />
  </a-form-item>
  <a-form-item label="是否允许半选" name="allowHalf">
    <a-switch v-model:checked="model.allowHalf" />
  </a-form-item>
  <a-form-item label="star总数" name="count">
    <a-input-number v-model:value="model.count" :min="0" />
  </a-form-item>
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
