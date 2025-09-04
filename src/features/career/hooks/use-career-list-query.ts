import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { dayjs } from 'common/common-date';
import { httpClient } from 'common/http-client';
import type { CareerDTO, CareerModel } from 'features/career/career-types';

export const useCareerListQuery = (): UseQueryResult<CareerModel[]> =>
  useQuery<CareerModel[]>({
    queryFn: async () => {
      const list = await httpClient.get('career').json<CareerDTO[]>();
      return list.map((dto: CareerDTO): CareerModel => {
        const { endDate, startDate, tools } = dto;
        return {
          ...dto,
          endDate: dayjs(endDate).utc(),
          startDate: dayjs(startDate).utc(),
          tools: Array.isArray(tools) ? tools : tools.split(','),
        };
      });
    },
    queryKey: ['CAREER_LIST_QUERY_KEY'],
    refetchOnMount: false,
  });
