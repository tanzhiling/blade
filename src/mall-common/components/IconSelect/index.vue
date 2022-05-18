<template>
  <a-input
    v-model:value="currentValue"
    class="v-icon-select-input"
    placeholder="请选择图标"
    allow-clear
    @click="visible = true"
  >
    <template #prefix>
      <v-icon :type="currentValue" :size="14" />
    </template>
  </a-input>
  <a-modal v-model:visible="visible" :width="1200" title="图标" :footer="null">
    <div class="v-icon-select-list">
      <div v-for="(item, index) in data" :key="index" @click="onClick(item)">
        <v-icon class="icon" :type="item" />
        <p class="name">{{ item }}</p>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { ref, watch, unref } from 'vue';
import data from '@mall-common/assets/fonts/antd.js';
export default {
  props: {
    value: String,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const visible = ref(false);
    const currentValue = ref();

    watch(
      () => currentValue.value,
      (val) => {
        emit('update:value', val);
      },
    );

    watch(
      () => props.value,
      (val) => {
        const { value } = unref(props);
        currentValue.value = value;
      },
      { immediate: true },
    );

    const onClick = (value) => {
      currentValue.value = value;
      visible.value = false;
    };

    return {
      visible,
      currentValue,
      data,
      onClick,
    };
  },
};
</script>
<style lang="less">
.v-icon-select-list {
  display: flex;
  flex-wrap: wrap;
  > div {
    position: relative;
    float: left;
    width: 14%;
    height: 100px;
    margin: 3px 0;
    padding: 10px 0 0;
    text-align: center;
    background-color: inherit;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    .icon {
      margin: 12px 0 8px;
      display: inline-block;
      font-size: 36px;
      height: 36px;
      transition: transform 0.3s ease-in-out;
      will-change: transform;
    }
    .name {
      margin-top: 5px;
    }
  }
  > div:hover {
    background-color: #1890ff;
    color: #fff;
  }
}
</style>
