<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';
  import { login, register } from '~/services/auth';
  const route = useRoute();
  const loadingBtn = ref<boolean>(false);
  interface FormData {
    UserName: string;
    FullName: string;
    PhoneNumber: number | null;
    Password: string;
    Accuracy: number | null;
    PasswordNew: string;
    PasswordConfirm: string;
    Email: string;
    ReferalCode: string;
  }
  const formData = ref<FormData>({
    UserName: '',
    FullName: '',
    PhoneNumber: null,
    Password: '',
    Accuracy: null,
    PasswordNew: '',
    PasswordConfirm: '',
    Email: '',
    ReferalCode: '',
  });
  const dataConst = useConst().value;
  const dataAuth = useAuth().value;
  const typeLogin = computed(() => {
    const str = route.query['login_type'];
    return str != undefined && str ? `${str}` : '';
  });
  const formLoginRef = ref<FormInstance>();
  watch(typeLogin, () => {
    handleChangeTypeForRouter();
  });
  onMounted(() => {
    handleChangeTypeForRouter();
  });
  function handleChangeType(str: string) {
    _pushParamsRouter('login_type', str);
    if (formLoginRef.value) {
      formLoginRef.value.resetFields();
    }
  }
  const handleChangeTypeForRouter = useDebounceFn(
    async () => {
      if (!typeLogin.value || dataConst.hasPopup['modal-login'] || dataAuth.isAuthenticated) return;
      _openModal('modal-login');
    },
    200,
    { maxWait: 200 },
  );
  function handleOpen() {}
  function handleClose() {
    _deleteParamsRouter(['login_type', 'upgrade-service-user']);
    useConst().value.hasPopup['modal-login'] = false;
    resetForm();
  }
  const resetForm = () => {
    formData.value = {
      UserName: '',
      FullName: '',
      PhoneNumber: null,
      Password: '',
      Accuracy: null,
      PasswordNew: '',
      PasswordConfirm: '',
      Email: '',
      ReferalCode: '',
    };
    if (formLoginRef.value) {
      formLoginRef.value.resetFields();
    }
  };
  function getLabelBtnSubmit() {
    let str = '';
    switch (typeLogin.value) {
      case 'signup':
        str = 'Đăng ký';
        break;
      case 'forgotpassword':
        str = 'Lấy lại mật khẩu';
        break;
      default:
        str = 'Đăng nhập';
        break;
    }
    return str;
  }
  async function handleLogin() {
    const dataLogin = {
      PhoneNumber: `${formData.value.PhoneNumber}` || '',
      Password: formData.value.Password || ''
    }
    await login(dataLogin).then(async (res) => {
      dataAuth.isAuthenticated = true
      if (res.data.data.info) {
        dataConst.userInfo = res.data.data.info
      }
      if (res.data.data.token) {
        await keyLocalStorage({ type: 'SET', key: "token", value: res.data.data.token})
      }
      if (res.data.data.refresh) {
        await keyLocalStorage({ type: 'SET', key: "refresh", value: res.data.data.refresh})
      }
      await _showMsg({type: 'success', summary: 'Thành công', msg: 'Đăng nhập thành công!', placement: 'bottomRight'})
      _closeModal('modal-login')
    }).catch(error => {
      const messError = error?.response?.data?.messages || ''
      _showMsg({type: 'error', summary: 'Thất bại', msg: messError, placement: 'bottomRight'})
    })
  }
  async function handleRegister() {
    const dataRegister = {
      userName: formData.value.UserName,
      phoneNumber:  formData.value.PhoneNumber ? `${formData.value.PhoneNumber}` : '',
      email:  formData.value.Email,
      password:  formData.value.PasswordNew,
    }
    await register(dataRegister).then(async (res) => {
      dataAuth.isAuthenticated = true
      if (res.data.data.info) {
        dataConst.userInfo = res.data.data.info
      }
      if (res.data.data.token) {
        await keyLocalStorage({ type: 'SET', key: "token", value: res.data.data.token})
      }
      if (res.data.data.refresh) {
        await keyLocalStorage({ type: 'SET', key: "refresh", value: res.data.data.refresh})
      }
      await _showMsg({type: 'success', summary: 'Thành công', msg: 'Đăng ký thành công!', placement: 'bottomRight'})
      _closeModal('modal-login')
    }).catch(error => {
      const messError = error?.response?.data?.messages || ''
      _showMsg({type: 'error', summary: 'Thất bại', msg: messError, placement: 'bottomRight'})
    })
  }
  async function handleSubmit() {
    loadingBtn.value = true;
    if (typeLogin.value == 'login') {
      await handleLogin()
    }
    if (typeLogin.value == 'signup') {
      await handleRegister()
    }
    loadingBtn.value = false;
  }
  const checkPassConrfrim = (value: string) => {
    if (typeLogin.value == 'signup' && value !== formData.value.Password) return true
  }
  const validateUserName = (_rule: any, value: any) => {
    if (!value) {
      return Promise.reject('Bạn chưa nhập tên tài khoản!');
    } else {
      return Promise.resolve();
    }
  };
  const validateFullName = (_rule: any, value: any) => {
    if (!value) {
      return Promise.reject('Bạn chưa nhập họ và tên!');
    } else {
      return Promise.resolve();
    }
  };
  const validatePhoneNumber = (_rule: any, value: any) => {
    if (!value) {
      return Promise.reject('Bạn chưa nhập số điện thoại!');
    } else if (!phoneRegex.test(value)) {
      return Promise.reject('Số điện thoại không đúng!');
    } else {
      return Promise.resolve();
    }
  };
  const validatePassword = (_rule: any, value: any) => {
    if (!value) {
      return Promise.reject('Bạn chưa nhập mật khẩu!');
    } else if (value.length < 6) {
      return Promise.reject('Mật khẩu phải trên 6 ký tự!');
    } else if (value.length > 50) {
      return Promise.reject('Mật khẩu không được quá 50 ký tự!');
    } else {
      return Promise.resolve();
    }
  };
  const validatePasswordNew = (_rule: any, value: any) => {
    if (!value) {
      return Promise.reject('Bạn chưa nhập mật khẩu!');
    } else if (value.length < 6) {
      return Promise.reject('Mật khẩu phải trên 6 ký tự!');
    } else if (value.length > 50) {
      return Promise.reject('Mật khẩu không được quá 50 ký tự!');
    } else {
      return Promise.resolve();
    }
  };
  const validatePasswordConfirm = (_rule: any, value: any) => {
    if (!value) {
      return Promise.reject('Bạn chưa nhập lại mật khẩu!');
    } else if (checkPassConrfrim(value)) {
      return Promise.reject('Mật khẩu nhập lại không khớp!');
    } else {
      return Promise.resolve();
    }
  };
  const validateEmail = (_rule: any, value: any) => {
    if (!value) {
      return Promise.resolve();
    } else if (!emailRegex.test(value)) {
      return Promise.reject('Email không đúng định dạng!');
    } else {
      return Promise.resolve();
    }
  };
  const rules: Record<string, Rule[]> = {
    UserName: [{ required: true, validator: validateUserName, trigger: 'change' }],
    FullName: [{ required: true, validator: validateFullName, trigger: 'change' }],
    PhoneNumber: [{ required: true, validator: validatePhoneNumber, trigger: 'change' }],
    Password: [{ required: true, validator: validatePassword, trigger: 'change' }],
    PasswordNew: [{ required: true, validator: validatePasswordNew, trigger: 'change' }],
    PasswordConfirm: [{ required: true, validator: validatePasswordConfirm, trigger: 'change' }],
    Email: [{ validator: validateEmail, trigger: 'change' }],
  };
