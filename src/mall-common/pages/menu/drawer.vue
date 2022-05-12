<template>
  <a-drawer :visible="show" :width="520" :title="title" :mask-closable="false" @close="onClose">
    <a-form ref="formRef" autocomplete="off" :label-col="{ span: 4 }" :model="model" :rules="rules">
      <a-form-item label="菜单名称" name="name">
        <a-input v-model:value="model.name" allow-clear />
      </a-form-item>
      <a-form-item label="菜单编码" name="code">
        <a-input v-model:value="model.code" allow-clear />
      </a-form-item>
      <a-form-item label="路由地址" name="path">
        <a-input v-model:value="model.path" allow-clear />
      </a-form-item>
      <a-form-item label="页面路径" name="page">
        <a-input v-model:value="model.page" allow-clear />
      </a-form-item>
      <a-form-item label="菜单类型" name="category">
        <a-radio-group v-model:value="model.category">
          <a-radio :value="1">菜单</a-radio>
          <a-radio :value="2">页面</a-radio>
          <a-radio :value="3">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上级菜单" name="parentId">
        <a-tree-select
          v-model:value="model.parentId"
          :tree-data="tree"
          :field-names="{
            children: 'children',
            label: 'title',
            key: 'key',
            value: 'value',
          }"
        />
      </a-form-item>
      <a-form-item label="图标" name="source">
        <a-input v-model:value="model.source" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number v-model:value="model.sort" :min="1" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="model.remark" :rows="4" allow-clear />
      </a-form-item>
    </a-form>
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
import { computed, reactive, ref, unref, watch } from 'vue';
import { ApiGetMenuTree, ApiSaveMenu } from '@mall-common/api/menu';
import useRequest from '@mall-common/hooks/useRequest';
export default {
  props: {
    data: Object,
    visible: Boolean,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const formRef = ref();
    const show = ref(false);
    const loading = ref(false);
    const model = ref({});
    const rules = reactive({
      name: [{ required: true, message: '请输入菜单名称' }],
      code: [{ required: true, message: '请输入菜单编码' }],
      path: [{ required: true, message: '请输入路由地址' }],
      category: [{ required: true, message: '请选择类型' }],
    });
    const title = computed(() => (props.data?.id ? '编辑菜单' : '新增菜单'));
    const [tree] = useRequest({ request: ApiGetMenuTree, isInit: true });

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
        model.value = { ...data };
        show.value = val;
      },
    );

    const onClose = () => {
      model.value = {};
      formRef.value.resetFields();
      show.value = false;
    };

    const onSubmit = async () => {
      formRef.value.validate().then(() => {
        loading.value = true;
        ApiSaveMenu(model.value)
          .then((res) => {
            loading.value = false;
            if (res.success) {
              message.success(res.msg);
              emit('reload');
              onClose();
            }
          })
          .catch(() => {
            loading.value = false;
          });
      });
    };

    return {
      formRef,
      show,
      model,
      rules,
      title,
      tree,
      loading,
      onClose,
      onSubmit,
    };
  },
};
</script>
