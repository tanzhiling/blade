<template>
  <a-dropdown placement="bottomRight">
    <div class="v-layout-header-trigger">
      <a-avatar :src="info?.avatar" size="32" class="v-mr" />
      <span>{{ info?.nick_name }}</span>
    </div>
    <template #overlay>
      <a-menu @click="onMenuClick">
        <a-menu-item key="info">
          <v-icon type="icon-user" />
          个人中心
        </a-menu-item>
        <a-menu-item key="logout">
          <v-icon type="icon-logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const onMenuClick = ({ item, key }) => {
      if (key === 'logout') {
        store.dispatch('user/logout', { confirm: true });
      }
    };
    return {
      info: computed(() => store.state.user.info),
      onMenuClick,
    };
  },
};
</script>
