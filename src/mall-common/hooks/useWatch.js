import { ref, unref, watch } from 'vue';

const useWatch = (props) => {
  const model = ref();

  watch(
    () => props.data,
    (val) => {
      const { data } = unref(props);
      console.log('data', data);
      model.value = data;
    },
    { immediate: true },
  );

  return {
    model,
  };
};

export default useWatch;
