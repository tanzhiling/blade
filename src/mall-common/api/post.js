import request from '@mall-common/libs/request';

// 岗位分页
export const ApiGetRostPage = (params) => {
  return request('/blade-system/post/list', {
    method: 'get',
    params,
  });
};

// 新增岗位
export const ApiSavePost = (data) => {
  return request('/blade-system/post/submit', {
    method: 'post',
    data,
  });
};

// 删除岗位
export const ApiDelPost = (data) => {
  return request('/blade-system/post/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};

// 岗位查询 下拉数据源
export const ApiGetPostSelect = (params) => {
  return request('/blade-system/post/select', {
    method: 'get',
    params,
  });
};
