<template>
  <a-dropdown class="v-layout-header-notice" :trigger="['click']" placement="bottomRight">
    <div class="v-layout-header-trigger">
      <v-icon type="icon-bell" :size="20" />
    </div>
    <template #overlay>
      <a-menu class="v-layout-header-notice-menu">
        <a-tabs active-key="1" centered>
          <a-tab-pane key="1" tab="通知">
            <div class="v-p">通知</div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="消息">
            <div class="v-p">消息</div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="已办">
            <div class="v-p">已办</div>
          </a-tab-pane>
        </a-tabs>
      </a-menu>
    </template>
  </a-dropdown>
</template>
