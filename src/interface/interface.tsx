export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  last_name?: string;
  first_name?: string;
  first_phone?: string;
  phone_number: string;
  email: string;
  password: string;
  is_used: boolean;
}

export interface IResetpassword {
  email: string;
}

export interface IChangePassword {
  old_password: string;
  password: string;
  confirm_password: string;
}

export interface IUpdateInfomation {
  avatar?: File;
  username?: string;
  gender?: string;
  phone?: string;
}
