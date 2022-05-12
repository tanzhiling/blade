<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    watch(route, (to, from) => {
      if (to.path !== '/login') {
        store.dispatch('user/load');
        store.dispatch('menu/updatePath', to);
      }
    });
    return {
      locale: zhCN,
    };
  },
};
</script>
