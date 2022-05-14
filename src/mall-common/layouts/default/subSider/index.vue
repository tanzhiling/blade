<template>
  <div class="v-layout-content-sub-sider">
    <div class="nav">
      <div v-for="(item, index) in subMenu" :key="index" class="nav-item">
        <router-link :to="item.path" class="nav-item-link" active-class="nav-item-active">
          <span v-if="item.source" class="icon">
            <v-icon :type="item.source" />
          </span>
          <span class="text"> {{ item.name }}</span>
          <span>
            <v-icon type="icon-caret-right" />
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { toRefs } from 'vue';
export default {
  setup() {
    const store = useStore();
    const { subMenu, activePath } = toRefs(store.state.menu);
    const onMenu = (menu) => {
      console.log('menu', menu);
    };
    return {
      subMenu,
      onMenu,
    };
  },
};
</script>
