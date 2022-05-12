<template>
  <a-layout class="v-layout">
    <Sider />
    <a-layout>
      <Header />
      <a-layout-content class="v-layout-content">
        <SubSider />
        <div class="v-layout-content-main">
          <router-view v-slot="{ Component }">
            <template v-if="Component">
              <transition name="fade-transform" mode="out-in" appear>
                <component :is="Component" :key="$route.fullPath" />
              </transition>
            </template>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from 'vue';
import Sider from './sider/index.vue';
import Header from './header/index.vue';
import SubSider from './subSider/index.vue';
export default {
  components: { Header, Sider, SubSider },
  setup() {
    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
    };
  },
};
</script>
