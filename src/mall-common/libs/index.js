import { unref } from 'vue';

export function getDynamicProps(props) {
  const ret = {};

  Object.keys(props).forEach((key) => {
    ret[key] = unref([key]);
  });

  return ret;
}

export function deepMerge(src, target) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}
