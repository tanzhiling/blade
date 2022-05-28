export default [
  {
    title: '布局字段',
    list: [
      {
        component: 'Title',
        label: '标题',
        span: 24,
        componentProps: {},
      },
      {
        component: 'Row',
        label: '栅格',
        span: 24,
        componentProps: {},
      },
    ],
  },
  {
    title: '输入字段',
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
    ],
  },
  {
    title: '选择字段',
    list: [
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
        eventProps: {},
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
    ],
  },
  {
    title: '上传字段',
    list: [
      {
        component: 'Upload',
        label: '上传',
        span: 24,
        display: true,
      },
    ],
  },
  {
    title: '时间字段',
    list: [
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
        controls: true,
        span: 24,
        display: true,
      },
    ],
  },
  {
    title: '插件字段',
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
