import axios from 'axios';
// const { VITE_BASE_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getAccessToken = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;

  try {
    const parsed = JSON.parse(user);
    return parsed.accessToken;
  } catch (err) {
    return null;
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        const user = localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        parsed.accessToken = newAccessToken;

        localStorage.setItem("user", JSON.stringify(parsed));
      }

        instance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("user");
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
