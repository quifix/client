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

export interface Project {
  id?: string;
  title: string;
  description: string;
  type: ProjectTypes;
  isOpen: boolean;
  userId: string;
  address: string;
  country: string;
  state: string;
  city: string;
}

export interface ProjectArgs {
  title: string;
  description: string;
  type?: string;
  isOpen: boolean;
  userId: string;
  address: string;
  country: string;
  state: string;
  city: string;
}

export interface ProjectUpdateArgs {
  title?: string;
  description?: string;
  type?: ProjectTypes;
  isOpen?: boolean;
  userId?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
}

export enum ProjectTypes {
  PAINTING,
  CONSTRUCTION,
  ELECTRIC,
  RENOVATION,
  OUTDOOR_PROJECT,
  OTHER
}
