export interface ICreateUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birhtDate: string;
  description: string;
  password: string;
  isSeller: boolean;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birhtDate?: string | Date;
  description?: string;
}
