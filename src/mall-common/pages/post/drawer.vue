<template>
  <a-drawer :visible="show" :width="520" :title="title" :mask-closable="false" @close="onClose">
    <a-form ref="formRef" autocomplete="off" :label-col="{ span: 4 }" :model="model" :rules="rules">
      <a-form-item label="岗位类型" name="category">
        <a-select v-model:value="model.category" allow-clear>
          <a-select-option v-for="item in dict" :key="item.dictKey" :value="item.dictKey">
            {{ item.dictValue }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="岗位名称" name="postName">
        <a-input v-model:value="model.postName" allow-clear />
      </a-form-item>
      <a-form-item label="岗位编码" name="postCode">
        <a-input v-model:value="model.postCode" allow-clear />
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
import { ApiSavePost } from '@mall-common/api/post';
export default {
  props: {
    visible: Boolean,
    data: Object,
    dict: Array,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const formRef = ref();
    const show = ref(false);
    const loading = ref(false);
    const model = ref({});
    const rules = reactive({
      category: [{ required: true, message: '请选择岗位类型' }],
      postName: [{ required: true, message: '请输入岗位名称' }],
      postCode: [{ required: true, message: '请输入岗位编码' }],
    });
    const title = computed(() => (props.data?.id ? '编辑岗位' : '新增岗位'));

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
        model.value = { ...data, category: data?.category ? String(data.category) : '' };
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
