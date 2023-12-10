import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import bio from 'assets/data/bio.json';

export const useAboutQuery = (): UseQueryResult<string[]> =>
  useQuery<string[]>({
    queryFn: () => {
      // TODO: use API data
      return bio.data;
    },
    queryKey: ['ABOUT_QUERY_KEY'],
    refetchOnMount: false,
  });
