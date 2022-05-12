import { ApiMenuRoutes } from '@mall-common/api/menu';
import { getRequestRoutes } from '@mall-common/router/routeHelper';

export default {
  namespaced: true,
  state: {
    // 一级菜单
    menu: [],
    // 当前顶栏菜单的 name
    headerName: '',
    // 二级菜单
    subMenu: [],
    // 当前所在菜单的 path
    activePath: '',
    // 展开的子菜单 name 集合
    openNames: [],
    // 路由集合
    routes: [],
  },
  mutations: {
    setMenu(state, menu) {
      state.menu = menu;
    },
    setHeaderName(state, name) {
      state.headerName = name;
    },
    setSubMenu(state, subMenu) {
      state.subMenu = subMenu;
    },
    setActivePath(state, path) {
      state.activePath = path;
    },
    setOpenNames(state, names) {
      state.openNames = names;
    },
    setRoutes(state, names) {
      state.routes = names;
    },
  },
  actions: {
    generateRoutes: async ({ commit, state }) => {
      return new Promise((resolve) => {
        if (state.routes.length === 0) {
          ApiMenuRoutes().then((res) => {
            const { success, data } = res;
            if (success) {
              state.routes = data;
            }
            const routes = getRequestRoutes(state.routes);
            commit('setMenu', data);
            commit('setSubMenu', data[0].children);
            commit('setRoutes', routes);
            resolve(routes);
          });
        }
      });
    },
    updatePath: async ({ commit }, route) => {
      const { path, meta } = route;
      if (path) commit('setActivePath', route.path);
      if (meta?.header) commit('setHeaderName', meta.header);
    },
  },
};
