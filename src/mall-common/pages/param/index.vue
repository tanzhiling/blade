<template>
  <v-card :actions="actions">
    <BasicForm search @register="registerForm" />
    <BasicTable page @register="registerTable">
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
      </template>
    </BasicTable>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { onMounted, ref } from 'vue';
import { ApiGetParamPage, ApiDelParam } from '@mall-common/api/param';
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
      request: ApiGetParamPage,
      columns: [
        {
          title: '参数名称',
          dataIndex: 'paramName',
        },
        {
          title: '参数键名',
          dataIndex: 'paramKey',
        },
        {
          title: '参数键值',
          dataIndex: 'paramValue',
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
    const [registerForm] = useForm({
      globalSpan: 6,
      schemas: [
        {
          label: '参数名称',
          field: 'paramName',
          component: 'Input',
        },
        {
          label: '参数键名',
          field: 'paramKey',
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

    const onDel = (row) => {
      modal.del('参数', ApiDelParam, { ids: row.id }, () => reload());
    };

    const actions = [
      {
        text: '新增参数',
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
      actions,
    };
  },
};
</script>
