<template>
  <v-card :actions="actions">
    <v-query :model="model" @on-search="reload" @on-reset="reload">
      <v-query-item label="岗位名称" name="postName">
        <a-input v-model:value="model.postName" allow-clear />
      </v-query-item>
      <v-query-item label="岗位编码" name="postCode">
        <a-input v-model:value="model.postCode" allow-clear />
      </v-query-item>
      <v-query-item label="岗位类型" name="category">
        <a-select v-model:value="model.category" allow-clear>
          <a-select-option v-for="item in dict" :key="item.dictKey" :value="item.dictKey">
            {{ item.dictValue }}
          </a-select-option>
        </a-select>
      </v-query-item>
    </v-query>
    <v-table @register="registerTable">
      <template #category="{ record }">
        {{ dict.find((item) => item.dictKey === String(record.category))?.dictValue }}
      </template>
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
      </template>
    </v-table>
    <i-drawer v-model:visible="visible" :dict="dict" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { onMounted, ref, reactive } from 'vue';
import { ApiGetDict } from '@mall-common/api/global';
import { ApiGetRostPage, ApiDelPost } from '@mall-common/api/post';
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
      request: ApiGetRostPage,
      isPage: true,
      params: model,
      columns: [
        {
          title: '岗位名称',
          dataIndex: 'postName',
        },
        {
          title: '岗位编码',
          dataIndex: 'postCode',
        },
        {
          title: '岗位类型',
          dataIndex: 'category',
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
          width: 100,
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
      modal.del('岗位', ApiDelPost, { ids: row.id }, () => reload());
    };

    const actions = [
      {
        text: '新增岗位',
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
      dict,
    };
  },
};
</script>
