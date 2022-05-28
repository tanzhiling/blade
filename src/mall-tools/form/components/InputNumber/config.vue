<template>
  <a-form-item label="前置标签" name="addonBefore">
    <a-input v-model:value="model.addonBefore" allow-clear />
  </a-form-item>
  <a-form-item label="后置标签" name="addonAfter">
    <a-input v-model:value="model.addonAfter" allow-clear />
  </a-form-item>
  <a-form-item label="前缀图标" name="prefix">
    <a-input v-model:value="model.prefix" allow-clear />
  </a-form-item>
  <a-form-item label="显示增减按钮" name="controls">
    <a-switch v-model:checked="model.controls" />
  </a-form-item>
  <a-form-item label="是否有边框" name="bordered">
    <a-switch v-model:checked="model.bordered" />
  </a-form-item>
  <a-form-item label="是否禁用" name="disabled">
    <a-switch v-model:checked="model.disabled" />
  </a-form-item>
  <a-form-item label="开启键盘快捷" name="keyboard">
    <a-switch v-model:checked="model.keyboard" />
  </a-form-item>
  <a-form-item label="最大值" name="max">
    <a-input-number v-model:value="model.max" />
  </a-form-item>
  <a-form-item label="最小值" name="min">
    <a-input-number v-model:value="model.min" />
  </a-form-item>
  <a-form-item label="数值精度" name="precision">
    <a-input-number v-model:value="model.precision" />
  </a-form-item>
  <a-form-item label="步数" name="step">
    <a-input-number v-model:value="model.step" />
  </a-form-item>
  <a-form-item label="formatter">
    <a-textarea v-model:value="model.formatter" :rows="3" />
  </a-form-item>
  <a-form-item label="parser">
    <a-textarea v-model:value="model.parser" :rows="3" />
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
