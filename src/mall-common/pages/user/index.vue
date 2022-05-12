<template>
  <v-card :actions="actions">
    <a-row>
      <a-col :span="4">
        <a-tree class="v-m" show-icon :tree-data="tree" :load-data="onLoadData" />
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
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'source'">
              <v-icon :type="record.source" :size="18" />
            </template>
            <template v-if="column.dataIndex === 'sexName'">
              <a-tag v-if="record.sexName === 1" color="blue">男</a-tag>
              <a-tag v-else-if="record.sexName === 2" color="blue">女</a-tag>
            </template>
            <template v-if="column.dataIndex === 'actions'">
              <v-btn>编辑</v-btn>
              <v-btn>删除</v-btn>
              <v-btn>重置密码</v-btn>
            </template>
          </template>
        </v-table>
      </a-col>
    </a-row>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import { ApiGetOrgLazyTree } from '@mall-common/api/org';
import { ApiGetUserPage } from '@mall-common/api/user';
import useTable from '@mall-common/hooks/useTable';
import useRequest from '@mall-common/hooks/useRequest';
import iDrawer from './drawer.vue';
export default {
  components: { iDrawer },
  setup() {
    const model = reactive({});
    const detail = ref();
    const visible = ref(false);
    const [tree] = useRequest({
      request: ApiGetOrgLazyTree,
      params: { parentId: '0' },
      isInit: true,
    });
    const [registerTable, { reload, redoHeight }] = useTable({
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
          key: 'roleName',
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

    const onDelete = () => {};

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

    const onLoadData = (treeNode) => {
      return new Promise((resolve) => {
        ApiGetOrgLazyTree({ parentId: treeNode.id }).then((res) => {
          if (res.success) {
            treeNode.dataRef.children = res.data.map((item) => {
              if (!item.hasChildren) {
                item.isLeaf = true;
              }
              return item;
            });
            tree.value = [...tree.value];
          }
        });
        resolve();
      });
    };

    onMounted(() => {
      reload();
    });

    return {
      model,
      detail,
      visible,
      reload,
      tree,
      registerTable,
      onEdit,
      onDelete,
      onLoadData,
      actions,
    };
  },
};
</script>
