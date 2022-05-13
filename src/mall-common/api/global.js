import request from '@mall-common/libs/request';

// 获取字典
export const ApiGetDict = (params) => {
  return request('/blade-system/dict/dictionary', {
    method: 'get',
    params,
  });
};
