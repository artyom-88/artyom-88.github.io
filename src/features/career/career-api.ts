import { httpClient } from 'common/http-client';

import type { CareerDTO } from './career-types';

export const loadCareerList = async (): Promise<CareerDTO[]> => httpClient.get(`career`).json();
