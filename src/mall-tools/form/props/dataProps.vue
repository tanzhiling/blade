<template>
  <a-tabs v-model:activeKey="activeKey" centered :tab-bar-gutter="100">
    <a-tab-pane key="static" tab="静态数据">
      <vuedraggable :list="data.options" item-key="value" animation="300">
        <template #item="{ element: item, index }">
          <a-row type="flex" align="middle" style="margin-bottom: 4px">
            <a-col :span="2">
              <v-icon type="icon-unorderedlist" style="cursor: move" />
            </a-col>
            <a-col :span="10">
              <a-input v-model:value="item.label" allow-clear />
            </a-col>
            <a-col :span="10">
              <a-input v-model:value="item.value" allow-clear />
            </a-col>
            <a-col :span="2" style="text-align: right">
              <v-icon type="icon-minus-circle" style="cursor: pointer" @click="onRemove(index)" />
            </a-col>
          </a-row>
        </template>
      </vuedraggable>
      <a-button type="link" @click="onAdd">添加列</a-button>
    </a-tab-pane>
    <a-tab-pane key="dynamic" tab="接口数据">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" label-align="left">
        <a-form-item label="接口地址" name="url">
          <a-input v-model:value="model.url" />
        </a-form-item>
        <a-form-item label="字段配置" name="optionsField">
          <a-space direction="vertical">
            <a-input v-model:value="model.fieldNames.label" addon-before="label" />
            <a-input v-model:value="model.fieldNames.value" addon-before="value" />
            <a-input v-model:value="model.fieldNames.children" addon-before="children" />
          </a-space>
        </a-form-item>
        <a-form-item label="onSuccess" name="onSuccess">
          <a-textarea v-model:value="model.onSuccess" :rows="4" />
        </a-form-item>
        <a-form-item label="onFail" name="onFail">
          <a-textarea v-model:value="model.onFail" :rows="4" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import vuedraggable from 'vuedraggable';
import { ref, unref, watch } from 'vue';
export default {
  components: { vuedraggable },
  props: {
    data: Object,
  },
  setup(props) {
    const activeKey = ref('static');
    const model = ref();

    watch(
      () => props.data,
      (val) => {
        const { data } = unref(props);
        model.value = data;
      },
      { immediate: true },
    );

    const onAdd = () => {
      const { data } = unref(props);
      data.options.push({ label: '', value: '' });
    };

    const onRemove = (index) => {
      const { data } = unref(props);
      data.options.splice(index, 1);
    };

    return {
      model,
      activeKey,
      onAdd,
      onRemove,
    };
  },
};
</script>
