<template>
  <a-form-item label="时间格式" name="format">
    <a-input v-model:value="model.format" allow-clear />
  </a-form-item>
  <a-form-item label="占位内容" name="placeholder">
    <a-input v-model:value="model.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="是否有边框" name="bordered">
    <a-switch v-model:checked="model.bordered" />
  </a-form-item>
  <a-form-item label="是否禁用" name="disabled">
    <a-switch v-model:checked="model.disabled" />
  </a-form-item>
  <a-form-item label="展示时间" name="showTime">
    <a-switch v-model:checked="model.showTime" />
  </a-form-item>
  <a-form-item label="不可选日期" name="disabledDate">
    <a-textarea v-model:value="model.disabledDate" :rows="4" />
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
