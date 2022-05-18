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
import { ApiSaveParam } from '@mall-common/api/param';
import useForm from '@mall-common/hooks/useForm';
export default {
  props: {
    visible: Boolean,
    data: Object,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const show = ref(false);
    const loading = ref(false);
    const title = computed(() => (props.data?.id ? '编辑参数' : '新增参数'));
    const [registerForm, { model, validate, resetFields, setFieldsValue }] = useForm({
      labelCol: { span: 4 },
      schemas: [
        {
          label: '参数名称',
          field: 'paramName',
          component: 'Input',
          rules: [{ required: true, message: '请输入参数名称' }],
        },
        {
          label: '参数键名',
          field: 'paramKey',
          component: 'Input',
          rules: [{ required: true, message: '请输入参数键名' }],
        },
        {
          label: '参数键值',
          field: 'paramValue',
          component: 'Input',
          rules: [{ required: true, message: '请输入参数键值' }],
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
        nextTick(() => setFieldsValue(data));
      },
    );

    const onClose = () => {
      resetFields();
      show.value = false;
    };

    const onSubmit = async () => {
      try {
        const values = await validate();
        loading.value = true;
        const { success, msg } = await ApiSavePost({ ...props.data, ...values });
        if (success) {
          message.success(msg);
          emit('reload');
          onClose();
        }
      } finally {
        loading.value = false;
      }
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
