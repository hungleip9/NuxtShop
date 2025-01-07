interface register {
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  ReferalCode: string;
}
export async function register(data: register | any) {
  // đăng ký
  const axios = useNuxtApp().$axios;
  return axios.post(`${_urlApi('Auth')}/api/account/register`, data);
}
export async function getOtpRegister() {
  // lấy mã otp
  const axios = useNuxtApp().$axios;
  return axios.get(`${_urlApi('Auth')}/api/account/otp`);
}
export async function otpVerifyRegister(otp: string) {
  // xác thực mã otp
  const param = { otp };
  const axios = useNuxtApp().$axios;
  return axios.get(`${_urlApi('Auth')}/api/account/otp-verify`, { params: param });
}
export async function referal(code: string) {
  // giới thiệu
  if (!code) return null;
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios.get(`${_urlApi('Auth')}/api/account/referal/${code}`).then((res) => {
    if (res.data.code != 200) return null;
    response = res.data;
  });
  return response;
}
export async function getOtp(phone: string) {
  // lấy mã otp
  const axios = useNuxtApp().$axios;
  return await axios.get(`${_urlApi('Auth')}/api/account/otp/${phone}`);
}
export async function otpVerify(phone: string, otp: string = '') {
  // lấy mã otp
  const param = { otp };
  const axios = useNuxtApp().$axios;
  return axios.get(`${_urlApi('Auth')}/api/account/otp-verify/${phone}`, { params: param });
}
export async function forgot(data: { PhoneNumber: string; Code: string; Password: string }) {
  // quên mật khẩu
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios
    .post(`${_urlApi('Auth')}/api/account/forgot`, data)
    .then((res) => {
      if (res.data.code != 200) return null;
      response = res.data;
      _showMsg({ type: 'success', summary: 'Thành công', msg: response.messages });
    })
    .catch((e) => {
      _showMsg({ type: 'error', summary: 'Thất bại', msg: e.response.data.messages });
    });
  return response;
}
interface Login {
  PhoneNumber: string;
  Password: string;
}
export async function login(data: Login) {
  // đăng nhập
  if (!data) return null;
  const axios = useNuxtApp().$axios;
  return axios.post(`${_urlApi('Auth')}/api/account/login`, data);
}
interface Profile {
  OldPassword: string;
  Password: string;
  FullName: string;
  Email: string;
  Address: string;
  Status: string;
  Image: string;
  ReferralPhoneNumber: string;
}
export async function updateProfile(data: Profile) {
  // update thông tin user
  if (!data) return null;
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios
    .post(`${_urlApi('Auth')}/api/account/profile`, data)
    .then((res) => {
      response = res.data;
      useAuth().value.userInfo = res.data.data.customer;
      if (res.data.messages === 'Cập nhật thành công') {
        _showMsg({ type: 'success', summary: 'Thành công', msg: res.data.messages });
      }
    })
    .catch((e) => {
      _showMsg({ type: 'error', summary: 'Thất bại', msg: e.response.data.messages });
    });
  return response;
}
export async function getInfo(pass = false) {
  // lấy thông tin user
  let response = null as any;
  if (!useAuth().value.isAuthenticated) return response;
  const axios = useNuxtApp().$axios;
  await axios
    .get(`${_urlApi('Auth')}/api/account/info`)
    .then(async (res) => {
      if (res.data.code != 200) return null;
      response = res.data.data;
      let info = response.customer;
      useGlobal().value.Permission =
        response.permission && response.permission.length ? response.permission.map((e: any) => e.Code).join(',') : '';
      useGlobal().value.FeatureToggle = response.ft || [];
      keyLocalStorage({ type: 'SET', key: 'userInfo', value: info });
      useAuth().value.userInfo = info;
      useAuth().value.isAuthenticated = true;
      useConst().value.Promotion = response.promotion || '';
      if (!pass) {
        useAuth().value.IsActive = info.IsActive;
      }
    })
    .catch((e) => {
      useAuth().value.isAuthenticated = false;
      if (!pass) {
        useAuth().value.IsActive = true;
      }
    });
  return response;
}
export async function transaction(id: string) {
  // giao dịch
  if (!id) return null;
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios
    .get(`${_urlApi('Auth')}/api/account/transaction/${id}`)
    .then((res) => {
      response = res.data;
    })
    .catch((e) => {});
  return response;
}
export async function referral() {
  // giới thiệu
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios
    .get(`${_urlApi('Auth')}/api/account/referral`)
    .then((res) => {
      response = res.data;
    })
    .catch((e) => {});
  return response;
}
export async function getReferral(code: string) {
  // giới thiệu
  if (!code) return null;
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios.get(`${_urlApi('Auth')}/api/account/referal/${code}`).then((res) => {
    if (res.data.code != 200) return;
    response = res.data;
  });
  return response;
}
export async function affiliate() {
  // giới thiệu
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios
    .get(`${_urlApi('Auth')}/api/account/affiliate`)
    .then((res) => {
      response = res.data;
    })
    .catch((e) => {});
  return response;
}
interface Reward {
  BankName: string;
  AccountNumber: string;
  AccountName: string;
  Point: number;
}
export async function reward(data: Reward) {
  // phân thưởng
  let response = null as any;
  const axios = useNuxtApp().$axios;
  await axios
    .post(`${_urlApi('Auth')}/api/account/reward`, data)
    .then((res) => {
      response = res.data;
    })
    .catch((e) => {});
  return response;
}
