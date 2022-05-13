<template>
  <v-card :actions="actions">
    <v-query :model="model" @on-search="reload" @on-reset="reload">
      <v-query-item label="机构名称" name="deptName">
        <a-input v-model:value="model.deptName" allow-clear />
      </v-query-item>
    </v-query>
    <v-table @register="registerTable">
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
        <v-btn>新增下级</v-btn>
      </template>
    </v-table>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import { ApiGetOrgPage, ApiDelOrg } from '@mall-common/api/org';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
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
      request: ApiGetOrgPage,
      isPage: false,
      params: model,
      columns: [
        {
          title: '机构名称',
          dataIndex: 'deptName',
        },
        {
          title: '机构全称',
          dataIndex: 'fullName',
        },
        {
          title: '机构类型',
          key: 'deptCategoryName',
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

    const onAdd = () => {
      detail.value = {};
      visible.value = true;
    };

    const onEdit = (row) => {
      detail.value = row;
      visible.value = true;
    };

    const onDel = (row) => {
      modal.del('机构', ApiDelOrg, { ids: row.id }, () => reload());
    };

    const actions = [
      {
        text: '新增机构',
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
