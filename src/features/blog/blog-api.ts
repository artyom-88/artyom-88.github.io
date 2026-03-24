import { httpClient } from 'common/http-client';
import type { BlogDTO } from 'features/blog/blog-types';

export const loadBlogList = async (): Promise<BlogDTO[]> => httpClient.get(`blog`).json();
