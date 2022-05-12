<template>
  <a-layout-header class="v-layout-header">
    <Collapse />
    <Menu />
    <div class="v-layout-header-right">
      <Notice />
      <Fullscreen />
      <User />
    </div>
  </a-layout-header>
</template>
<script>
import Collapse from './components/collapse.vue';
import Menu from './components/menu.vue';
import Notice from './components/notice.vue';
import Fullscreen from './components/fullscreen.vue';
import User from './components/user.vue';
export default {
  components: {
    Collapse,
    Menu,
    Notice,
    Fullscreen,
    User,
  },
  setup() {},
};
</script>
