import BasicLayout from '@mall-common/layouts/default/index.vue';

export const BasicRoutes = [
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '用户登录',
    },
    component: () => import('@mall-common/pages/login/index.vue'),
  },
  {
    path: '/tools/form',
    name: 'tools-form',
    meta: {
      title: '可视化表单',
    },
    component: () => import('@mall-tools/form/index.vue'),
  },
  {
    path: '/tools/editor',
    name: 'tools-editor',
    meta: {
      title: 'vscode编辑器',
    },
    component: () => import('@mall-tools/editor/index.vue'),
  },
  {
    path: '/',
    name: 'basic',
    redirect: {
      name: 'home',
    },
    component: BasicLayout,
    children: [
      {
        name: '404',
        path: '/404',
        meta: {
          title: '找不到页面',
        },
        component: () => import('@mall-common/pages/error/404.vue'),
      },
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          auth: true,
          closable: false,
          showTab: true,
        },
        component: () => import('@mall-common/pages/home/index.vue'),
      },
    ],
  },
];

export const NotFound = {
  name: 'notFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
};
