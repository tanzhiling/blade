<template>
  <a-drawer :visible="show" :width="520" :title="title" :mask-closable="false" @close="onClose">
    <v-form @register="registerForm" />
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
import { computed, ref, unref, watch } from 'vue';
import { ApiSaveRole } from '@mall-common/api/role';
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
    const title = computed(() => (props.data?.id ? '编辑角色' : '新增角色'));

    const [registerForm, { model, validate, resetFields, setFieldsValue }] = useForm({
      labelCol: { span: 4 },
      schemas: [
        {
          label: '角色名称',
          field: 'roleName',
          component: 'Input',
          rules: [{ required: true, message: '请输入角色名称' }],
        },
        {
          label: '角色编码',
          field: 'roleAlias',
          component: 'Input',
          rules: [{ required: true, message: '请输入角色编码' }],
        },
        {
          label: '排序',
          field: 'sort',
          component: 'InputNumber',
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
        setFieldsValue(data);
        show.value = val;
      },
    );

    const onClose = () => {
      resetFields();
      show.value = false;
    };

    const onSubmit = () => {
      validate().then(async () => {
        loading.value = true;
        const { success, msg } = await ApiSaveRole(model.value);
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
