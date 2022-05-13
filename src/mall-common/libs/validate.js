/**
 * @description 密码校验 不能是纯数字 或者纯字母 小于 16位
 */
export const validatePwd = (rule, value) => {
  if (!value) {
    return Promise.reject('密码不得为空');
  }
  if (value && value.length < 8) {
    return Promise.reject('密码长度不得小于8位');
  }
  if (value && value.length > 18) {
    return Promise.reject('密码长度不得大于16位');
  }
  if (/^[0-9]{7,17}$/.test(value)) {
    return Promise.reject('密码不得是纯数字');
  }
  if (/^[a-zA-Z]{7,17}$/.test(value)) {
    return Promise.reject('密码不得是纯字母');
  }
  return Promise.resolve();
};
