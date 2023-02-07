import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../../common/interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('Error axios');
    }
  }
}
