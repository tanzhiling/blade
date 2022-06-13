<template>
  <a-form-item label="是否垂直" name="vertical">
    <a-switch v-model:checked="model.vertical" />
  </a-form-item>
  <a-form-item label="开启反向" name="reverse">
    <a-switch v-model:checked="model.reverse" />
  </a-form-item>
  <a-form-item label="最大值" name="max">
    <a-input-number v-model:value="model.max" />
  </a-form-item>
  <a-form-item label="最小值" name="min">
    <a-input-number v-model:value="model.min" />
  </a-form-item>
  <a-form-item label="步进数" name="step">
    <a-input-number v-model:value="model.step" />
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
