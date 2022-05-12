import request from '@mall-common/libs/request';

// 用户分页
export const ApiGetUserPage = (params) => {
  return request('/blade-user/page', {
    method: 'get',
    params,
  });
};

// 用户详情
export const ApiGetUserDetail = (params) => {
  return request('/blade-user/detail', {
    method: 'get',
    params,
  });
};

// 新增用户
export const ApiSaveUser = (data) => {
  return request('/blade-user/submit', {
    method: 'post',
    data,
  });
};

// 更新用户
export const ApiUpdateUser = (data) => {
  return request('/blade-user/update', {
    method: 'post',
    data,
  });
};

// 删除用户
export const ApiDelUser = (data) => {
  return request('/blade-user/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};

// 重置密码
export const ApiResetPwd = (data) => {
  return request('/blade-user/reset-password', {
    method: 'post',
    data,
    requestType: 'form',
  });
};
