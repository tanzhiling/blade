import request from '@mall-common/libs/request';

// 分页
export const ApiGetParamPage = (params) => {
  return request('/blade-system/param/list', {
    method: 'get',
    params,
  });
};

// 保存
export const ApiSaveParam = (data) => {
  return request('/blade-system/param/submit', {
    method: 'post',
    data,
  });
};

// 删除
export const ApiDelParam = (data) => {
  return request('/blade-system/param/remove', {
    method: 'post',
    data,
    requestType: 'form',
  });
};
