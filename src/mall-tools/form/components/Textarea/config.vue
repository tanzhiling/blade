<template>
  <a-form-item label="占位内容" name="placeholder">
    <a-input v-model:value="model.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="是否禁用" name="disabled">
    <a-switch v-model:checked="model.disabled" />
  </a-form-item>
  <a-form-item label="是否展示字数" name="showCount">
    <a-switch v-model:checked="model.showCount" />
  </a-form-item>
  <a-form-item label="最大长度" name="maxlength">
    <a-input-number v-model:value="model.maxlength" :min="0" />
  </a-form-item>
  <a-form-item label="文本行数" name="rows">
    <a-input-number v-model:value="model.rows" :min="1" />
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
