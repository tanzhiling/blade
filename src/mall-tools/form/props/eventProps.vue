<template>
  <a-form-item label="change" name="change" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
    <a-button size="small" style="font-size: 12px" @click="onEditCode('change')">编辑代码</a-button>
  </a-form-item>
  <a-modal v-model:visible="visible" :width="1000" title="代码编辑" @ok="onModalOk">
    <v-editor ref="editor" :value="code" style="height: 400px" language="javascript" />
  </a-modal>
</template>
<script>
import { ref, unref, watch } from 'vue';
export default {
  props: {
    data: Object,
  },
  setup(props) {
    const model = ref();
    const visible = ref(false);
    const code = ref();
    const editor = ref();

    const onEditCode = (field) => {
      visible.value = true;
      console.log('change', model.value[field]);
      code.value = model.value[field];
    };

    const onModalOk = () => {
      console.log(editor.value.text);
      const { data } = unref(props);
      data.change = editor.value.text;
      visible.value = false;
    };

    watch(
      () => props.data,
      (val) => {
        const { data } = unref(props);
        console.log('data', data);
        model.value = data;
      },
      { immediate: true },
    );

    return {
      editor,
      model,
      visible,
      code,
      onEditCode,
      onModalOk,
    };
  },
};
</script>
