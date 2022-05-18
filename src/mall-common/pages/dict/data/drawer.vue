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
import { ApiSaveDict } from '@mall-common/api/dict';
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
    const title = computed(() => (props.data?.id ? '编辑字典明细' : '新增字典明细'));
    const [registerForm, { model, validate, resetFields, setFieldsValue }] = useForm({
      labelCol: { span: 4 },
      schemas: [
        {
          label: '字典名称',
          field: 'dictValue',
          component: 'Input',
          rules: [{ required: true, message: '请输入字典名称' }],
        },
        {
          label: '字典键值',
          field: 'dictKey',
          component: 'Input',
          rules: [{ required: true, message: '请输入字典键值' }],
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
        nextTick(() => setFieldsValue(data));
      },
    );

    const onClose = () => {
      resetFields();
      show.value = false;
    };

    const onSubmit = () => {
      validate().then(async () => {
        loading.value = true;
        const { success, msg } = await ApiSaveDict(model.value);
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
