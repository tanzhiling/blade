<template>
  <v-card :actions="actions">
    <a-row>
      <a-col :span="4">
        <a-tree show-icon :tree-data="deptData" />
      </a-col>
      <a-col :span="20">
        <v-query :model="model" @on-search="reload" @on-reset="reload">
          <v-query-item label="用户账号" name="account">
            <a-input v-model:value="model.account" allow-clear />
          </v-query-item>
          <v-query-item label="用户姓名" name="realName">
            <a-input v-model:value="model.realName" allow-clear />
          </v-query-item>
        </v-query>
        <v-table @register="registerTable">
          <template #sexName="{ record }">
            <a-tag v-if="record.sexName === 1" color="blue">男</a-tag>
            <a-tag v-else-if="record.sexName === 2" color="blue">女</a-tag>
          </template>
          <template #actions="{ record }">
            <v-btn @click="onEdit(record)">编辑</v-btn>
            <v-btn @click="onDel(record)">删除</v-btn>
            <v-btn @click="onReset(record)">重置密码</v-btn>
          </template>
        </v-table>
      </a-col>
    </a-row>
    <i-drawer v-model:visible="visible" :data="detail" :dept-data="deptData" @reload="reload" />
  </v-card>
</template>
<script>
import { onMounted, ref, reactive } from 'vue';
import { ApiGetOrgTree } from '@mall-common/api/org';
import { ApiGetUserPage, ApiDelUser } from '@mall-common/api/user';
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
    const [deptData] = useRequest({
      request: ApiGetOrgTree,
      params: { parentId: '0' },
      isInit: true,
    });
    const [registerTable, { reload }] = useTable({
      request: ApiGetUserPage,
      isPage: true,
      params: model,
      columns: [
        {
          title: '登录账号',
          dataIndex: 'account',
        },
        {
          title: '用户姓名',
          dataIndex: 'realName',
        },
        {
          title: '所属角色',
          dataIndex: 'roleName',
        },
        {
          title: '所属部门',
          dataIndex: 'deptName',
        },
        {
          title: '当前岗位',
          dataIndex: 'postName',
        },
        {
          title: '性别',
          dataIndex: 'sexName',
          width: 100,
          align: 'center',
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
      modal.del('用户', ApiDelUser, { ids: row.id }, () => reload());
    };
    const onReset = () => {};

    const actions = [
      {
        text: '新增用户',
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
      deptData,
      registerTable,
      onEdit,
      onDel,
      onReset,
      actions,
    };
  },
};
</script>
