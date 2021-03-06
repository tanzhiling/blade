import { ApiMenuRoutes } from '@mall-common/api/menu';
import { getRequestRoutes } from '@mall-common/router/routeHelper';
import { getRequestMenus } from '@mall-common/router/menuHelper';
import store from '@mall-common/libs/store';

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
          const info = store.get('userInfo');
          ApiMenuRoutes({ roleId: info.role_id }).then((res) => {
            const { success, data } = res;
            if (success) {
              state.routes = data;
            }
            const routes = getRequestRoutes(state.routes);
            const menu = getRequestMenus(data);
            commit('setMenu', menu);
            commit('setRoutes', routes);
            store.set('menu', menu);
            store.set('routes', routes);
            resolve(routes);
          });
        }
      });
    },
    updatePath: async ({ commit }, route) => {
      const { path, meta } = route;
      const menu = store.get('menu');
      const routes = store.get('routes');
      if (meta?.category === 3) {
        const parent = routes.find((item) => item.meta.id === meta.parentId);
        // commit('setActivePath', parent.path);
        if (parent?.meta?.parentId) {
          const current = menu.find((item) => item.id === parent.meta.parentId);
          commit('setHeaderName', current?.code);
          if (current?.children?.length) commit('setSubMenu', current.children);
        }
      }
      if (meta?.category === 1) {
        // if (path) commit('setActivePath', route.path);
        if (meta?.parentId) {
          const current = menu.find((item) => item.id === meta.parentId);
          commit('setHeaderName', current?.code);
          if (current?.children?.length) commit('setSubMenu', current.children);
        }
      }
    },
  },
};
