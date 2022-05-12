<template>
  <v-card :actions="actions">
    <v-query :model="model" @on-search="reload" @on-reset="reload">
      <v-query-item label="菜单名称" name="name">
        <a-input v-model:value="model.name" allow-clear />
      </v-query-item>
      <v-query-item label="菜单编码" name="code">
        <a-input v-model:value="model.code" allow-clear />
      </v-query-item>
      <v-query-item label="菜单类型" name="category">
        <a-select v-model:value="model.category" allow-clear>
          <a-select-option :value="1">菜单</a-select-option>
          <a-select-option :value="2">页面</a-select-option>
          <a-select-option :value="3">按钮</a-select-option>
        </a-select>
      </v-query-item>
    </v-query>
    <v-table @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'source'">
          <v-icon :type="record.source" :size="18" />
        </template>
        <template v-if="column.dataIndex === 'category'">
          <a-tag v-if="record.category === 1" color="blue">菜单</a-tag>
          <a-tag v-else-if="record.category === 2" color="blue">页面</a-tag>
          <a-tag v-else-if="record.category === 3" color="blue">按钮</a-tag>
        </template>
        <template v-if="column.dataIndex === 'actions'">
          <v-btn @click="onEdit(record)">编辑</v-btn>
          <v-btn @click="onDelete(record)">删除</v-btn>
          <v-btn>新增下级</v-btn>
        </template>
      </template>
    </v-table>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { ApiGetMenuLazyList } from '@mall-common/api/menu';
import useTable from '@mall-common/hooks/useTable';
import iDrawer from './drawer.vue';
export default {
  components: { iDrawer },
  setup() {
    const model = reactive({});
    const detail = ref();
    const visible = ref(false);
    const [registerTable, { reload }] = useTable({
      rowKey: 'id',
      request: ApiGetMenuLazyList,
      isPage: false,
      params: model,
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'name',
          width: 200,
        },
        {
          title: '菜单编码',
          dataIndex: 'code',
        },
        {
          title: '路由地址',
          dataIndex: 'path',
        },
        {
          title: '图标',
          dataIndex: 'source',
        },
        {
          title: '类型',
          dataIndex: 'category',
          align: 'center',
          width: 100,
        },
        {
          title: '排序',
          dataIndex: 'sort',
          align: 'center',
          width: 100,
        },
        {
          title: '操作',
          dataIndex: 'actions',
          width: 170,
        },
      ],
    });

    const onAdd = () => {
      detail.value = {};
      visible.value = true;
    };

    const actions = [
      {
        text: '新增菜单',
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

    const onEdit = (row) => {
      detail.value = row;
      visible.value = true;
    };

    const onDelete = () => {};

    onMounted(() => {
      reload();
    });

    return {
      model,
      detail,
      visible,
      reload,
      registerTable,
      actions,
      onEdit,
      onDelete,
    };
  },
};
</script>
