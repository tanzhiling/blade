const basicProps = {
  search: Boolean, // 搜索模式
  globalSpan: {
    type: Number,
    default: 24,
  },
  // 表单配置规则
  schemas: {
    type: [Array],
    default: () => [],
  },
  // 以下为默认props
  hideRequiredMark: Boolean,
  scrollToFirstError: Boolean,
  colon: Boolean,
  labelAlign: String,
  labelCol: Object,
  wrapperCol: Object,
  labelWrap: Boolean,
};

export default basicProps;
