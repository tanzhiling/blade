<template>
  <div class="form-designer-content" :style="{ padding: data.padding + 'px' }">
    <a-form
      class="widget-form"
      v-bind="data"
      :label-col="{ span: data.labelCol }"
      :wrapper-col="{ span: data.wrapperCol }"
    >
      <vuedraggable
        class="widget-form-draggable ant-row"
        :list="data.column"
        group="form"
        item-key="fieldId"
        animation="300"
      >
        <template #item="{ element, index }">
          <a-col
            class="widget-form-col"
            :class="selectWidget.fieldId === element.fieldId ? 'widget-form-col-active' : ''"
            :span="element.span"
            @click="onFieldClick(element)"
          >
            <WidgetFormItem
              :data="element"
              :label-col="data.labelCol"
              :wrapper-col="data.wrapperCol"
            />
            <WidgetAction
              v-if="selectWidget.fieldId === element.fieldId"
              @copy="onCopy(element, index)"
              @remove="onRemove(element, index)"
            />
          </a-col>
        </template>
      </vuedraggable>
    </a-form>
  </div>
</template>
<script>
import _ from 'lodash';
import { ref, unref, watch } from 'vue';
import vuedraggable from 'vuedraggable';
import WidgetFormItem from './widgetFormItem.vue';
import WidgetAction from './widgetAction.vue';
export default {
  components: { vuedraggable, WidgetFormItem, WidgetAction },
  props: {
    data: Object,
    select: Object,
  },
  emits: ['update:select'],
  setup(props, { emit }) {
    const selectWidget = ref();

    watch(
      () => props.select,
      (val) => {
        selectWidget.value = val;
      },
      { immediate: true },
    );

    watch(
      () => selectWidget.value,
      (val) => {
        emit('update:select', val);
      },
    );

    const onFieldClick = (value) => {
      selectWidget.value = value;
    };

    const onCopy = (field, index) => {
      const { data } = unref(props);
      const newObj = Object.assign(_.cloneDeep(field), {
        fieldId: `${field.component}_${new Date().getTime()}`,
      });
      data.column.splice(index, 0, newObj);
    };

    const onRemove = (field, index) => {
      const { data } = unref(props);
      data.column.splice(index, 1);
    };

    return {
      selectWidget,
      onFieldClick,
      onCopy,
      onRemove,
    };
  },
};
</script>
