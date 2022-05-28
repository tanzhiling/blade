<template>
  <component :is="component" :data="data"></component>
</template>
<script>
import componentConfig from '../components/config';
export default {
  components: componentConfig,
  props: {
    component: String,
    data: Object,
  },
};
</script>
