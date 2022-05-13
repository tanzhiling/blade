import request from '@mall-common/libs/request';

// 角色列表
export const ApiGetRoleList = (params) => {
  return request('/blade-system/role/list', {
    method: 'get',
    params,
  });
};

// 保存角色
export const ApiSaveRole = (data) => {
  return request('/blade-system/role/submit', {
    method: 'post',
    data,
  });
};

// 删除角色
export const ApiDelRole = (data) => {
  return request('/blade-system/role/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};

// 角色授权菜单
export const ApiGrantRole = (data) => {
  return request('/blade-system/role/grant', {
    method: 'post',
    data,
  });
};
