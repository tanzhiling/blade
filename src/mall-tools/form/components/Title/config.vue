<template>
  <a-form-item label="标题位置" name="orientation">
    <a-radio-group v-model:value="model.orientation">
      <a-radio value="left">左边</a-radio>
      <a-radio value="center">中间</a-radio>
      <a-radio value="right">右边</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="距离边框距离" name="orientationMargin">
    <a-input-number v-model:value="model.orientationMargin" :min="0" />
  </a-form-item>
  <a-form-item label="是否虚线" name="dashed">
    <a-switch v-model:checked="model.dashed" />
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
