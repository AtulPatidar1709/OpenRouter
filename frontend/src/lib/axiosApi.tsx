import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type FailedQueueItem = {
  resolve: () => void;
  reject: (reason?: unknown) => void;
};

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEN_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

axiosApi.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (!error.config) return Promise.reject(error);

    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(axiosApi(originalRequest)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      await axiosApi.post("/auth/refresh-token");
      processQueue();
      return axiosApi(originalRequest);
    } catch (err) {
      processQueue(err);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
