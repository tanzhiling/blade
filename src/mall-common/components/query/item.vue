<template>
  <a-col :span="currentSpan" style="padding-left: 12px; padding-right: 12px">
    <a-form-item
      :name="name"
      :label="label"
      :label-col="currentLabelCol"
      :wrapper-col="currentLabelWrap"
    >
      <slot />
    </a-form-item>
  </a-col>
</template>
<script>
import { findComponentUpward } from '@mall-common/libs/assist';
export default {
  name: 'VQueryItem',
  props: {
    span: Number,
    labelCol: Object,
    labelWrap: Object,
    label: String,
    name: String,
  },
  data() {
    return {
      parent: findComponentUpward(this, 'VQuery'),
      currentLabelCol: {},
      currentLabelWrap: {},
      currentSpan: 8,
    };
  },
  mounted() {
    this.currentLabelCol = this.labelCol || this.parent.labelCol || { span: 6 };
    this.currentLabelWrap = this.labelWrap || this.parent.labelWrap || { span: 18 };
    this.currentSpan = this.span || this.parent.labelSpan || 8;
  },
};
</script>
