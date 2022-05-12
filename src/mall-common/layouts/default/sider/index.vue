<template>
  <a-layout-sider class="v-layout-sider" :width="120" :trigger="null">
    <div class="logo">
      <span v-if="!collapsed">{{ Setting.layoutTitle }}</span>
    </div>
    <div class="nav">
      <div v-for="(item, index) in menu" :key="index" class="nav-item">
        <a
          class="nav-item-link"
          :class="item.code === headerName ? 'nav-item-active' : ''"
          @click="onMenu(item)"
        >
          <span class="icon">
            <v-icon v-if="item.source" :type="item.source" />
          </span>
          <span class="text">{{ item.name }}</span>
        </a>
      </div>
    </div>
    <!-- <a-menu
      class="v-layout-sider-menu"
      theme="dark"
      mode="inline"
      :open-keys="openNames"
      :selected-keys="[activePath]"
    >
      <template v-for="(item, index) in sider">
        <template v-if="item.children === undefined || !item.children.length">
          <i-menu-item :key="index" :menu="item" />
        </template>
        <template v-else>
          <i-menu-submenu :key="index" :menu="item" />
        </template>
      </template>
    </a-menu> -->
  </a-layout-sider>
</template>
<script>
import Setting from '@mall-common/config/setting';
import { useStore } from 'vuex';
import { toRefs, unref } from 'vue';
export default {
  setup() {
    const store = useStore();
    const { collapsed } = toRefs(store.state.layout);
    const { menu, headerName } = toRefs(store.state.menu);
    const onMenu = (item) => {
      console.log(item);
      store.commit('menu/setHeaderName', item.code);
      if (item.children && item.children.length > 0) {
        store.commit('menu/setSubMenu', item.children);
      }
    };
    return {
      Setting,
      collapsed,
      menu,
      onMenu,
      headerName,
    };
  },
};
</script>
