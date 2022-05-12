const basicProps = {
  model: {
    type: Object,
    default: {},
  },
  rowProps: Object,
  colProps: Object,
  // 表单配置规则
  schemas: {
    type: [Array],
    default: () => [],
  },
  size: String,
  // 以下为默认props
  hideRequiredMark: Boolean,
  labelCol: Object,
  labelWrap: Boolean,
  scrollToFirstError: Boolean,
  layout: String,
  wrapperCol: Object,
  colon: Boolean,
  labelAlign: String,
};

export default basicProps;
