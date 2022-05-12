<template>
  <span :class="className" v-bind="$attrs">
    <template v-if="icon">
      <v-icon :type="icon" />
    </template>
    <slot />
  </span>
</template>
<script>
export default {
  props: {
    type: String,
    size: String,
    // 图标样式
    icon: String,
  },
  computed: {
    className() {
      const type = this.type ? 'v-btn-' + this.type : '';
      const size = this.size ? 'v-btn-' + this.size : '';
      return ['v-btn', type, size];
    },
  },
};
</script>
