import axios from 'axios';
import qs from 'qs';
import { Modal } from 'ant-design-vue';
import cookies from './cookies';
import Setting from '@mall-common/config/setting';

const service = axios.create({
  baseURL: '',
  headers: {
    Authorization: Setting.Authorization,
  },
  credentials: 'include', // 默认请求是否带上cookie
});

service.interceptors.request.use(
  (config) => {
    const data = qs.parse(config.data);
    const token = cookies.get('token');
    if (data && data.CaptchaKey && data.CaptchaCode) {
      config.headers['captcha-key'] = data.CaptchaKey;
      config.headers['captcha-code'] = data.CaptchaCode;
    }
    if (token) {
      config.headers['blade-auth'] = token;
    }
    if (config.requestType === 'form') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      config.data = qs.stringify(config.data);
    }
    if (config.requestType === 'file') {
      config.headers['content-type'] = 'multipart/form-data';
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const success = res.success || true;
    const message = res.msg || res.error_description || '未知错误';
    if (response.headers['content-disposition']) {
      return response;
    }
    if (!success || res.error_code === 400) {
      const timer = setTimeout(() => {
        Modal.error({
          title: '错误信息',
          content: message,
          onOk: () => clearTimeout(timer),
        });
      }, 1000);
      return Promise.reject(new Error(message));
    }
    return res;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = err.response.data.error_description || err.response.data.msg || '请求错误';
          break;
        case 401:
          err.message = '登录信息已失效，请重新登录！';
          break;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '网关错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
    }
    Modal.error({
      title: '提示',
      content: err.message,
      onOk: () => {
        if (err.response.status === 401) {
          window.location.href = '/login';
        }
      },
    });
    return Promise.reject(new Error(err));
  },
);

export default service;
