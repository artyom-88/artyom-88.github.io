import axios from 'axios';
import { API_PATH } from 'src/const';

export const loadCareerList = async (): Promise<unknown> => axios.get(`${API_PATH}/career`);

export const loadCareer = async (id: string): Promise<unknown> => axios.get(`${API_PATH}/career/${id}`);
