<template>
  <a-row class="v-query">
    <a-col class="v-query-form">
      <a-form
        ref="form"
        label-align="left"
        autocomplete="off"
        :colon="false"
        :model="model"
        @keydown.enter.prevent="submit"
      >
        <a-row :gutter="24">
          <slot />
        </a-row>
      </a-form>
    </a-col>
    <a-col class="v-query-extra">
      <a-space>
        <a-button type="primary" @click="submit">
          <template #icon><v-icon type="icon-search" /></template>
          查询
        </a-button>
        <a-button class="ant-btn-reset" @click="reset">
          <template #icon><v-icon type="icon-clear" /></template>
          重置
        </a-button>
        <slot name="extra" />
      </a-space>
    </a-col>
  </a-row>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'VQuery',
  props: {
    model: Object,
    labelSpan: Number,
    labelCol: Object,
    labelWrap: Object,
  },
  setup(props, context) {
    const { emit } = context;
    const form = ref();
    const submit = () => {
      emit('on-search');
    };
    const reset = () => {
      form.value.resetFields();
      emit('on-reset');
    };
    return {
      form,
      submit,
      reset,
    };
  },
};
</script>
