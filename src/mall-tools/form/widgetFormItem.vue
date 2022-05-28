<script lang="jsx">
import { unref } from 'vue';
import { componentMap } from './components/schema';

const DateComponents = ['DatePicker', 'MonthPicker', 'RangePicker', 'WeekPicker', 'YearPicker'];

const _eval = (props) => props && eval(props);

export default {
  props: {
    data: Object,
    labelCol: Number,
    wrapperCol: Number,
  },
  setup(props) {
    const { wrapperCol, labelCol } = unref(props);

    const renderItem = () => {
      const {
        field,
        component,
        componentProps,
        dataProps,
        formProps: { size },
        eventProps,
      } = props.data;
      const Comp = componentMap.get(component);

      if (component === 'InputNumber') {
        componentProps.formatter = _eval(componentProps.formatter);
        componentProps.parser = _eval(componentProps.parser);
      }
      if (DateComponents.includes(component)) {
        componentProps.disabledDate = _eval(componentProps.disabledDate);
      }

      if (component === 'Radio') {
        return (
          <a-radio-group
            {...componentProps}
            {...dataProps}
            value={field}
            size={size}
            onChange={(e) => (field = e.target.value)}
          />
        );
      }
      if (component === 'Select') {
        return (
          <a-select
            {...componentProps}
            {...dataProps}
            value={field}
            allow-clear
            size={size}
            onChange={(value) => (field = value)}
          />
        );
      }
      if (component === 'Checkbox') {
        return (
          <a-checkbox-group
            {...componentProps}
            {...dataProps}
            value={field}
            size={size}
            onChange={(e) => (field = e.target.value)}
          />
        );
      }
      if (component === 'TreeSelect') {
        return (
          <a-tree-select
            {...componentProps}
            {...dataProps}
            allowClear
            value={field}
            size={size}
            treeData={componentProps.options}
          />
        );
      }
      return <Comp value={field} {...componentProps} size={size} allow-clear />;
    };

    return () => {
      const { field, label, component, componentProps, formProps } = props.data;
      if (component === 'Title') {
        return <a-divider {...componentProps}>{label}</a-divider>;
      }
      return (
        <a-form-item
          name={field}
          label={label}
          rules={formProps.rules}
          required={formProps.required}
          labelAlign={formProps.labelAlign}
          labelCol={{ span: formProps.labelCol || labelCol }}
          wrapperCol={{ span: formProps.wrapperCol || wrapperCol }}
        >
          {renderItem()}
        </a-form-item>
      );
    };
  },
};
</script>
