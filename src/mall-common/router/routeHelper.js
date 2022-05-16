const modules = import.meta.glob('../../mall-**/pages/**/*.vue');

// 生成路由
export function createRoute(item) {
  const route = {
    path: item.path,
    name: item.code,
    component: dynamicImport(modules, item.page),
  };
  const meta = {
    title: item.name,
    auth: true,
    closable: true,
    showTab: true,
    icon: item.icon,
    parentId: item.parentId,
  };
  route.meta = meta;
  return route;
}

// 获取请求菜单 生成路由
export function getRequestRoutes(data) {
  let arr = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (item.page) arr.push(createRoute(item));
      if (item.children && item.children.length > 0) {
        arr = arr.concat(getRequestRoutes(item.children));
      }
    });
  }
  return arr;
}

// 页面动态导入
export function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../../mall-', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
  }
}
