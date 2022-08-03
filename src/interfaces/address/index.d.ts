export interface ICreateAddress {
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
}
