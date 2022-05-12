<template>
  <a-menu-item @click="onClick(menu.path)">
    <template #icon>
      <v-icon v-if="menu.source" :type="menu.source" />
    </template>
    {{ menu.name }}
  </a-menu-item>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
  props: {
    menu: Object,
  },
  setup() {
    const router = useRouter();
    const onClick = (path) => {
      router.push({ path });
    };
    return {
      onClick,
    };
  },
};
</script>
