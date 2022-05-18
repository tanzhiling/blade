<template>
  <v-card :actions="actions">
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
        <v-btn>新增下级</v-btn>
      </template>
    </BasicTable>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { onMounted, ref } from 'vue';
import { ApiGetRoleList, ApiDelRole } from '@mall-common/api/role';
import useForm from '@mall-common/hooks/useForm';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
import iDrawer from './drawer.vue';

export default {
  components: { iDrawer },
  setup() {
    const model = ref();
    const detail = ref();
    const visible = ref(false);
    const modal = useModal();
    const [registerTable, { reload }] = useTable({
      rowKey: 'id',
      request: ApiGetRoleList,
      params: model,
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
        },
        {
          title: '角色编码',
          dataIndex: 'roleAlias',
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
    const [registerForm] = useForm({
      globalSpan: 6,
      search: true,
      schemas: [
        {
          label: '角色名称',
          field: 'roleName',
          component: 'Input',
        },
        {
          label: '角色编码',
          field: 'roleAlias',
          component: 'Input',
        },
      ],
      onSearch: reload,
      onReset: reload,
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
      modal.del('角色', ApiDelRole, { ids: row.id }, () => reload());
    };

    const actions = [
      {
        text: '新增角色',
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
      registerForm,
      registerTable,
      onEdit,
      onDel,
      actions,
    };
  },
};
</script>
