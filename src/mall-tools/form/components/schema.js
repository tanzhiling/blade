import {
  Input,
  Select,
  Radio,
  Calendar,
  Checkbox,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TreeSelect,
  Slider,
  Rate,
  Divider,
  TimePicker,
  TimeRangePicker,
  Upload,
  Space,
} from 'ant-design-vue';

const componentMap = new Map();

componentMap.set('Space', Space);

componentMap.set('Input', Input);
componentMap.set('Password', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('TextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);

componentMap.set('Select', Select);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('Radio', Radio);
componentMap.set('Checkbox', Checkbox);
componentMap.set('Cascader', Cascader);
componentMap.set('Slider', Slider);
componentMap.set('Rate', Rate);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('YearPicker', DatePicker.YearPicker);
componentMap.set('TimePicker', TimePicker);
componentMap.set('TimeRangePicker', TimeRangePicker);
componentMap.set('Calendar', Calendar);

componentMap.set('Divider', Divider);
componentMap.set('Upload', Upload);

export function add(compName, component) {
  componentMap.set(compName, component);
}

export function del(compName) {
  componentMap.delete(compName);
}

export { componentMap };
