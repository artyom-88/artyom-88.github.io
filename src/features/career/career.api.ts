import apiClient from 'app/apiClient';
import { AxiosResponse } from 'axios';
import { CareerDTO } from './career.types';

const loadCareerList = async (): Promise<AxiosResponse<CareerDTO[]>> => apiClient.get(`career`);

const loadCareer = async (id: string): Promise<AxiosResponse<CareerDTO>> => apiClient.get(`career/${id}`);

export default {
  loadCareerList,
  loadCareer,
};
