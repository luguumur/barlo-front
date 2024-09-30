import appConfig from "@/configs/app.config";
import BaseService from "./BaseService";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const ApiService = {
  fetchData<Response = unknown, Request = Record<string, unknown> | FormData>(param: AxiosRequestConfig<Request>) {
    return new Promise<AxiosResponse<{ body: Response }>>((resolve, reject) => {
      BaseService(param)
        .then((response: AxiosResponse<{ body: Response }>) => {
          resolve(response);
        })
        .catch((errors: AxiosError) => {
          reject(errors);
        });
    });
  },
};

export default ApiService;
