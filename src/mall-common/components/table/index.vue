<template>
  <div>
    <a-table ref="tableElRef" v-bind="getBindValues" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-for="item in renderSlots">
          <slot v-if="column.dataIndex === item" :name="item" v-bind="{ record }"></slot>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import { ref, unref, useSlots, computed } from 'vue';
import useScroll from './useScroll';
import BasicProps from './props';
import useDataSource from './useDataSource';

export default {
  props: BasicProps,
  emits: ['register'],
  setup(props, { emit }) {
    const slots = useSlots();
    const renderSlots = Object.keys(slots);
    const tableElRef = ref();
    const innerPropsRef = ref();

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) };
    });

    const { loading, dataSource, pagination, reload, handleTableChange } = useDataSource(getProps);

    const { getScrollRef, redoHeight } = useScroll(getProps, tableElRef, dataSource);

    const getBindValues = computed(() => {
      const { isPage } = unref(getProps);
      return {
        ...unref(getProps),
        scroll: unref(getScrollRef),
        loading: unref(loading),
        dataSource: unref(dataSource),
        pagination: isPage ? unref(pagination) : false,
      };
    });

    function setProps(props) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props };
    }

    const tableAction = {
      reload,
      setProps,
      redoHeight,
    };

    emit('register', tableAction);

    return {
      tableElRef,
      handleTableChange,
      renderSlots,
      getBindValues,
    };
  },
};
</script>
