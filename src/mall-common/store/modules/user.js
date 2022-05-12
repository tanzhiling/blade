import { Modal } from 'ant-design-vue';
import { ApiCaptcha, ApiLogin, ApiLogout } from '@mall-common/api/auth';
import cookies from '@mall-common/libs/cookies';
import store from '@mall-common/libs/store';
import router from '@mall-common/router';
import md5 from 'md5';

export default {
  namespaced: true,
  state: {
    // 验证码
    captcha: {},
    info: {}, // 用户信息
  },
  mutations: {
    setCaptcha(state, data) {
      state.captcha = data;
    },
  },
  actions: {
    getCaptcha: async ({ commit }) => {
      const data = await ApiCaptcha();
      commit('setCaptcha', data);
    },
    login: async ({ commit, dispatch }, payload) => {
      if (payload.password) {
        payload.password = md5(payload.password);
      }
      const data = await ApiLogin(payload);
      if (data.access_token) {
        store.set('userInfo', data);
        cookies.set('token', data.token_type + ' ' + data.access_token);
        return data;
      }
    },
    logout: async ({ commit, dispatch }, confirm = false) => {
      async function logout() {
        cookies.remove('token');
        localStorage.clear();
        router.push({ name: 'login' });
      }
      if (confirm) {
        Modal.confirm({
          title: '退出登录确认',
          content: '您确定退出登录当前账户吗?',
          onOk: () => {
            ApiLogout();
            logout();
          },
        });
      } else {
        logout();
      }
    },
    load: ({ state }) => {
      state.info = store.get('userInfo');
    },
  },
};
