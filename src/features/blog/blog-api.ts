import { httpClient } from 'common/http-client';
import { BlogDTO } from 'features/blog/blog-types';

export const loadBlogList = async (): Promise<BlogDTO[]> => httpClient.get(`blog`).json();
