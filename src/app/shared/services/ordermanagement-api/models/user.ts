/* tslint:disable */
/* eslint-disable */
import { Contact } from './contact';
export interface User {
  contact?: Contact;
  dateCreated?: string;
  dateModified?: string;
  email: string;
  id?: string;
  userName: string;
}