</script>

<template>
  <BasePopup
    name="modal-login"
    :title="'Đăng nhập'"
    :footer="false"
    :hideBack="true"
    :clickToClose="false"
    :width="'350px'"
    :zIndex="9999"
    @close="handleClose()"
    @open="handleOpen()"
  >
    <div class="form-login w-full h-full">
      <a-form
        ref="formLoginRef"
        :model="formData"
        :rules="rules"
        name="custom-validation-update-info-user"
        @finish="handleSubmit"
      >
        <!-- Body -->
        <a-form-item v-if="typeLogin == 'signup'" name="FullName">
          <VInputText size="large" placeholder="Họ và tên" v-model="formData.FullName">
            <BaseIcon icon="bi:person" />
          </VInputText>
        </a-form-item>
        <a-form-item name="UserName" v-if="typeLogin == 'signup'">
          <VInputText size="large" placeholder="Tên tài khoản" v-model="formData.UserName">
            <BaseIcon icon="material-symbols-light:person-edit-outline" />
          </VInputText>
        </a-form-item>
        <a-form-item name="PhoneNumber">
          <VInputNumber size="large" placeholder="Điện thoại" v-model="formData.PhoneNumber">
            <BaseIcon icon="ph:phone-light" />
          </VInputNumber>
        </a-form-item>
        <a-form-item v-if="typeLogin == 'login' || typeLogin == 'signup'" name="Password">
          <VInputPassword size="large" placeholder="Mật khẩu" v-model="formData.Password">
            <BaseIcon icon="clarity:lock-line" />
          </VInputPassword>
        </a-form-item>
        <a-form-item v-if="typeLogin == 'forgotpasswordaccuracy'" name="PasswordNew">
          <VInputPassword size="large" placeholder="Nhập mật khẩu mới" v-model="formData.PasswordNew">
            <Icon icon="material-symbols-light:lock" width="20" height="20" />
          </VInputPassword>
        </a-form-item>
        <a-form-item v-if="typeLogin == 'forgotpasswordaccuracy' || typeLogin == 'signup'" name="PasswordConfirm">
          <VInputPassword size="large" placeholder="Nhập lại mật khẩu" v-model="formData.PasswordConfirm">
            <Icon icon="material-symbols-light:lock" width="20" height="20" />
          </VInputPassword>
        </a-form-item>
        <a-form-item v-if="typeLogin == 'signup'" name="Email">
          <VInputText size="large" placeholder="Email" v-model="formData.Email">
            <BaseIcon icon="iconamoon:email-thin" />
          </VInputText>
        </a-form-item>
        <!-- Button -->
        <a-form-item :wrapperCol="{ span: 24 }" class="btn-form">
          <a-button type="primary" html-type="submit" size="large" class="w-full mb-2" :loading="loadingBtn">
            {{ getLabelBtnSubmit() }}
          </a-button>
        </a-form-item>
      </a-form>
      <div class="login-footer">
        <div class="text-right">
          <a class="btn label" v-if="typeLogin != 'login'" @click="handleChangeType('login')">Đăng nhập</a>
          <a class="btn label" v-if="typeLogin != 'signup'" @click="handleChangeType('signup')">Đăng ký</a>
          <!-- <a class="btn label" v-if="typeLogin != 'forgotpassword'" @click="handleChangeType('forgotpassword')"
            >Quên mật khẩu</a
          > -->
        </div>
      </div>
    </div>
  </BasePopup>
</template>

<style lang="scss" scoped></style>
