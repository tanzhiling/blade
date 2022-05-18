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
import { computed, nextTick, ref, unref, watch } from 'vue';
import { ApiGetOrgTree, ApiSaveOrg } from '@mall-common/api/org';
import useForm from '@mall-common/hooks/useForm';
import useRequest from '@mall-common/hooks/useRequest';
export default {
  props: {
    visible: Boolean,
    data: Object,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const show = ref(false);
    const loading = ref(false);
    const title = computed(() => (props.data?.id ? '编辑机构' : '新增机构'));
    const [tree] = useRequest({ request: ApiGetOrgTree, isInit: true });

    const [registerForm, { validate, resetFields, setFieldsValue }] = useForm({
      labelCol: { span: 4 },
      schemas: [
        {
          label: '机构名称',
          field: 'deptName',
          component: 'Input',
          rules: [{ required: true, message: '请输入机构名称' }],
        },
        {
          label: '机构全称',
          field: 'fullName',
          component: 'Input',
        },
        {
          label: '上级机构',
          field: 'parentId',
          component: 'TreeSelect',
          treeData: tree,
        },
        {
          label: '机构类型',
          field: 'deptCategory',
          component: 'Radio',
          rules: [{ required: true, message: '请选择机构类型' }],
          options: [
            {
              label: '公司',
              value: '1',
            },
            {
              label: '部门',
              value: '2',
            },
          ],
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
      async (val) => {
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
        const { success, msg } = await ApiSaveOrg({ ...props.data, ...values });
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
