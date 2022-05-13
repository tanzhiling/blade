import { Modal, message } from 'ant-design-vue';

const useModal = () => {
  const methods = {
    del: (label = '当前数据', fn, params, onSuccess) => {
      Modal.confirm({
        title: '删除确认',
        content: '删除' + label + '？',
        onOk: async () => {
          const { success, msg } = await fn(params);
          if (success) {
            message.success(msg);
            onSuccess && onSuccess();
          } else {
            message.error(msg);
          }
        },
      });
    },
  };
  return methods;
};

export default useModal;
