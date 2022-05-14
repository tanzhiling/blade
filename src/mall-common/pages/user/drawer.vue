<template>
  <a-drawer :visible="show" :width="600" :title="title" :mask-closable="false" @close="onClose">
    <a-form ref="formRef" autocomplete="off" :label-col="{ span: 6 }" :model="model" :rules="rules">
      <div class="v-title">基本信息</div>
      <a-row>
        <a-col :span="12">
          <a-form-item label="登录账号" name="account" :rules="rules.account">
            <a-input v-model:value="model.account" allow-clear />
          </a-form-item>
        </a-col>
        <template v-if="!data?.id">
          <a-col :span="12"></a-col>
          <a-col :span="12">
            <a-form-item label="密码" name="password" :rules="rules.password">
              <a-input-password v-model:value="model.password" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="确认密码" name="password2" :rules="rules.password2">
              <a-input-password v-model:value="model.password2" allow-clear />
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <div class="v-title">详细信息</div>
      <a-row>
        <a-col :span="12">
          <a-form-item label="用户昵称" name="name" :rules="rules.name">
            <a-input v-model:value="model.name" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户姓名" name="realName" :rules="rules.realName">
            <a-input v-model:value="model.realName" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="手机号码" name="phone">
            <a-input v-model:value="model.phone" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电子邮箱" name="email">
            <a-input v-model:value="model.email" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="model.sex">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="生日" name="birthday">
            <a-date-picker v-model:value="model.birthday" value-format="YYYY-MM-DD" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="v-title">职责信息</div>
      <a-row>
        <a-col :span="12">
          <a-form-item label="用户编号" name="code">
            <a-input v-model:value="model.email" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属角色" name="roleId" :rules="rules.roleId">
            <a-select v-model:value="model.roleId" allow-clear>
              <a-select-option v-for="item in roleData" :key="item.id" :value="item.id">
                {{ item.roleName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属公司" name="deptId" :rules="rules.deptId">
            <a-tree-select
              v-model:value="model.deptId"
              :tree-data="deptData"
              allow-clear
              show-search
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属岗位" name="postId" :rules="rules.postId">
            <a-select v-model:value="model.postId" allow-clear>
              <a-select-option v-for="item in postData" :key="item.id" :value="item.id">
                {{ item.postName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script>
import { message } from 'ant-design-vue';
import { computed, reactive, ref, unref, watch } from 'vue';
import { ApiSaveUser, ApiUpdateUser } from '@mall-common/api/user';
import { ApiGetPostSelect } from '@mall-common/api/post';
import { ApiGetRoleList } from '@mall-common/api/role';
import { validatePwd } from '@mall-common/libs/validate';
import useRequest from '@mall-common/hooks/useRequest';
export default {
  props: {
    visible: Boolean,
    data: Object,
    deptData: Array,
  },
  emits: ['update:visible', 'reload'],
  setup(props, { emit }) {
    const formRef = ref();
    const show = ref(false);
    const loading = ref(false);
    const model = ref({});
    const validatePass = (rule, value) => {
      if (value) {
        const { password } = unref(model);
        if (value !== password) {
          return Promise.reject('两次密码输入不一致');
        }
        return Promise.resolve();
      } else {
        return Promise.reject('请输入确认密码');
      }
    };
    const rules = reactive({
      account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
      password: [{ required: true, validator: validatePwd, trigger: 'blur' }],
      password2: [{ required: true, validator: validatePass, trigger: 'blur' }],
      name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
      realName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
      roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
      deptId: [
        {
          required: true,
          message: '请选择部门',
          trigger: 'change',
          pattern: /.+/,
        },
      ],
      postId: [{ required: true, message: '请选择岗位', trigger: 'change' }],
    });
    const title = computed(() => (props.data?.id ? '编辑用户' : '新增用户'));
    const [roleData] = useRequest({ request: ApiGetRoleList, isInit: true });
    const [postData] = useRequest({ request: ApiGetPostSelect, isInit: true });

    watch(
      () => show.value,
      (val) => {
        emit('update:visible', val);
      },
    );

    watch(
      () => props.visible,
      (val) => {
        const { data } = unref(props);
        model.value = { ...data };
        show.value = val;
      },
    );

    const onClose = () => {
      model.value = {};
      formRef.value.resetFields();
      show.value = false;
    };

    const onSubmit = () => {
      formRef.value.validate().then(async () => {
        loading.value = true;
        if (model.value.id) {
          const { success, msg } = await ApiUpdateUser(model.value);
          loading.value = false;
          if (success) {
            message.success(msg);
            emit('reload');
            onClose();
          }
        } else {
          const { success, msg } = await ApiSaveUser(model.value);
          loading.value = false;
          if (success) {
            message.success(msg);
            emit('reload');
            onClose();
          }
        }
      });
    };

    return {
      formRef,
      show,
      model,
      rules,
      title,
      loading,
      onClose,
      onSubmit,
      roleData,
      postData,
    };
  },
};
</script>
