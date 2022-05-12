<template>
  <div class="v-layout-header-trigger" @click="updateCollapsed(!collapsed)">
    <v-icon type="icon-menu" :class="iconClass" :size="20" />
  </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const collapsed = computed(() => store.state.layout.collapsed);
    return {
      collapsed,
      iconClass: computed(() => collapsed.value && 'rotate'),
      updateCollapsed: (data) => store.commit('layout/updateCollapsed', data),
    };
  },
};
</script>
