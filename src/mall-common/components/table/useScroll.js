import { computed, unref, ref, nextTick } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import onMountedOrActivated from '@mall-common/hooks/onMountedOrActivated';
import useWindowSizeFn from '@mall-common/hooks/useWindowSizeFn';

const useTableScroll = (propsRef, tableElRef) => {
  const tableHeightRef = ref(null);

  const setHeight = (heigh) => {
    tableHeightRef.value = heigh;
  };

  let bodyEl;

  const calcTableHeight = () => {
    const { isPage } = unref(propsRef);
    const table = unref(tableElRef);
    if (!table) return;
    const tableEl = table.$el;
    if (!tableEl) return;
    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.ant-table-body');
      if (!bodyEl) return;
    }
    const { top } = tableEl.getBoundingClientRect();
    const tablePadding = 32;
    const paginationHeight = isPage ? 34 : 0;
    const headerHeight = 43;
    const currentHeight =
      document.body.clientHeight - top - headerHeight - tablePadding - paginationHeight;
    bodyEl.style.height = currentHeight + 'px';
    setHeight(currentHeight);
  };

  const redoHeight = () => {
    nextTick(() => {
      calcTableHeight();
    });
  };

  const getScrollRef = computed(() => {
    const tableHeight = unref(tableHeightRef);
    const { scroll } = unref(propsRef);
    return {
      y: tableHeight || 'auto',
      ...scroll,
    };
  });

  const debounceRedoHeight = useDebounceFn(redoHeight, 100);

  useWindowSizeFn(calcTableHeight, 280);

  onMountedOrActivated(() => {
    calcTableHeight();
    nextTick(() => {
      debounceRedoHeight();
    });
  });

  return { getScrollRef, redoHeight };
};

export default useTableScroll;
