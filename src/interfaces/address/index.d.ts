export interface ICreateAddress {
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
}

export interface IUpdateAddress {
  zipCode?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: number;
  complement?: string;
}
