import axios, { AxiosResponse } from 'axios';
import { API_PATH } from 'const';
import { ICareerRawData } from 'types';

export const loadCareerList = async (): Promise<AxiosResponse<ICareerRawData[]>> => axios.get(`${API_PATH}/career`);

export const loadCareer = async (id: string): Promise<AxiosResponse<ICareerRawData>> =>
  axios.get(`${API_PATH}/career/${id}`);
