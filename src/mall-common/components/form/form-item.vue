<script lang="jsx">
import { unref } from 'vue';
import { Col, Form } from 'ant-design-vue';
import { componentMap } from './componentMap';

export default {
  props: {
    schema: Object,
    formProps: Object,
    formModel: Object,
    setFormModel: Function,
  },
  setup(props) {
    const { schema, formProps, formModel, setFormModel } = unref(props);
    const {
      label,
      field,
      colon,
      rules,
      required,
      wrapperCol,
      labelCol,
      labelAlign,
      component,
      componentProps,
    } = schema;
    const { rowProps } = formProps;
    const renderFormItem = () => {
      const Comp = componentMap.get(component);

      return (
        <Form.Item
          label={label}
          name={field}
          colon={colon}
          rules={rules}
          required={required}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          labelAlign={labelAlign}
        >
          <Comp
            value={formModel[field]}
            {...componentProps}
            onChange={(value) => setFormModel(field, value)}
          ></Comp>
        </Form.Item>
      );
    };

    return () => {
      return <Col {...rowProps}>{renderFormItem()}</Col>;
    };
  },
};
</script>
