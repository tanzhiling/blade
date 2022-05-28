<template>
  <a-form-item label="占位内容" name="placeholder">
    <a-input v-model:value="model.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="是否有边框" name="bordered">
    <a-switch v-model:checked="model.bordered" />
  </a-form-item>
  <a-form-item label="是否禁用" name="disabled">
    <a-switch v-model:checked="model.disabled" />
  </a-form-item>
  <a-form-item label="是否多选" name="mode">
    <a-switch v-model:checked="model.mode" checked-value="multiple" un-checked-value="combobox" />
  </a-form-item>
  <a-form-item label="是否可搜索" name="showSearch">
    <a-switch v-model:checked="model.showSearch" />
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
