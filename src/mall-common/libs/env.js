import { unref } from 'vue';

export function getDynamicProps(props) {
  const ret = {};
  Object.keys(props).forEach((key) => {
    ret[key] = unref(props[key]);
  });
  return ret;
}

export function getEnv() {
  return import.meta.env.MODE;
}

export function isDevMode() {
  return import.meta.env.DEV;
}

export function isProdMode() {
  return import.meta.env.PROD;
}
