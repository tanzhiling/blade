import Setting from '@mall-common/config/setting';

const store = {};

const keyName = Setting.storeKey + '-';

store.set = function (key, data, session) {
  const name = keyName + key;
  const content = {
    dataType: typeof data,
    data: data,
    session: session,
  };
  if (session) {
    window.sessionStorage.setItem(name, JSON.stringify(content));
  } else {
    window.localStorage.setItem(name, JSON.stringify(content));
  }
};

// 获取
store.get = function (key, session) {
  const name = keyName + key;
  let content = {};
  let contentStr = '';
  if (session) {
    contentStr = window.sessionStorage.getItem(name);
  } else {
    contentStr = window.localStorage.getItem(name);
  }
  if (!contentStr) return;
  content = JSON.parse(contentStr);
  return content.data;
};

// 清空指定字段存储
store.remove = function (key, session) {
  const name = keyName + key;
  if (session) {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }
};

// 清空所有存储
store.clear = function (session) {
  if (session) {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear();
  }
};

export default store;
