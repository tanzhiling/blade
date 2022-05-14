<template>
  <a-row class="v-form">
    <a-col class="v-form-main" :class="getSearch.class">
      <a-form
        v-bind="getBindValue"
        ref="formRef"
        autocomplete="off"
        :model="model"
        @keypress.enter="onSubmit"
      >
        <a-row :gutter="24">
          <template v-for="(schema, index) in getSchema" :key="index">
            <template v-if="schema.component === 'Title'">
              <div class="v-title">{{ schema.label }}</div>
            </template>
            <template v-else>
              <a-col :span="schema.span || getBindValue.globalSpan">
                <a-form-item
                  :label-col="schema.labelCol"
                  :label="schema.label"
                  :name="schema.field"
                  :rules="schema.rules"
                >
                  <template v-if="schema.component === 'Input'">
                    <a-input v-model:value="model[schema.field]" allow-clear />
                  </template>
                  <template v-if="schema.component === 'Password'">
                    <a-input-password v-model:value="model[schema.field]" allow-clear />
                  </template>
                  <template v-if="schema.component === 'InputNumber'">
                    <a-input-number v-model:value="model[schema.field]" :min="0" :step="10" />
                  </template>
                  <template v-if="schema.component === 'TextArea'">
                    <a-textarea v-model:value="model[schema.field]" :rows="4" />
                  </template>
                  <template v-if="schema.component === 'Switch'">
                    <a-switch v-model:checked="model[schema.field]" />
                  </template>
                  <template v-if="schema.component === 'Select'">
                    <a-select v-model:value="model[schema.field]" allow-clear>
                      <a-select-option
                        v-for="(item, _index) in schema.options"
                        :key="_index"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </a-select-option>
                    </a-select>
                  </template>
                  <template v-if="schema.component === 'Radio'">
                    <a-radio-group v-model:value="model[schema.field]">
                      <a-radio
                        v-for="(item, _index) in schema.options"
                        :key="_index"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </a-radio>
                    </a-radio-group>
                  </template>
                  <template v-if="schema.component === 'TreeSelect'">
                    <a-tree-select
                      v-model:checked="model[schema.field]"
                      :tree-data="schema.treeData"
                      allow-clear
                    />
                  </template>
                </a-form-item>
              </a-col>
            </template>
          </template>
        </a-row>
      </a-form>
    </a-col>
    <a-col v-if="getSearch.search" class="v-form-extra">
      <a-space>
        <a-button type="primary" @click="onSubmit">
          <template #icon><v-icon type="icon-search" /></template>
          查询
        </a-button>
        <a-button class="ant-btn-reset" @click="onReset">
          <template #icon><v-icon type="icon-clear" /></template>
          重置
        </a-button>
        <slot name="extra" />
      </a-space>
    </a-col>
  </a-row>
</template>
<script>
import { ref, unref, computed, watch, onMounted } from 'vue';
import BasicProps from './props';
export default {
  props: BasicProps,
  emits: ['register'],
  setup(props, { emit }) {
    const model = ref({});
    const propsRef = ref({});
    const formRef = ref();
    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) };
    });

    const getBindValue = computed(() => {
      const {
        hideRequiredMark,
        scrollToFirstError,
        colon,
        labelAlign,
        labelCol,
        wrapperCol,
        labelWrap,
        globalSpan,
      } = unref(getProps);
      return {
        hideRequiredMark,
        scrollToFirstError,
        colon,
        labelAlign,
        labelCol,
        wrapperCol,
        labelWrap,
        globalSpan,
      };
    });

    const getSearch = computed(() => {
      const { search } = unref(getProps);
      return {
        class: search ? 'v-form-search' : '',
        search,
      };
    });

    const getSchema = computed(() => {
      const { schemas } = unref(getProps);
      return schemas;
    });

    const onSubmit = () => {
      const { onSearch } = unref(getProps);
      if (onSearch) onSearch(model.value);
    };

    const onReset = () => {
      const { onReset } = unref(getProps);
      formRef.value.resetFields();
      if (onReset) onReset(model.value);
    };

    function setProps(props) {
      propsRef.value = { ...unref(propsRef), ...props };
    }

    // 校验
    async function validate(nameList) {
      return await unref(formRef)?.validate(nameList);
    }

    async function validateFields(nameList) {
      return await unref(formRef)?.validateFields(nameList);
    }

    async function scrollToField(nameList, options) {
      return await unref(formRef)?.scrollToField(nameList, options);
    }

    async function resetFields(nameList) {
      model.value = {};
      unref(formRef)?.resetFields(nameList);
    }

    async function setFieldsValue(value) {
      model.value = { ...value };
    }

    async function clearValidate(name) {
      await unref(formRef)?.clearValidate(name);
    }

    const formActionType = {
      model,
      setProps,
      validate,
      validateFields,
      scrollToField,
      resetFields,
      setFieldsValue,
      clearValidate,
    };

    onMounted(() => {
      emit('register', formActionType);
    });

    return {
      formRef,
      getBindValue,
      getSearch,
      model,
      getSchema,
      onSubmit,
      onReset,
    };
  },
};
</script>
