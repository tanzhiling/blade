import request from '@mall-common/libs/request';

// 字典分页
export const ApiGetDictPage = (params) => {
  return request('/blade-system/dict/parent-list', {
    method: 'get',
    params,
  });
};

// 保存字典
export const ApiSaveDict = (data) => {
  return request('/blade-system/dict/submit', {
    method: 'post',
    data,
  });
};

// 删除字典
export const ApiDelDict = (data) => {
  return request('/blade-system/dict/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};

// 字典明细
export const ApiGetDictData = (params) => {
  return request('/blade-system/dict/child-list', {
    method: 'get',
    params,
  });
};
