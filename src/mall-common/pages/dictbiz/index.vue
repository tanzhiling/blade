<template>
  <v-card :actions="actions">
    <BasicForm search @register="registerForm" />
    <BasicTable page @register="registerTable">
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
        <v-btn @click="onConfig(record)">字典配置</v-btn>
      </template>
    </BasicTable>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { ApiGetDictPage, ApiDelDict } from '@mall-common/api/dictbiz';
import useForm from '@mall-common/hooks/useForm';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
import iDrawer from './drawer.vue';

export default {
  components: { iDrawer },
  setup() {
    const router = useRouter();
    const detail = ref();
    const visible = ref(false);
    const modal = useModal();
    const [registerTable, { reload }] = useTable({
      request: ApiGetDictPage,
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
    const [registerForm] = useForm({
      globalSpan: 6,
      schemas: [
        {
          label: '字典名称',
          field: 'dictValue',
          component: 'Input',
        },
        {
          label: '字典编码',
          field: 'code',
          component: 'Input',
        },
      ],
      onReload: reload,
    });

    const onAdd = () => {
      detail.value = {};
      visible.value = true;
    };

    const onEdit = (row) => {
      detail.value = row;
      visible.value = true;
    };

    const onConfig = (row) => {
      router.push({
        path: '/system/dictbiz/data',
        query: { id: row.id, title: row.dictValue, code: row.code },
      });
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
      detail,
      visible,
      reload,
      registerForm,
      registerTable,
      onEdit,
      onDel,
      onConfig,
      actions,
    };
  },
};
</script>
