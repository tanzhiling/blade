const basicProps = {
  page: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  childrenColumnName: {
    type: String,
    default: 'children',
  },
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  defaultExpandAllRows: {
    type: Boolean,
    default: false,
  },
  defaultExpandedRowKeys: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: [Object, Boolean],
  },
  rowKey: {
    type: String,
  },
};

export default basicProps;
