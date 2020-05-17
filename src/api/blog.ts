import axios, { AxiosResponse } from 'axios';
import { API_PATH } from 'src/const';
import { IBlogRawData } from 'src/types';

export const loadBlogList = async (): Promise<AxiosResponse<IBlogRawData[]>> => axios.get(`${API_PATH}/blog`);

export const loadBlog = async (id: string): Promise<AxiosResponse<IBlogRawData>> => axios.get(`${API_PATH}/blog/${id}`);
