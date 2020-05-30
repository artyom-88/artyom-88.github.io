import axios, { AxiosResponse } from 'axios';
import { API_PATH } from 'src/const';
import { ICareerRawData } from 'src/types';

export const loadCareerList = async (): Promise<AxiosResponse<ICareerRawData[]>> => axios.get(`${API_PATH}/career`);

export const loadCareer = async (id: string): Promise<AxiosResponse<ICareerRawData>> =>
  axios.get(`${API_PATH}/career/${id}`);
