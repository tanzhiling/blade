<template>
  <i :class="classes" :style="styles" />
</template>
<script>
export default {
  props: {
    type: String,
    size: [Number, String],
  },
  computed: {
    classes() {
      return 'iconfont ' + this.type;
    },
    styles() {
      return { 'font-size': this.size + 'px' };
    },
  },
};
</script>
