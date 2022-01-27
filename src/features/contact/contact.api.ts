import { AxiosResponse } from 'axios';
import { ContactModel } from './contact.types';

export const loadContactList = async (): Promise<AxiosResponse<ContactModel[]>> => {
  const { data } = await import('assets/data/contacts.json');
  return Promise.resolve({ data } as unknown as AxiosResponse<ContactModel[]>);
};

export default {
  loadContactList,
};
