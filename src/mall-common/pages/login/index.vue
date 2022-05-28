<template>
  <div class="v-login">
    <div class="v-login-main">
      <div class="aside">
        <img src="@mall-common/assets/images/login-main.png" />
      </div>
      <div class="content">
        <div class="title">{{ Setting.loginTitle }}</div>
        <div class="form">
          <a-form :model="model" autocomplete="off" @finish="onFinish">
            <a-form-item name="username" :rules="[{ required: true, message: '请输入账号!' }]">
              <a-input v-model:value="model.username" placeholder="账号" size="large" />
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
              <a-input-password v-model:value="model.password" placeholder="密码" size="large" />
            </a-form-item>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  name="CaptchaCode"
                  :label-col="{ span: 8 }"
                  :rules="[{ required: true, message: '请输入验证码!' }]"
                >
                  <a-input v-model:value="model.CaptchaCode" placeholder="验证码" size="large" />
                </a-form-item>
              </a-col>
              <a-col :span="12" class="v-cursor">
                <img
                  v-if="captcha?.image"
                  :src="captcha?.image"
                  style="width: 120px"
                  @click="getCaptcha"
                />
              </a-col>
            </a-row>
            <a-form-item>
              <a-button type="primary" block size="large" html-type="submit" :loading="loading">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Setting from '@mall-common/config/setting';
import axios from 'axios';

import { onMounted, reactive, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const router = useRouter();
    const model = reactive({
      tenantId: '000000',
      grant_type: 'captcha',
      scope: 'all',
      type: 'account',
      username: 'admin',
      password: 'admin',
      CaptchaCode: '',
    });
    const captcha = computed(() => store.state.user.captcha);
    const getCaptcha = () => store.dispatch('user/getCaptcha');
    const logout = () => store.dispatch('user/logout');
    const onFinish = async () => {
      loading.value = true;
      try {
        const data = await store.dispatch('user/login', {
          ...model,
          CaptchaKey: captcha.value?.key,
        });
        if (data.access_token) {
          loading.value = false;
          router.push('/home');
        }
      } catch (e) {
        loading.value = false;
        getCaptcha();
      }
    };
    onMounted(() => {
      logout();
      getCaptcha();
    });
    return {
      loading,
      captcha,
      getCaptcha,
      Setting,
      model,
      onFinish,
    };
  },
};
</script>
<style lang="less">
@import './index.less';
</style>
