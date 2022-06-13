import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { BasicRoutes, NotFound } from './routes';
import Setting from '../config/setting';
import cookies from '../libs/cookies';
import store from '../store';

NProgress.configure({ showSpinner: false });

const whiteNameList = ['/login', '/tools/form', '/tools/editor'];

const router = createRouter({
  history: createWebHistory(),
  routes: BasicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    router.hasRoute(name) && router.removeRoute(name);
  });
  BasicRoutes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route);
  });
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = cookies.get('token');
  if (token) {
    if (store.state.menu.routes.length) {
      next();
    } else {
      if (whiteNameList.includes(to.path)) {
        next();
      } else {
        const accessRoutes = await store.dispatch('menu/generateRoutes');
        accessRoutes.forEach((route) => {
          !router.hasRoute(route.name) && router.addRoute('basic', route);
        });
        router.addRoute(NotFound);
        next({ ...to, replace: true });
      }
    }
  } else {
    if (whiteNameList.includes(to.path)) {
      next();
    } else {
      next({ path: '/login', query: { ...to.query, redirect: to.path } });
    }
  }
});

router.afterEach((to) => {
  NProgress.done();
  if (to.meta.title) {
    window.document.title = `${to.meta.title} - ${Setting.documentTitle}`;
  }
});

export default router;
