<template>
  <div v-if="subMenu?.length" class="v-layout-content-sub-sider">
    <div class="nav">
      <template v-for="(item, index) in subMenu" :key="index">
        <div v-if="item.category === 2" class="nav-group">
          <span v-if="item.source" class="icon">
            <v-icon :type="item.source" />
          </span>
          <span class="text"> {{ item.name }}</span>
        </div>
        <div v-else class="nav-item">
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
      </template>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { toRefs } from 'vue';
export default {
  setup() {
    const store = useStore();
    const { subMenu } = toRefs(store.state.menu);
    const onMenu = (menu) => {};
    return {
      subMenu,
      onMenu,
    };
  },
};
</script>
