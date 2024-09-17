import axios from 'axios';
import appConfig from '@/configs/app.config';
import https from 'https';

const BaseService = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  timeout: 60000,
  baseURL: appConfig.apiPrefix
});

BaseService.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      return config;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export default BaseService;
