import request from '@mall-common/libs/request';

export const ApiLogin = (data) => {
  return request('/blade-auth/oauth/token', {
    method: 'post',
    data,
    requestType: 'form',
  });
};

export const ApiLogout = (params) => {
  return request('/blade-auth/oauth/logout', {
    method: 'get',
    params,
  });
};

export const ApiCaptcha = (params) => {
  return request('/blade-auth/oauth/captcha', {
    method: 'get',
    params,
  });
};
