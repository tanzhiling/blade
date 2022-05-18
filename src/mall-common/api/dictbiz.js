import request from '@mall-common/libs/request';

// 分页
export const ApiGetDictPage = (params) => {
  return request('/blade-system/dict-biz/parent-list', {
    method: 'get',
    params,
  });
};

// 保存
export const ApiSaveDict = (data) => {
  return request('/blade-system/dict-biz/submit', {
    method: 'post',
    data,
  });
};

// 删除
export const ApiDelDict = (data) => {
  return request('/blade-system/dict-biz/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};

// 字典
export const ApiGetDictData = (params) => {
  return request('/blade-system/dict-biz/child-list', {
    method: 'get',
    params,
  });
};
