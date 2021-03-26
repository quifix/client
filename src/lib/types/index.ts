export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  avatar: string;
  city?: string;
  state?: string;
  country?: string;
  type: UserType;
  walletId?: string;
}

export enum UserType {
  CUSTOMER,
  CONTRACTOR,
  HANDYMAN
}

export interface CSRF_data {
  csrfToken: string;
}
