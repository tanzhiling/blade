export default [
  {
    title: '布局组件',
    type: 'layout',
    list: [
      {
        component: 'Space',
        label: '间距',
        span: 24,
        componentProps: {},
      },
    ],
  },
  {
    title: '表单组件',
    type: 'form',
    list: [
      {
        component: 'Input',
        label: '输入框',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'Password',
        label: '密码',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'TextArea',
        label: '文本框',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'InputNumber',
        label: '计数器',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'Radio',
        label: '单选框',
        span: 24,
        formProps: {},
        componentProps: {},
        dataProps: {
          fieldNames: {},
          options: [
            {
              value: '1',
              label: '选项1',
            },
            {
              value: '2',
              label: '选项2',
            },
          ],
        },
        eventProps: {
          change: '(val) => {}',
        },
      },
      {
        component: 'Checkbox',
        label: '多选框',
        span: 24,
        formProps: {},
        componentProps: {},
        dataProps: {
          fieldNames: {},
          options: [
            {
              value: '1',
              label: '选项1',
            },
            {
              value: '2',
              label: '选项2',
            },
          ],
        },
        eventProps: {},
      },
      {
        component: 'Select',
        label: '下拉选择器',
        span: 24,
        formProps: {},
        componentProps: {},
        dataProps: {
          fieldNames: {},
          options: [
            {
              value: '1',
              label: '选项1',
            },
            {
              value: '2',
              label: '选项2',
            },
          ],
        },
        eventProps: {},
      },
      {
        component: 'Cascader',
        label: '级联选择器',
        span: 24,
        formProps: {},
        componentProps: {},
        dataProps: {
          fieldNames: {},
          options: [
            {
              value: '1',
              label: '选项1',
            },
            {
              value: '2',
              label: '选项2',
            },
          ],
        },
        eventProps: {},
      },
      {
        component: 'TreeSelect',
        label: '树型选择器',
        span: 24,
        formProps: {},
        componentProps: {},
        dataProps: {
          fieldNames: {},
          options: [
            {
              value: '1',
              label: '选项1',
            },
            {
              value: '2',
              label: '选项2',
            },
          ],
        },
        eventProps: {},
      },
      {
        component: 'YearPicker',
        label: '年',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'MonthPicker',
        label: '月',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'WeekPicker',
        label: '周',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'DatePicker',
        label: '日期',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'RangePicker',
        label: '日期范围',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'TimePicker',
        label: '时间',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'TimeRangePicker',
        label: '时间范围',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'Calendar',
        label: '日历',
        span: 24,
        formProps: {},
        // componentProps: {},
      },
      {
        component: 'Upload',
        label: '上传',
        span: 24,
        formProps: {},
      },
      {
        component: 'Rate',
        label: '评分',
        span: 24,
        formProps: {},
        componentProps: {},
      },
      {
        component: 'Slider',
        label: '滑动输入条',
        span: 24,
        formProps: {},
        componentProps: {},
      },
    ],
  },
  {
    title: '辅助组件',
    list: [
      {
        component: 'Title',
        label: '标题',
        span: 24,
        componentProps: {},
      },
      {
        component: 'Button',
        label: '按钮',
        span: 24,
        componentProps: {},
      },
    ],
  },
  {
    title: '自定义组件',
    list: [
      {
        component: 'RichText',
        label: '富文本',
        span: 24,
        display: true,
      },
      {
        component: 'Map',
        label: '地图',
        span: 24,
        display: true,
      },
    ],
  },
];
