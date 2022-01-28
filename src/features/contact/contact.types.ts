import { BaseState, ListReducer } from 'common/types/store.types';

export interface ContactModel {
  key: string;
  value: string;
  link: string;
  title: string;
}

export interface ContactData {
  list: ContactModel[];
}

export type ContactState = BaseState<ContactData>;

export interface ContactReducers extends ListReducer<ContactState, ContactModel> {
  // empty
}
