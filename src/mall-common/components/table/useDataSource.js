import { ref, reactive, unref } from 'vue';

const useDataSource = (propsRef) => {
  const loading = ref(false);
  const dataSource = ref([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    size: 'small',
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条数据`,
  });

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    reload({ current, size: pageSize });
  };

  const reload = async (payload) => {
    const { request, params, page } = unref(propsRef);
    const { current, pageSize } = unref(pagination);
    loading.value = true;
    const { success, data } = await request({
      ...params,
      current,
      size: pageSize,
      ...payload,
    });
    loading.value = false;
    if (success) {
      if (page) {
        const { records, current, size, total } = data;
        dataSource.value = records;
        pagination.current = current;
        pagination.pageSize = size;
        pagination.total = total;
      } else {
        dataSource.value = data;
      }
    }
  };

  return { loading, dataSource, pagination, reload, handleTableChange };
};

export default useDataSource;
