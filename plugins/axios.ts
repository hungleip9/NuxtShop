import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    headers: {
      spDevice: 'Webapp'
    }
  });
  let isRefreshToken = false;

  api.interceptors.request.use(async (config) => {
    const token = keyLocalStorage({ type: 'GET', key: 'token' });
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
    keyLocalStorage({ type: 'SET', key: 'token', value: '' });
    keyLocalStorage({ type: 'SET', key: 'refresh', value: '' });
    keyLocalStorage({ type: 'SET', key: 'userInfo', value: '{}' });
  }

  return {
    provide: {
      axios: api,
      version: '496'
    }
  };
});
