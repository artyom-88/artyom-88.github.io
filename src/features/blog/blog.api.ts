import apiClient from 'app/apiClient';
import { AxiosResponse } from 'axios';
import { BlogDTO } from 'features/blog/blog.types';

export const loadBlogList = async (): Promise<AxiosResponse<BlogDTO[]>> => apiClient.get(`blog`);

export const loadBlog = async (id: string): Promise<AxiosResponse<BlogDTO>> => apiClient.get(`blog/${id}`);
