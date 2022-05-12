<template>
  <div class="v-layout-header-trigger" @click="handleFullscreen(!fullscreen)">
    <v-icon v-show="!fullscreen" type="icon-expend" :size="20" />
    <v-icon v-show="fullscreen" type="icon-compress" :size="20" />
  </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const fullscreen = computed(() => store.state.layout.fullscreen);
    const handleFullscreen = (data) => store.dispatch('layout/toggleFullscreen', data);
    return {
      fullscreen,
      handleFullscreen,
    };
  },
};
</script>
