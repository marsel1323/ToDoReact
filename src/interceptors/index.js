import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const getToken = () => JSON.parse(window.localStorage.getItem('token')) || null;

const updateTokens = async (refreshToken) => {
  try {
    const { data } = await instance.get(`/auth/refresh-token/${refreshToken}`);
    
    window.localStorage.setItem('token', JSON.stringify(data));
    return data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    
    if (!token) return config;

    if (!config.url.includes('auth') && Date.now() > token.expiresIn) {
      token.accessToken = await updateTokens(token.refreshToken);
    }

    config.headers.Authorization = token.accessToken;

    return config;
  },
  err => Promise.reject(err),
);

instance.interceptors.response.use(response => response, async (error) => {
  const originalRequest = error.config;

  if (!originalRequest.url.includes('login')
		&& error.response.status === 401
		&& !originalRequest.retry) {
    originalRequest.retry = true;
    const token = getToken();
    if (!token) {
      console.error('token is absent');
      return null;
    }
    
    const accessToken = await updateTokens(token.refreshToken);
    
    if (accessToken) {
      originalRequest.headers.Authorization = accessToken;
      return instance(originalRequest);
    }
    console.error('token is absent');
    return null;
  }
  return Promise.reject(error);
});

export default instance;
