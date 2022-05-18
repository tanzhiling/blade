<template>
  <v-card :actions="actions">
    <BasicForm search @register="registerForm" />
    <BasicTable page @register="registerTable">
      <template #category="{ record }">
        {{ dict && dict.find((item) => item.dictKey === String(record.category))?.dictValue }}
      </template>
      <template #actions="{ record }">
        <v-btn @click="onEdit(record)">编辑</v-btn>
        <v-btn @click="onDel(record)">删除</v-btn>
      </template>
    </BasicTable>
    <i-drawer v-model:visible="visible" :dict="dict" :data="detail" @reload="reload" />
  </v-card>
</template>
<script>
import { onMounted, ref } from 'vue';
import { ApiGetDict } from '@mall-common/api/global';
import { ApiGetRostPage, ApiDelPost } from '@mall-common/api/post';
import useForm from '@mall-common/hooks/useForm';
import useTable from '@mall-common/hooks/useTable';
import useModal from '@mall-common/hooks/useModal';
import useRequest from '@mall-common/hooks/useRequest';
import iDrawer from './drawer.vue';
export default {
  components: { iDrawer },
  setup() {
    const detail = ref();
    const visible = ref(false);
    const modal = useModal();
    const [dict] = useRequest({
      request: ApiGetDict,
      params: { code: 'post_category' },
      isInit: true,
    });
    const [registerTable, { reload }] = useTable({
      request: ApiGetRostPage,
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
    const [registerForm] = useForm({
      globalSpan: 6,
      schemas: [
        {
          label: '岗位名称',
          field: 'postName',
          component: 'Input',
        },
        {
          label: '岗位编码',
          field: 'postCode',
          component: 'Input',
        },
        {
          label: '岗位类型',
          field: 'category',
          component: 'Select',
          options: dict,
          optionsField: {
            label: 'dictValue',
            value: 'dictKey',
          },
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
      detail,
      visible,
      reload,
      registerForm,
      registerTable,
      onEdit,
      onDel,
      actions,
      dict,
    };
  },
};
</script>
