<template>
  <a-form-item label="风格类型" name="optionType">
    <a-radio-group v-model:value="model.optionType">
      <a-radio value="default">默认</a-radio>
      <a-radio value="button">按钮</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item v-if="model.optionType === 'button'" label="按钮类型" name="buttonStyle">
    <a-radio-group v-model:value="model.buttonStyle">
      <a-radio value="outline">描边</a-radio>
      <a-radio value="solid">填色</a-radio>
    </a-radio-group>
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
