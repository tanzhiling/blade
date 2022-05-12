import { nextTick, onMounted, onActivated } from 'vue';

const onMountedOrActivated = (hook) => {
  let mounted;

  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });

  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
};

export default onMountedOrActivated;
