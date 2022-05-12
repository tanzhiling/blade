<template>
  <a-sub-menu>
    <template #icon>
      <v-icon v-if="menu.source" :type="menu.source" />
    </template>
    <template #title>
      {{ menu.name }}
    </template>
    <template v-for="(item, index) in menu.children">
      <template v-if="item.children === undefined || !item.children.length">
        <i-menu-item :key="index" :menu="item" />
      </template>
      <template v-else>
        <i-menu-submenu :key="index" :menu="item" />
      </template>
    </template>
  </a-sub-menu>
</template>
<script>
import iMenuItem from './menu-item.vue';
export default {
  name: 'IMenuSubmenu',
  components: { iMenuItem },
  props: {
    menu: Object,
  },
};
</script>
