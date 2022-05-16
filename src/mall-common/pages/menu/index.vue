<template>
  <v-card :actions="actions">
    <v-form search @register="registerForm" />
    <v-table @register="registerTable">
      <template #source="{ record }">
        <v-icon :type="record.source" :size="18" />
      </template>
      <template #category="{ record }">
        <a-tag v-if="record.category === 1" color="blue">菜单</a-tag>
        <a-tag v-else-if="record.category === 2" color="purple">分组</a-tag>
        <a-tag v-else-if="record.category === 3" color="red">权限</a-tag>
      </template>
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
        <v-btn @click="onAddChild(record)">新增下级</v-btn>
      </template>
    </v-table>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>

<script>
import { onMounted, ref } from 'vue';
import { ApiGetMenuLazyList, ApiDelMenu } from '@mall-common/api/menu';
import useForm from '@mall-common/hooks/useForm';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
import iDrawer from './drawer.vue';
export default {
  components: { iDrawer },
  setup() {
    const detail = ref();
    const visible = ref(false);
    const modal = useModal();
    const [registerTable, { reload }] = useTable({
      rowKey: 'id',
      request: ApiGetMenuLazyList,
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
          title: '文件路径',
          dataIndex: 'page',
        },
        {
          title: '图标',
          dataIndex: 'source',
          width: 100,
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
    const [registerForm] = useForm({
      globalSpan: 6,
      schemas: [
        {
          label: '菜单名称',
          field: 'name',
          component: 'Input',
        },
        {
          label: '菜单编码',
          field: 'code',
          component: 'Input',
        },
        {
          label: '菜单类型',
          field: 'category',
          component: 'Select',
          options: [
            {
              label: '菜单',
              value: 1,
            },
            {
              label: '分组',
              value: 2,
            },
            {
              label: '按钮',
              value: 3,
            },
          ],
        },
      ],
      onReload: reload,
    });

    const onAdd = () => {
      detail.value = {};
      visible.value = true;
    };

    const onAddChild = (row) => {
      detail.value = { parentId: row.id };
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

    const onDel = (row) => {
      modal.del('菜单', ApiDelMenu, { ids: row.id }, () => reload());
    };

    onMounted(() => {
      reload();
    });

    return {
      detail,
      visible,
      reload,
      registerForm,
      registerTable,
      actions,
      onAddChild,
      onEdit,
      onDel,
    };
  },
};
</script>
