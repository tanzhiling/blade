<template>
  <a-layout class="form-designer">
    <a-layout-sider class="form-designer-field" :width="240">
      <div class="field-config">
        <template v-for="(field, index) in fieldConfig" :key="'f_' + index">
          <div class="field-config-title">
            {{ field.title }}
          </div>
          <vuedraggable
            class="field-config-list"
            item-key="type"
            animation="300"
            :list="field.list"
            :group="{ name: 'form', pull: 'clone', put: false }"
            :sort="false"
            :clone="onClone"
          >
            <template #item="{ element: item, index }">
              <div class="label" @click="onFieldClick(item, index)">
                <img src="http://cdn.dooring.cn/dr/card%402x.png" />
                <span>{{ item.title || item.label }}</span>
              </div>
            </template>
          </vuedraggable>
        </template>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-space>
          <a-button type="primary">导入JSON</a-button>
          <a-button type="success" @click="onExport">导出JSON</a-button>
          <a-button type="warning">预览</a-button>
          <a-button>清空</a-button>
        </a-space>
      </a-layout-header>
      <a-layout-content>
        <widgetForm v-model:select="widgetFormSelect" :data="widgetForm" />
      </a-layout-content>
    </a-layout>
    <a-layout-sider class="form-designer-config" :width="360">
      <a-tabs v-model:activeKey="configTab" centered :tab-bar-gutter="100">
        <a-tab-pane key="field" tab="字段属性">
          <div class="widget-config">
            <FormConfig :data="widgetFormSelect" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="form" tab="表单属性">
          <div class="widget-config">
            <WidgetConfig :data="widgetForm" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-layout-sider>
    <!-- 导出JSON -->
    <a-drawer v-model:visible="visible" :width="600" placement="right">
      <v-editor :value="json" language="json" />
      <template #footer>
        <a-space>
          <a-button @click="onClose">取消</a-button>
          <a-button type="primary" @click="onSubmit">保存JSON</a-button>
        </a-space>
      </template>
    </a-drawer>
  </a-layout>
</template>
<script>
import _ from 'lodash';
import { onMounted, ref, watch } from 'vue';
import 'vue-json-pretty/lib/styles.css';
import vuedraggable from 'vuedraggable';
import WidgetForm from './widgetForm.vue';
import fieldConfig from './fieldConfig';
import FormConfig from './formConfig.vue';
import WidgetConfig from './widgetConfig.vue';

export default {
  components: {
    vuedraggable,
    WidgetForm,
    FormConfig,
    WidgetConfig,
  },
  setup() {
    const visible = ref(false);
    const configTab = ref('form');
    const widgetForm = ref({
      component: 'Form',
      size: 'default',
      layout: 'horizontal',
      labelAlign: 'right',
      labelCol: 6,
      wrapperCol: 18,
      colon: true,
      columns: [],
    });
    const json = ref();
    const widgetFormSelect = ref({});

    watch(
      () => widgetFormSelect.value,
      (val) => {
        if (configTab.value === 'form') {
          configTab.value = 'field';
        }
      },
      { deep: true },
    );

    const onClone = (obj) => {
      const newObj = Object.assign(_.cloneDeep(obj), {
        fieldId: `${obj.component}_${new Date().getTime()}`,
      });
      widgetFormSelect.value = newObj;
      return newObj;
    };
    const onFieldClick = (obj, index) => {
      const newObj = Object.assign(_.cloneDeep(obj), {
        fieldId: `${obj.component}_${new Date().getTime()}`,
      });
      widgetFormSelect.value = newObj;
      widgetForm.value.columns.push(newObj);
    };
    const onExport = () => {
      visible.value = true;
      json.value = JSON.stringify(widgetForm.value);
    };
    const onClose = () => {
      visible.value = false;
    };
    const onSubmit = () => {
      localStorage.setItem('json', json.value);
    };

    onMounted(() => {
      const _json = localStorage.getItem('json');
      if (_json) widgetForm.value = JSON.parse(_json);
    });

    return {
      visible,
      fieldConfig,
      configTab,
      widgetForm,
      widgetFormSelect,
      json,
      onClone,
      onFieldClick,
      onExport,
      onClose,
      onSubmit,
    };
  },
};
</script>
<style lang="less">
@import 'styles/index.less';
</style>
