<template>
  <div class="v-layout-header-trigger" @click="handleReload">
    <v-icon type="icon-reload" :size="20" />
  </div>
</template>
<script>
import { useStore } from 'vuex';
export default {
  name: 'IHeaderReload',
  setup() {
    const store = useStore();
    const handleReload = () => {
      store.dispatch('page/reload').then(() => {
        location.reload();
      });
    };
    return {
      handleReload,
    };
  },
};
</script>
