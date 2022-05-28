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
            :clone="clone"
          >
            <template #item="{ element: item, index }">
              <div class="label" @click="handleFieldClick(item, index)">
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
          <a-button type="success" @click="handleExport">导出JSON</a-button>
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
      <vue-json-pretty :data="widgetForm" />
    </a-drawer>
  </a-layout>
</template>
<script>
import _ from 'lodash';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import vuedraggable from 'vuedraggable';
import WidgetForm from './widgetForm.vue';
import fieldConfig from './fieldConfig';
import FormConfig from './formConfig.vue';
import WidgetConfig from './widgetConfig.vue';
export default {
  components: { vuedraggable, VueJsonPretty, WidgetForm, FormConfig, WidgetConfig },
  data() {
    return {
      visible: false,
      fieldConfig,
      configTab: 'form',
      widgetForm: {
        component: 'Form',
        size: 'default',
        layout: 'horizontal',
        labelAlign: 'right',
        labelCol: 6,
        wrapperCol: 18,
        colon: true,
        column: [],
      },
      json: '',
      widgetFormSelect: {},
    };
  },
  watch: {
    widgetFormSelect: {
      handler() {
        if (this.configTab == 'form') {
          this.configTab = 'field';
        }
      },
      deep: true,
    },
  },
  methods: {
    clone(obj) {
      const newObj = Object.assign(_.cloneDeep(obj), {
        fieldId: `${obj.component}_${new Date().getTime()}`,
      });
      this.widgetFormSelect = newObj;
      return newObj;
    },
    handleFieldClick(obj, index) {
      const newObj = Object.assign(_.cloneDeep(obj), {
        fieldId: `${obj.component}_${new Date().getTime()}`,
      });
      this.widgetFormSelect = newObj;
      this.widgetForm.column.push(newObj);
    },
    handleExport() {
      this.visible = true;
      this.json = JSON.stringify(this.widgetForm);
    },
  },
};
</script>
<style lang="less">
@import 'styles/index.less';
</style>
