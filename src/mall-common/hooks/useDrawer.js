import {
  ref,
  getCurrentInstance,
  unref,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
  computed,
} from 'vue';
import { isProdMode } from '../libs/env';

const dataTransferRef = reactive({});

const visibleData = reactive({});

export const useDrawer = () => {
  if (!getCurrentInstance()) {
    throw new Error('useDrawer() can only be used inside setup() or functional components!');
  }
  const drawer = ref(null);
  const loaded = ref(false);
  const uid = ref('');

  function register(drawerInstance, uuid) {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawer.value = null;
        loaded.value = null;
        dataTransferRef[unref(uid)] = null;
      });

    if (unref(loaded) && isProdMode() && drawerInstance === unref(drawer)) {
      return;
    }
    uid.value = uuid;
    drawer.value = drawerInstance;
    loaded.value = true;

    drawerInstance.emitVisible = (visible, uid) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      error('useDrawer instance is undefined!');
    }
    return instance;
  };

  const methods = {
    setDrawerProps: (props) => {
      getInstance()?.setDrawerProps(props);
    },

    getVisible: computed(() => {
      return visibleData[~~unref(uid)];
    }),

    openDrawer: (visible = true, data, openOnSet = true) => {
      getInstance()?.setDrawerProps({
        visible: visible,
      });
      if (!data) return;

      if (openOnSet) {
        dataTransferRef[unref(uid)] = null;
        dataTransferRef[unref(uid)] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data));
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data);
      }
    },
    closeDrawer: () => {
      getInstance()?.setDrawerProps({ visible: false });
    },
  };

  return [register, methods];
};

export const useDrawerInner = (callbackFn) => {
  const drawerInstanceRef = ref(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref('');

  if (!getCurrentInstance()) {
    throw new Error('useDrawerInner() can only be used inside setup() or functional components!');
  }

  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      error('useDrawerInner instance is undefined!');
      return;
    }
    return instance;
  };

  const register = (modalInstance, uuid) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawerInstanceRef.value = null;
      });

    uidRef.value = uuid;
    drawerInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  const methods = {
    changeLoading: (loading = true) => {
      getInstance()?.setDrawerProps({ loading });
    },

    changeOkLoading: (loading = true) => {
      getInstance()?.setDrawerProps({ confirmLoading: loading });
    },
    getVisible: computed(() => {
      return visibleData[~~unref(uidRef)];
    }),

    closeDrawer: () => {
      getInstance()?.setDrawerProps({ visible: false });
    },

    setDrawerProps: (props) => {
      getInstance()?.setDrawerProps(props);
    },
  };

  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [register, methods];
};
