<template>
  <a-form
    v-bind="getBindValue"
    ref="formRef"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <a-row v-bind="getRow">
      <FormItem
        v-for="schema in getSchema"
        :key="schema.field"
        :schema="schema"
        :form-props="getProps"
        :form-model="formModel"
        :set-form-model="setFormModel"
      />
      <a-button @click="handleSearch">查询</a-button>
    </a-row>
  </a-form>
</template>
<script>
import { ref, reactive, unref, computed, onMounted, watch } from 'vue';
import BasicProps from './props';
import FormItem from './form-item.vue';
export default {
  components: { FormItem },
  props: BasicProps,
  setup(props, { attrs, emit }) {
    const formModel = reactive({});
    const propsRef = ref({});

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) };
    });

    const getRow = computed(() => {
      const { rowProps } = unref(getProps);
      return {
        ...rowProps,
      };
    });

    const getBindValue = computed(() => {
      return {
        ...props,
        ...unref(getProps),
      };
    });

    const getSchema = computed(() => {
      const { schemas } = unref(getProps);
      // for (const schema of schemas) {
      //   const { defaultValue, component } = schema;
      //   // handle date type
      //   if (defaultValue && dateItemType.includes(component)) {
      //     if (!Array.isArray(defaultValue)) {
      //       schema.defaultValue = dateUtil(defaultValue);
      //     } else {
      //       const def: moment.Moment[] = [];
      //       defaultValue.forEach((item) => {
      //         def.push(dateUtil(item));
      //       });
      //       schema.defaultValue = def;
      //     }
      //   }
      // }
      // if (unref(getProps).showAdvancedButton) {
      //   return schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[];
      // } else {

      // }
      return schemas;
    });

    const handleEnterPress = () => {};

    const handleSearch = () => {
      console.log('formModel', formModel);
    };

    const setFormModel = (key, e) => {
      formModel[key] = e.target.value;
    };

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        Object.assign(formModel, model);
      },
      {
        immediate: true,
      }
    );

    function setProps(props) {
      propsRef.value = { ...unref(propsRef), ...props };
    }

    const formActionType = {
      setProps,
    };

    onMounted(() => {
      emit('register', formActionType);
    });

    return {
      getProps,
      getRow,
      getBindValue,
      getSchema,
      formModel,
      setFormModel,
      handleSearch,
      handleEnterPress,
    };
  },
};
</script>
