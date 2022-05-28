<template>
  <a-form-item label="占位内容" name="placeholder">
    <a-input v-model:value="model.placeholder" allow-clear />
  </a-form-item>
  <a-form-item label="前置标签" name="addonBefore">
    <a-input v-model:value="model.addonBefore" allow-clear />
  </a-form-item>
  <a-form-item label="后置标签" name="addonAfter">
    <a-input v-model:value="model.addonAfter" allow-clear />
  </a-form-item>
  <a-form-item label="前缀图标" name="prefix">
    <a-input v-model:value="model.prefix" allow-clear />
  </a-form-item>
  <a-form-item label="后缀图标" name="suffix">
    <a-input v-model:value="model.suffix" allow-clear />
  </a-form-item>
  <a-form-item label="是否有边框" name="bordered">
    <a-switch v-model:checked="model.bordered" />
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
        model.value = val;
      },
      { immediate: true },
    );

    return {
      model,
    };
  },
};
</script>
