export interface IRegisterError {
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  password?: string[];
}

export interface IRegisterForm {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password?: string;
}
