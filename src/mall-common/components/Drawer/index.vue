<template>
  <a-drawer v-bind="getBindValues" @close="onClose">
    <slot />
    <template #footer>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script>
import { ref } from 'vue';
export default {
  props: {
    title: String,
    width: {
      type: Number,
      default: 520,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['visible-change', 'ok', 'close', 'register'],
  setup(props, { attrs }) {
    const visibleRef = ref(false);
    const propsRef = ref(null);

    const loading = ref(false);

    function setDrawerProps(props) {
      propsRef.value = Object.assign(unref(propsRef), props);
      if (Reflect.has(props, 'visible')) {
        visibleRef.value = !!props.visible;
      }
    }

    const drawerInstance = {
      setDrawerProps: setDrawerProps,
      emitVisible: undefined,
    };

    const instance = getCurrentInstance();

    instance && emit('register', drawerInstance, instance.uid);

    const getProps = computed(() => {
      const opt = {
        placement: 'right',
        ...unref(attrs),
        visible: unref(visibleRef),
      };
      return opt;
    });

    const getBindValues = computed(() => {
      return {
        ...attrs,
        ...unref(getProps),
      };
    });

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal !== oldVal) visibleRef.value = newVal;
      },
      { deep: true },
    );

    watch(
      () => visibleRef.value,
      (visible) => {
        nextTick(() => {
          emit('visible-change', visible);
          instance && drawerInstance.emitVisible?.(visible, instance.uid);
        });
      },
    );

    // Cancel event
    const onClose = async () => {
      const { closeFunc } = unref(getProps);
      emit('close', e);
      if (closeFunc && isFunction(closeFunc)) {
        const res = await closeFunc();
        visibleRef.value = !res;
        return;
      }
      visibleRef.value = false;
    };

    const onSubmit = () => {};

    return {
      getBindValues,
      loading,
      onClose,
      onSubmit,
    };
  },
};
</script>
