import apiClient from 'app/apiClient';
import { AxiosResponse } from 'axios';
import { CareerDTO } from './career.types';

export const loadCareerList = async (): Promise<AxiosResponse<CareerDTO[]>> => apiClient.get(`career`);

export const loadCareer = async (id: string): Promise<AxiosResponse<CareerDTO>> => apiClient.get(`career/${id}`);
