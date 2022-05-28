export function ListToTree(data, parentId) {
  const tree = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (item.parentId === parentId) {
        item.children = ListToTree(data, item.id).sort((a, b) => b.sort - a.sort);
        tree.push(item);
      }
    });
  }
  return tree;
}

// 获取请求菜单 生成菜单
export function getRequestMenus(data) {
  let menu = [];
  if (Array.isArray(data)) {
    const list = data.filter((item) => item.category < 3);
    menu = ListToTree(list, '0').sort((a, b) => b.sort - a.sort);
  }
  return menu;
}
