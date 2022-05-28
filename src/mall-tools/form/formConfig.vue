<template>
  <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" label-align="left">
    <a-collapse expand-icon-position="right">
      <a-collapse-panel key="form" header="基本属性">
        <a-form-item label="表单栅格" name="span">
          <a-input-number v-model:value="model.span" :min="0" :max="24" />
        </a-form-item>
        <a-form-item label="标签名称" name="label">
          <a-input v-model:value="model.label" />
        </a-form-item>
        <FormProps v-if="data.formProps" :data="data.formProps" />
      </a-collapse-panel>
      <a-collapse-panel v-if="data.componentProps" key="component" header="组件属性">
        <ComponentProps :data="data.componentProps" :component="data.component" />
      </a-collapse-panel>
      <a-collapse-panel v-if="data.dataProps" key="data" header="数据属性">
        <DataProps :data="data.dataProps" />
      </a-collapse-panel>
      <a-collapse-panel v-if="data.eventProps" key="event" header="事件属性">
        <EventProps :data="data.eventProps" />
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script lang="jsx">
import { ref, unref, watch } from 'vue';
import FormProps from './props/formProps.vue';
import ComponentProps from './props/componentProps.vue';
import DataProps from './props/dataProps.vue';
import EventProps from './props/eventProps.vue';
export default {
  components: { FormProps, ComponentProps, DataProps, EventProps },
  props: {
    data: Object,
  },
  setup(props) {
    const model = ref();
    watch(
      () => props.data,
      (val) => {
        const { data } = unref(props);
        model.value = data;
      },
      { immediate: true },
    );
    return { model };
  },
};
</script>
