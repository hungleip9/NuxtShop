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
  const api = axios.create({
    headers: {
      spDevice: 'Webapp'
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
      }

      return Promise.reject(error);
    }
  );

  async function logout() {
    token.value = null;
    refresh.value = null;
    keyLocalStorage({ type: 'SET', key: 'userInfo', value: '{}' });
  }

  return {
    provide: {
      axios: api,
      version: '496'
    }
  };
});
