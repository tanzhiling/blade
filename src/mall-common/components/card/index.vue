<template>
  <div class="v-card">
    <div class="v-card-header">
      <slot name="title">
        <div class="v-card-header-title">
          {{ currentTitle }}
        </div>
      </slot>
      <div class="v-card-header-extra">
        <template v-if="actions && actions.length > 0">
          <a-space>
            <a-button v-for="(item, index) in actions" :key="index" @click="item.onClick">
              {{ item.text }}
            </a-button>
          </a-space>
        </template>
        <slot name="extra">
          <v-icon v-if="close" class="v-cursor" type="icon-close" :size="20" />
        </slot>
      </div>
    </div>
    <slot name="content">
      <div class="v-card-content">
        <slot></slot>
      </div>
    </slot>
  </div>
</template>
<script>
import { computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
export default {
  props: {
    title: String,
    close: Boolean,
    // 固定高度
    fixedHeight: {
      type: Boolean,
      default: true,
    },
    actions: Array,
  },
  setup(props) {
    const { title } = toRefs(props);
    const route = useRoute();
    const currentTitle = computed(() => title.value || route.meta.title);
    return {
      currentTitle,
    };
  },
};
</script>
