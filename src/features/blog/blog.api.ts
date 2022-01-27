import apiClient from 'app/apiClient';
import { AxiosResponse } from 'axios';
import { BlogDTO } from 'features/blog/blog.types';

const loadBlogList = async (): Promise<AxiosResponse<BlogDTO[]>> => apiClient.get(`blog`);

const loadBlog = async (id: string): Promise<AxiosResponse<BlogDTO>> => apiClient.get(`blog/${id}`);

export default { loadBlogList, loadBlog };
