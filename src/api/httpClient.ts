import axios, { AxiosInstance, isAxiosError, isCancel } from 'axios';

export class ApiError extends Error {
  constructor(message: string, public status: number, public url: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 15000,
      headers: { Accept: 'application/json' },
    });
  }

  async get<T>(path: string, params?: QueryParams, signal?: AbortSignal): Promise<T> {
    try {
      const response = await this.client.get<T>(path.replace(/^\//, ''), { params, signal });
      return response.data;
    } catch (error) {
      if (isCancel(error)) throw error;
      if (isAxiosError(error)) {
        throw new ApiError(
          error.message,
          error.response?.status ?? 0,
          `${error.config?.baseURL ?? ''}${error.config?.url ?? ''}`,
        );
      }
      throw error;
    }
  }
}
