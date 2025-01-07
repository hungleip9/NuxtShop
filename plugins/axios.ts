import axios from 'axios';

export default defineNuxtPlugin(() => {
  const token = _useCookie('token') as any;
  const theme = _useCookie('theme') as any;
  const refresh = _useCookie('refresh') as any;
  const lastToken = keyLocalStorage({ type: 'GET', key: 'token' });
  const lastTheme = keyLocalStorage({ type: 'GET', key: 'theme' });
  if (lastToken) {
    token.value = lastToken;
    keyLocalStorage({ type: 'SET', key: 'token', value: '' });
  }
  if (lastTheme) {
    theme.value = lastTheme;
    keyLocalStorage({ type: 'SET', key: 'theme', value: '' });
  }
  useConst().value.theme = theme.value || 'dark';
  useAuth().value.isAuthenticated = token.value ? true : false;
  const config = useRuntimeConfig();
  const spVersion = config.public.version || 'webapp_1.5.0';
  const api = axios.create({
    headers: {
      spDevice: 'Webapp',
      spVersion: spVersion
    }
  });
  let isRefreshToken = false;

  api.interceptors.request.use(async (config) => {
    const getLastToken = _useCookie('token') as any;
    config.headers.Authorization = `Bearer ${getLastToken.value}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config } = error;
      const status = error.response?.status || '';

      if (status === 401 && !isRefreshToken) {
        isRefreshToken = true;
        logout();
        isRefreshToken = false;
        return;
        const getLastRefresh = _useCookie('refresh') as any;
        if (getLastRefresh.value) {
          try {
            // Tạo instance axios riêng biệt cho việc refresh token
            const refreshApi = axios.create();
            const res = await refreshApi.get(`${_urlApi('Auth')}/api/account/refresh/${getLastRefresh.value}`);
            token.value = res.data.data.token;
            useAuth().value.isAuthenticated = true;
            getLastRefresh.value = res.data.data.refresh;
            config.headers.Authorization = `Bearer ${res.data.data.token}`;
            isRefreshToken = false;
            return api(config); // Thực hiện lại yêu cầu ban đầu với token mới
          } catch (e) {
            logout();
            isRefreshToken = false;
          }
        } else {
          logout();
          isRefreshToken = false;
        }
      }

      return Promise.reject(error);
    }
  );

  async function logout() {
    token.value = null;
    useAuth().value.isAuthenticated = false;
    refresh.value = null;
    keyLocalStorage({ type: 'SET', key: 'userInfo', value: '{}' });
    useAuth().value.userInfo = {};
    useGlobal().value.Permission = '';
    useGlobal().value.FeatureToggle = [];
  }

  return {
    provide: {
      axios: api,
      version: '496'
    }
  };
});
