import request from '@mall-common/libs/request';

// 顶部菜单
export const ApiTopMenu = (params) => {
  return request('/blade-system/menu/top-menu', {
    method: 'get',
    params,
  });
};

// 获取用户菜单路由
export const ApiMenuRoutes = (params) => {
  return request('/blade-system/menu/menu-list-by-user', {
    method: 'get',
    params,
  });
};

// 菜单列表
export const ApiGetMenuLazyList = (params) => {
  return request('/blade-system/menu/lazy-list', {
    method: 'get',
    params,
  });
};

// 保存菜单
export const ApiSaveMenu = (data) => {
  return request('/blade-system/menu/submit', {
    method: 'post',
    data,
  });
};

// 菜单树
export const ApiGetMenuTree = (params) => {
  return request('/blade-system/menu/tree', {
    method: 'get',
    params,
  });
};

// 删除菜单
export const ApiDelMenu = (data) => {
  return request('/blade-system/menu/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};
