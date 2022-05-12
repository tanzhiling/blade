import { unref } from 'vue';

export function getDynamicProps(props) {
  const ret = {};

  Object.keys(props).forEach((key) => {
    ret[key] = unref([key]);
  });

  return ret;
}
