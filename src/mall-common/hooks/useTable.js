import { ref, onUnmounted, unref, watch } from 'vue';
import { isProdMode, getDynamicProps } from '../libs/env';

const useTable = (tableProps) => {
  const tableRef = ref(null);
  const loadedRef = ref(false);
  let stopWatch;

  function register(instance) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null;
        loadedRef.value = null;
      });

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return;

    tableRef.value = instance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;

    stopWatch?.();

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  function getTableInstance() {
    const table = unref(tableRef);
    if (!table) {
      console.error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!',
      );
    }
    return table;
  }

  const methods = {
    reload: async (opt) => {
      getTableInstance().reload(opt);
    },
    setProps: (props) => {
      getTableInstance().setProps(props);
    },
    redoHeight: () => {
      getTableInstance().redoHeight();
    },
  };

  return [register, methods];
};

export default useTable;
