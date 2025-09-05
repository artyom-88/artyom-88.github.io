import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { dayjs } from 'common/common-date';
import { httpClient } from 'common/http-client';
import type { BlogDTO, BlogModel } from 'features/blog/blog-types';

export const useBlogListQuery = (): UseQueryResult<BlogModel[]> =>
  useQuery<BlogModel[]>({
    queryFn: async () => {
      const list = await httpClient.get('blog').json<BlogDTO[]>();
      return list.map(
        (dto: BlogDTO): BlogModel => ({
          ...dto,
          date: dayjs(dto.date).utc(),
        }),
      );
    },
    queryKey: ['BLOG_LIST_QUERY_KEY'],
    refetchOnMount: false,
  });
