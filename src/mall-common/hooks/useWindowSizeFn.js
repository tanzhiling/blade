import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core';

const useWindowSizeFn = (fn, wait = 150, options) => {
  let handler = () => {
    fn();
  };

  const handleSize = useDebounceFn(handler, wait);
  handler = handleSize;

  const start = () => {
    if (options && options.immediate) {
      handler();
    }
    window.addEventListener('resize', handler);
  };

  const stop = () => {
    window.removeEventListener('resize', handler);
  };

  tryOnMounted(() => {
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });
  return [start, stop];
};

export default useWindowSizeFn;
