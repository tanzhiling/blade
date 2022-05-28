<template>
  <a-form-item label="字段值" name="field">
    <a-input v-model:value="model.field" />
  </a-form-item>
  <a-form-item label="对齐方式" name="labelAlign">
    <a-radio-group v-model:value="model.labelAlign">
      <a-radio value="left">左对齐</a-radio>
      <a-radio value="right">右对齐</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="标签控件布局" name="labelCol">
    <a-space>
      <a-input-number v-model:value="model.labelCol" style="width: 60px" :min="0" :max="24" />
      <a-input-number v-model:value="model.wrapperCol" style="width: 60px" :min="0" :max="24" />
    </a-space>
  </a-form-item>
  <a-form-item label="控件尺寸" name="size">
    <a-radio-group v-model:value="model.size">
      <a-radio value="large">大</a-radio>
      <a-radio value="default">中</a-radio>
      <a-radio value="small">小</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="是否必填" name="required">
    <a-switch v-model:checked="model.required" />
  </a-form-item>
  <a-form-item label="校验规则" name="rules">
    <a-textarea :rows="4" placeholder="[{ required: true, message: '请输入校验规则' }]" />
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
