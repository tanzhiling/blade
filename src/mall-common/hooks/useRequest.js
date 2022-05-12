import { onMounted, ref } from 'vue';

const useRequest = (props) => {
  const { request, params, init = true, onSuccess } = props;

  const resData = ref();

  const reload = async () => {
    const { success, data } = await request(params);
    if (success) {
      resData.value = data;
      if (onSuccess) {
        onSuccess(data);
      }
    }
  };

  const methods = {
    reload,
  };

  onMounted(() => {
    if (init) reload();
  });

  return [resData, methods];
};

export default useRequest;
