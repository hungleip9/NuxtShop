import axios from 'axios';

export default defineNuxtPlugin(() => {
  const configRunTime = useRuntimeConfig()
  const baseUrl = configRunTime.public.BASE_URLL ? `${configRunTime.public.BASE_URLL}` : ''
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
    }
  });
  let isRefreshToken = false;

  api.interceptors.request.use(async (config) => {
    const token = keyLocalStorage({ type: 'GET', key: 'token' });
    console.log('token: ', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config } = error;
      const status = error.response?.status || '';
      if ((status === 401) && !isRefreshToken) {
        isRefreshToken = true;
        const refresh = keyLocalStorage({ type: 'GET', key: 'refresh' })
        if (!refresh) {
          logout();
          isRefreshToken = false;
          return
        }
        const dataAuth = useAuth().value
        // Tạo instance axios riêng biệt cho việc refresh token
        const refreshApi = axios.create();
        await refreshApi.get(`${baseUrl}/api/auth/refresh/${refresh}`).then(async (res) => {
          keyLocalStorage({ type: 'SET', key: 'token', value: res.data.data.token })
          keyLocalStorage({ type: 'SET', key: 'refresh', value: res.data.data.refresh })
          dataAuth.isAuthenticated = true;
          config.headers.Authorization = `Bearer ${res.data.data.token}`;
          isRefreshToken = false;
          await api(config); // Thực hiện lại yêu cầu ban đầu với token mới
        }).catch((e) => {
          logout();
          isRefreshToken = false;
        });
      }
      return Promise.reject(error);
    }
  );

  async function logout() {
    keyLocalStorage({ type: 'SET', key: 'token', value: '' });
    keyLocalStorage({ type: 'SET', key: 'refresh', value: '' });
  }

  return {
    provide: {
      axios: api,
      version: '496'
    }
  };
});
