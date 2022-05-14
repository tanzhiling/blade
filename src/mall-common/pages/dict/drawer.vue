<template>
  <a-drawer :visible="show" :width="520" :title="title" :mask-closable="false" @close="onClose">
    <a-form ref="formRef" autocomplete="off" :label-col="{ span: 4 }" :model="model" :rules="rules">
      <a-form-item label="字典名称" name="dictValue">
        <a-input v-model:value="model.dictValue" allow-clear />
      </a-form-item>
      <a-form-item label="字典编码" name="code">
        <a-input v-model:value="model.code" allow-clear />
      </a-form-item>
      <a-form-item label="排序" name="sort">
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
import { ApiSaveDict } from '@mall-common/api/dict';
export default {
  props: {
    visible: Boolean,
    data: Object,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const formRef = ref();
    const show = ref(false);
    const loading = ref(false);
    const model = ref({});
    const rules = reactive({
      dictValue: [{ required: true, message: '请输入字典名称' }],
      code: [{ required: true, message: '请输入字典编码' }],
    });
    const title = computed(() => (props.data?.id ? '编辑字典' : '新增字典'));

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

    const onSubmit = () => {
      formRef.value.validate().then(async () => {
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
      formRef,
      show,
      model,
      rules,
      title,
      loading,
      onClose,
      onSubmit,
    };
  },
};
</script>
