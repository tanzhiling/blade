<template>
  <a-drawer :visible="show" :width="520" :title="title" :mask-closable="false" @close="onClose">
    <a-form ref="formRef" autocomplete="off" :label-col="{ span: 4 }" :model="model" :rules="rules">
      <div class="v-title">基本信息</div>
      <!-- <a-descriptions title="基本信息"></a-descriptions> -->
      <a-form-item label="机构名称" name="deptName">
        <a-input v-model:value="model.deptName" />
      </a-form-item>
      <a-form-item label="机构全称" name="fullName">
        <a-input v-model:value="model.fullName" />
      </a-form-item>
      <a-form-item label="上级机构" name="parentId">
        <a-tree-select v-model:value="model.parentId" :tree-data="tree" />
      </a-form-item>
      <a-form-item label="机构类型" name="deptCategory">
        <a-radio-group v-model:value="model.deptCategory">
          <a-radio :value="1">公司</a-radio>
          <a-radio :value="2">部门</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :span="12" label="排序" name="sort">
        <a-input-number v-model:value="model.sort" :min="0" :step="10" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="model.remark" :rows="4" />
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
import { ApiGetOrgTree, ApiSaveOrg } from '@mall-common/api/org';
import useRequest from '@mall-common/hooks/useRequest';
export default {
  props: {
    data: Object,
    visible: Boolean,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const formRef = ref();
    const show = ref(true);
    const loading = ref(false);
    const model = ref({});
    const rules = reactive({
      deptName: [{ required: true, message: '请输入机构名称' }],
      deptCategory: [{ required: true, message: '请选择机构类型' }],
    });
    const title = computed(() => (props.data?.id ? '编辑用户' : '新增用户'));
    const [tree] = useRequest({ request: ApiGetOrgTree, isInit: true });

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
        ApiSaveOrg(model.value)
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
