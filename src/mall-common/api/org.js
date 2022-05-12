import request from '@mall-common/libs/request';

// 机构分页
export const ApiGetOrgPage = (params) => {
  return request('/blade-system/dept/list', {
    method: 'get',
    params,
  });
};

// 机构列表
export const ApiGetOrgLazyList = (params) => {
  return request('/blade-system/dept/lazy-list', {
    method: 'get',
    params,
  });
};

export const ApiGetOrgLazyTree = (params) => {
  return request('/blade-system/dept/lazy-tree', {
    method: 'get',
    params,
  });
};

// 机构树
export const ApiGetOrgTree = (params) => {
  return request('/blade-system/dept/tree', {
    method: 'get',
    params,
  });
};

// 保存机构
export const ApiSaveOrg = (data) => {
  return request('/blade-system/dept/submit', {
    method: 'post',
    data,
  });
};

// 删除机构
export const ApiDelOrg = (data) => {
  return request('/blade-system/dept/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};
