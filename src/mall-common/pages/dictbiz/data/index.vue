<template>
  <v-card :title="title" :actions="actions">
    <BasicForm search @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
      </template>
    </BasicTable>
    <i-drawer v-model:visible="visible" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { useRoute } from 'vue-router';
import { onMounted, computed, ref, reactive } from 'vue';
import { ApiGetDictData, ApiDelDict } from '@mall-common/api/dictbiz';
import useForm from '@mall-common/hooks/useForm';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
import iDrawer from './drawer.vue';

export default {
  components: { iDrawer },
  setup() {
    const route = useRoute();
    const params = reactive({ parentId: '', code: '' });
    const detail = ref();
    const visible = ref(false);
    const modal = useModal();
    const [registerTable, { reload }] = useTable({
      request: ApiGetDictData,
      params,
      columns: [
        {
          title: '字典名称',
          dataIndex: 'dictValue',
        },
        {
          title: '字典键值',
          dataIndex: 'dictKey',
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
    const [registerForm] = useForm({
      globalSpan: 6,
      schemas: [
        {
          label: '字典名称',
          field: 'dictValue',
          component: 'Input',
        },
        {
          label: '字典键值',
          field: 'dictKey',
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

    const title = computed(() => route.meta.title + '(' + route.query.title + ')');

    onMounted(() => {
      const { id, code } = route.query;
      params.parentId = id;
      params.code = code;
      reload();
    });

    return {
      title,
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
