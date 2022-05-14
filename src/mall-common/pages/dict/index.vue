<template>
  <v-card :actions="actions">
    <v-query :model="model" @on-search="reload" @on-reset="reload">
      <v-query-item label="字典名称" name="dictValue">
        <a-input v-model:value="model.dictValue" allow-clear />
      </v-query-item>
      <v-query-item label="字典编码" name="code">
        <a-input v-model:value="model.code" allow-clear />
      </v-query-item>
    </v-query>
    <v-table @register="registerTable">
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
        <v-btn @click="onDel(record)">字典配置</v-btn>
      </template>
    </v-table>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { onMounted, ref, reactive } from 'vue';
import { ApiGetDict } from '@mall-common/api/global';
import { ApiGetDictPage, ApiDelDict } from '@mall-common/api/dict';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
import useRequest from '@mall-common/hooks/useRequest';
import iDrawer from './drawer.vue';
export default {
  components: { iDrawer },
  setup() {
    const model = reactive({});
    const detail = ref();
    const visible = ref(false);
    const modal = useModal();
    const [registerTable, { reload }] = useTable({
      rowKey: 'id',
      request: ApiGetDictPage,
      isPage: true,
      params: model,
      columns: [
        {
          title: '字典名称',
          dataIndex: 'dictValue',
        },
        {
          title: '字典编码',
          dataIndex: 'code',
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
        {
          title: '备注',
          dataIndex: 'remark',
        },
        {
          title: '操作',
          dataIndex: 'actions',
          width: 170,
        },
      ],
    });
    const [dict] = useRequest({
      request: ApiGetDict,
      params: { code: 'post_category' },
      isInit: true,
    });

    const onAdd = () => {
      detail.value = {};
      visible.value = true;
    };

    const onEdit = (row) => {
      detail.value = row;
      visible.value = true;
    };

    const onDel = (row) => {
      modal.del('字典', ApiDelDict, { ids: row.id }, () => reload());
    };

    const actions = [
      {
        text: '新增字典',
        onClick: onAdd,
      },
      {
        text: '批量导入',
        onClick: onAdd,
      },
      {
        text: '导出',
        onClick: onAdd,
      },
    ];

    onMounted(() => {
      reload();
    });

    return {
      model,
      detail,
      visible,
      reload,
      registerTable,
      onEdit,
      onDel,
      actions,
    };
  },
};
</script>
