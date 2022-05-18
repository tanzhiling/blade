<template>
  <a-drawer :visible="show" :width="520" :title="title" :mask-closable="false" @close="onClose">
    <BasicForm @register="registerForm" />
    <template #footer>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script>
import { message } from 'ant-design-vue';
import { computed, ref, unref, watch, nextTick } from 'vue';
import { ApiSavePost } from '@mall-common/api/post';
import useForm from '@mall-common/hooks/useForm';
export default {
  props: {
    visible: Boolean,
    data: Object,
    dict: Array,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const show = ref(false);
    const loading = ref(false);
    const title = computed(() => (props.data?.id ? '编辑岗位' : '新增岗位'));
    const [registerForm, { model, validate, resetFields, setFieldsValue }] = useForm({
      labelCol: { span: 4 },
      schemas: [
        {
          label: '岗位类型',
          field: 'category',
          component: 'Select',
          rules: [{ required: true, message: '请选择岗位类型' }],
          options: props.dict,
          optionsField: {
            value: 'dictKey',
            label: 'dictValue',
          },
        },
        {
          label: '岗位名称',
          field: 'postName',
          component: 'Input',
          rules: [{ required: true, message: '请输入岗位名称' }],
        },
        {
          label: '岗位编码',
          field: 'postCode',
          component: 'Input',
          rules: [{ required: true, message: '请输入岗位编码' }],
        },
        {
          label: '排序',
          field: 'sort',
          component: 'InputNumber',
        },
        {
          label: '备注',
          field: 'remark',
          component: 'TextArea',
        },
      ],
    });

    watch(
      () => show.value,
      (val) => {
        emit('update:visible', val);
      },
    );

    watch(
      () => props.visible,
      (val) => {
        const { data } = unref(props);
        show.value = val;
        nextTick(() =>
          setFieldsValue({ ...data, category: data?.category ? String(data.category) : '' }),
        );
      },
    );

    const onClose = () => {
      resetFields();
      show.value = false;
    };

    const onSubmit = () => {
      validate().then(async () => {
        loading.value = true;
        const { success, msg } = await ApiSavePost(model.value);
        loading.value = false;
        if (success) {
          message.success(msg);
          emit('reload');
          onClose();
        }
      });
    };

    return {
      registerForm,
      show,
      title,
      loading,
      onClose,
      onSubmit,
    };
  },
};
</script>
