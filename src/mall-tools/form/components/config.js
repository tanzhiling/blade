import Calendar from './Calendar/config.vue';
import Cascader from './Cascader/config.vue';
import Checkbox from './Checkbox/config.vue';
import DatePicker from './DataPicker/config.vue';
import Input from './Input/config.vue';
import InputNumber from './InputNumber/config.vue';
import Radio from './Radio/config.vue';
import Rate from './Rate/config.vue';
import Select from './Select/config.vue';
import Slider from './Slider/config.vue';
import TextArea from './Textarea/config.vue';
import TimePicker from './TimePicker/config.vue';
import Title from './Title/config.vue';
import TreeSelect from './TreeSelect/config.vue';

export default {
  Calendar,
  Cascader,
  Checkbox,
  DatePicker,
  YearPicker: DatePicker,
  WeekPicker: DatePicker,
  MonthPicker: DatePicker,
  RangePicker: DatePicker,
  Input,
  InputNumber,
  Password: Input,
  Radio,
  Rate,
  Select,
  Slider,
  TextArea,
  TimePicker,
  TimeRangePicker: TimePicker,
  Title,
  TreeSelect,
};
