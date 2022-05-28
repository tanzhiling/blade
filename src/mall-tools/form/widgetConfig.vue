<template>
  <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" label-align="left">
    <a-collapse expand-icon-position="right">
      <a-collapse-panel key="1" header="基本属性">
        <a-form-item label="组件尺寸" name="size">
          <a-radio-group v-model:value="model.size">
            <a-radio value="large">大</a-radio>
            <a-radio value="default">中</a-radio>
            <a-radio value="small">小</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="布局方式" name="layout">
          <a-radio-group v-model:value="model.layout">
            <a-radio value="horizontal">水平</a-radio>
            <a-radio value="vertical">垂直</a-radio>
          </a-radio-group>
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
            <a-input-number
              v-model:value="model.wrapperCol"
              style="width: 60px"
              :min="0"
              :max="24"
            />
          </a-space>
        </a-form-item>
        <a-form-item label="表单缩进" name="padding">
          <a-input-number v-model:value="model.padding" :min="10" />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="事件属性"> 暂无配置 </a-collapse-panel>
    </a-collapse>
  </a-form>
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
